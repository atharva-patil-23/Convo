import Message from "../models/message.model.js"
import User from "../models/UserModel.js"
import cloudinary from "../lib/cloudinary.js"
import { io, userSocketMap } from "../server.js"

export const getUserforSidebar = async (req,res) => {
    try {
        const userId = req.user._id
        const filteredUsers = await User.find({_id:{$ne:userId}}).select("-password")

        const unseenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({senderId:user._id, receiverId:userId , seen:false})
            if(messages.length > 0) {
                unseenMessages[user._id] = messages.length
            }
        })

        await Promise.all(promises)
        res.json({
            success:true,
            users:filteredUsers,
            unseenMessages
        })
    } catch (error) {
       res.json({
        success:false,
        message:error.message
       }) 
    }
}


export const getMessages = async (req,res) => {
    try {
         const {id :selectedUserId} =  req.params;
         const myId = req.user._id


         const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:selectedUserId},
                {senderId:selectedUserId ,receiverId:myId}
            ]
         })

         await Message.updateMany({senderId: selectedUserId , receiverId: myId}, {seen:true})

         res.json({
            success:true,
            messages
         })
    } catch (error) {
        console.log(error.message)
        res.json({
            success : false,
            message: error.message
        })
    }
}
export const markMessageAsSeen = async (req,res) => {
    try {
        const { id } = req.params
        await Message.findByIdAndUpdate(id, {seen:true})
        res.json({
            success:true
        })
        
    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message:error.message
        })
    }
}


export const sendMessage = async (req,res) => {
    try {
        
        const { text,image } = req.body;
        const receiverId = req.params.id
        const senderId = req.user._id


        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)

            imageUrl = uploadResponse.secure_url
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        const receiverSocketId = userSocketMap[receiverId]
        // Emit to receiver if online
        if(receiverSocketId){
            try {
                io.to(receiverSocketId).emit("newMessage", newMessage)
            } catch (socketError) {
                console.log("Socket emit error:", socketError.message)
            }
        }
        
        // Also emit to sender for immediate feedback
        const senderSocketId = userSocketMap[senderId]
        if(senderSocketId && senderSocketId !== receiverSocketId){
            try {
                io.to(senderSocketId).emit("newMessage", newMessage)
            } catch (socketError) {
                console.log("Socket emit error:", socketError.message)
            }
        }

        res.json({
            success:true,
            newMessage
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message:error.message
        })
    }
}
