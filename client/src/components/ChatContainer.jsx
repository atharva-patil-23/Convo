import React, { useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { formatMessageTime } from '../lib/utils.js'
import { ChatContext } from '../../context/ChatContext.js'
import { AuthContext } from '../../context/AuthContext.js'

const MAX_MESSAGE_LENGTH = 4000

const ChatContainer = () => {
    const {messages,
        selectedUser,
        setSelectedUser,
        sendMessage,
        getMessages
    } = useContext(ChatContext)
    const {authUser,
        onlineUsers
    } = useContext(AuthContext)
    
    const scrollEnd = useRef()

    const [input ,setInput] = useState('')

    const handelSendMessage = async (e) => {
        e.preventDefault();
        const trimmed = input.trim()
        if(trimmed === "") return null
        await sendMessage({text: trimmed})
        setInput("")
    }

    const handelSendImage = async (e) => {
        const file = e.target.files[0];
        if(!file || !file.type.startsWith("image/")){
            toast.error("Please select an image file")
            e.target.value = ""
            return
        }
        const reader = new FileReader()

        reader.onloadend = async() => {
            await sendMessage({image:reader.result})
            e.target.value = ""
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if(selectedUser){
            getMessages(selectedUser._id)
        }
    },[selectedUser])

    useEffect(() => {
        if(scrollEnd.current && messages){
            scrollEnd.current.scrollIntoView({behavior :"smooth"})
        }
    },[messages])
  return  selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>

        <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
            <img src={selectedUser.profilePic || "/avatar.svg"} alt="profile picture" className='w-8 rounded-full' />
            <p className='flex-1 text-lg text-white flex items-center gap-2'>
                {selectedUser.fullName}
                {onlineUsers.includes(selectedUser._id) && <span className='w-2 h-2 rounded-full bg-green-500'></span>}
            </p>
            <img onClick={() => setSelectedUser(null)} src="/arrow_icon.png" alt="" className='md:hidden max-w-7' />
            <img src="/info.svg" alt="" className='max-md:hidden max-w-5'/>
        </div>

        {/* chat */}
        <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
                    {msg.image ? (
                        <img src={msg.image} className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
                    ) : (
                        <p className={`p-2 max-w-[min(60ch,75%)] md:text-sm font-light rounded-lg mb-8 whitespace-pre-wrap break-words bg-violet-500/30 text-white ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
                    )}
                    <div className='text-center text-xs'>
                        <img src={msg.senderId === authUser._id ? authUser?.profilePic || "/avatar.svg"  : selectedUser?.profilePic || "/avatar.svg"} alt="" className='w-7 rounded-full'/>
                        <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
                    </div>
                </div>
            ))}
            <div ref={scrollEnd}></div>
        </div>

        {/* reply section */}
        <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
            <div className='flex-1 flex items-center bg-gray-100/15 px-3 rounded-full'>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handelSendMessage(e) }}
                    maxLength={MAX_MESSAGE_LENGTH}
                    type="text"
                    placeholder='Send a message'
                    aria-label='Send a message'
                    className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white bg-transparent placeholder-gray-400'
                />
                <input onChange={handelSendImage} type="file" id="image" accept='image/png, image/jpg, image/jpeg' hidden/>
                <label htmlFor="image" aria-label='Attach image'>
                    <img src="/gallery_icon.svg" alt="" className='w-5 mr-2 cursor-pointer' />
                </label>
            </div>
            <button
                type='button'
                onClick={handelSendMessage}
                disabled={input.trim() === ""}
                aria-label='Send message'
                className={`bg-transparent border-none p-0 ${input.trim() === "" ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            >
                <img src="/send_button.svg" alt="" className='w-7'/>
            </button>
        </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
        <img  src="/chat.svg" alt="" className='max-w-16' />
        <p className='text-lg font-medium text-white'>Chat anytime anywhere</p>
    </div>
  )
}

export default ChatContainer