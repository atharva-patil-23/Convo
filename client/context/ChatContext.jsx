import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth.context.jsx";
import toast from "react-hot-toast";


export const ChatContext = createContext()


export const ChatProvider = ({ children }) => {

    const [messages,setMessages] = useState([]);
    const [users,setUsers] = useState([]);
    const [selectedUser,setSelectedUser] = useState(null);
    const [unseenMessages,setUnseenMessages] = useState({})

    const {socket , axios} = useContext(AuthContext);

    //get user to sidebar
    const getUsers = async () => {
        try {
            const {data} = await axios.get("/api/messages/users")
            if(data.success){
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
 
    //get messages for selected user
    const getMessages = async(userId) => {
        try {
            const {data} = await axios.get(`/api/messages/${userId}`)
            if(data.success){
                setMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const sendMessage = async (messageData) => {
        try {
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
        if(data.success){
            setMessages((prevMessages) =>[...prevMessages, data.newMessage])
        }else{
            toast.error(data.message)
        }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //fun to sub to messages for selected user
    const subscribeToMessages = async() => {
        if(!socket) return

        socket.on("newMessage", (newMessage) => {
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen  = true
                setMessages((prevMessages) => [...prevMessages,newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevUnseenMessages) =>({
                    ...prevUnseenMessages,[newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }))
            }
        })
    }

    //func to unsubscribe from messages

    const unsubscribeFromMessages = () => {
        if(socket) socket.off("newMessage")
    }

    // Subscribe to socket events only when socket changes
    useEffect(() => {
        if(!socket) return
        
        const handleNewMessage = (newMessage) => {
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true
                setMessages((prevMessages) => [...prevMessages,newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevUnseenMessages) =>({
                    ...prevUnseenMessages,[newMessage.senderId] : prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }))
            }
        }
        
        socket.on("newMessage", handleNewMessage)
        
        return () => {
            socket.off("newMessage", handleNewMessage)
        }
    },[socket, selectedUser])
    
    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages
    }

    return (
    <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
    )
}