import { createContext, useEffect, useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl

export const AuthContext = createContext()



export const AuthProvider = ({ children }) => {
    const [token,setToken] = useState(localStorage.getItem("token"))
    const [authUser , setAuthUser] = useState(null)
    const [onlineUsers , setOnlineUsers] = useState([])
    const [socket , setSocket] = useState(null)

    const checkAuth = async () => {
        try {
            console.log("Headers", axios.defaults.headers.common)
            const {data} = await axios.get("/api/auth/check")

            if(data.success){
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            console.log("error in checkauth", error.message)
            toast.error(error.message)
        }
    }

    const login = async (state, credentials) => {
        try {
            const {data} = await axios.post(`/api/auth/${state}`,credentials)
            if(data.success){
                setAuthUser(data.userData)
                connectSocket(data.userData)
                axios.defaults.headers.common["token"] = data.token
                setToken(data.token)
                localStorage.setItem("token",data.token)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //logout

    const logout = async () => {
        localStorage.removeItem("token")
        setToken(null)
        setAuthUser(null)
        setOnlineUsers([])
        axios.defaults.headers.common['token'] = null;
        toast.success("Logged out successfully")
        socket.disconnect()
    }

    //profile update

    const updateProfile = async (body) => {
        try {
            const {data} = await axios.put('/api/auth/update-profile', body)

            if(data.success){
                setAuthUser(data.user);
                toast.success("profile updated successfully")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
 

    const connectSocket = (userData) => {
        if(!userData || socket?.connected) return
        const newSocket = io(backendUrl, {
            query:{
                userId : userData._id,
            },
            transports: ['websocket', 'polling'],
            upgrade: true,
            rememberUpgrade: true,
            pingTimeout: 60000,
            pingInterval: 25000,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000
        });
        newSocket.connect()
        setSocket(newSocket)

        newSocket.on("getOnlineUsers" ,(userIds) => {
                setOnlineUsers(userIds)
        })
        
        newSocket.on("connect", () => {
            console.log("Socket connected")
        })
        
        newSocket.on("disconnect", () => {
            console.log("Socket disconnected")
        })
        
        newSocket.on("connect_error", (error) => {
            console.log("Socket connection error:", error)
        })

    }

    useEffect(() => {
        if(token){
            axios.defaults.headers.common['token'] = token 
        }
        checkAuth()
    },[token])

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}