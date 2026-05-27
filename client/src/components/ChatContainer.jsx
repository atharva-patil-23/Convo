import React, { useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { formatMessageTime } from '../lib/utils.js'
import { ChatContext } from '../../context/ChatContext.js'
import { AuthContext } from '../../context/AuthContext.js'

const MAX_MESSAGE_LENGTH = 4000

const ChatContainer = () => {
    const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
    const { authUser, onlineUsers } = useContext(AuthContext)

    const scrollEnd = useRef()
    const [input, setInput] = useState('')

    const handelSendMessage = async (e) => {
        e.preventDefault()
        const trimmed = input.trim()
        if (trimmed === "") return null
        await sendMessage({ text: trimmed })
        setInput("")
    }

    const handelSendImage = async (e) => {
        const file = e.target.files[0]
        if (!file || !file.type.startsWith("image/")) {
            toast.error("Please select an image file")
            e.target.value = ""
            return
        }
        const reader = new FileReader()
        reader.onloadend = async () => {
            await sendMessage({ image: reader.result })
            e.target.value = ""
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id)
        }
    }, [selectedUser])

    useEffect(() => {
        if (scrollEnd.current && messages) {
            scrollEnd.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const sendDisabled = input.trim() === ""

    if (!selectedUser) {
        return (
            <div className='flex flex-col items-center justify-center gap-2 bg-bg max-md:hidden'>
                <h1 className='text-text font-semibold text-base tracking-tight'>Pick a conversation</h1>
                <p className='text-text-muted text-sm'>or use search to find someone new.</p>
            </div>
        )
    }

    const isOnline = onlineUsers.includes(selectedUser._id)

    return (
        <div className='h-full relative bg-bg flex flex-col min-w-0'>
            <div className='flex items-center gap-3 px-5 py-3.5 border-b border-border'>
                <div className='relative'>
                    <img src={selectedUser.profilePic || "/avatar.svg"} alt="profile picture" className='w-8 h-8 rounded-full object-cover bg-surface-2' />
                    {isOnline && <span className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent ring-2 ring-bg' />}
                </div>
                <div className='flex-1'>
                    <h1 className='text-[15px] font-semibold text-text leading-tight'>{selectedUser.fullName}</h1>
                    <p className='text-xs mt-0.5'>
                        <span className={isOnline ? 'text-accent' : 'text-text-faint'}>{isOnline ? 'Online' : 'Offline'}</span>
                    </p>
                </div>
                <button
                    onClick={() => setSelectedUser(null)}
                    aria-label='Back'
                    className='md:hidden w-8 h-8 grid place-items-center text-text-muted hover:text-text rounded-md transition-colors duration-micro ease-ease'
                >
                    ←
                </button>
            </div>

            <div className='flex-1 min-w-0 overflow-y-auto px-5 py-4 flex flex-col gap-0.5 justify-end'>
                {messages.map((msg, index) => {
                    const isSelf = msg.senderId === authUser._id
                    const next = messages[index + 1]
                    const isLastInGroup = !next || next.senderId !== msg.senderId
                    return (
                        <div
                            key={index}
                            className={`flex flex-col max-w-bubble ${isSelf ? 'self-end items-end' : 'self-start items-start'} ${isLastInGroup ? 'mb-3 last:mb-0' : ''}`}
                        >
                            {msg.image ? (
                                <img src={msg.image} alt="" className='max-w-[230px] border border-border rounded-2xl overflow-hidden' />
                            ) : (
                                <p
                                    className={`max-w-full px-3.5 py-2.5 text-sm leading-snug whitespace-pre-wrap break-words rounded-2xl ${
                                        isSelf
                                            ? 'bg-bubble-self text-white rounded-br-[4px]'
                                            : 'bg-bubble-other text-text rounded-bl-[4px]'
                                    }`}
                                >
                                    {msg.text}
                                </p>
                            )}
                            {isLastInGroup && (
                                <span className='mono text-[11px] text-text-faint mt-1 tracking-wide'>
                                    {formatMessageTime(msg.createdAt)}
                                </span>
                            )}
                        </div>
                    )
                })}
                <div ref={scrollEnd}></div>
            </div>

            <div className='border-t border-border px-3 py-3 flex items-center gap-2'>
                <div className='flex-1 flex items-center bg-surface-2 rounded-full pl-4 pr-1.5'>
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handelSendMessage(e) }}
                        maxLength={MAX_MESSAGE_LENGTH}
                        type="text"
                        placeholder='Send a message'
                        aria-label='Send a message'
                        className='flex-1 text-sm py-2.5 bg-transparent border-none outline-none text-text placeholder:text-text-faint'
                    />
                    <input onChange={handelSendImage} type="file" id="image" accept='image/png, image/jpg, image/jpeg' hidden />
                    <label
                        htmlFor="image"
                        aria-label='Attach image'
                        className='w-8 h-8 grid place-items-center rounded-full text-text-muted hover:text-text hover:bg-bg cursor-pointer transition-colors duration-micro ease-ease'
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                        </svg>
                    </label>
                </div>
                <button
                    type='button'
                    onClick={handelSendMessage}
                    disabled={sendDisabled}
                    aria-label='Send message'
                    className={`w-9 h-9 grid place-items-center rounded-full bg-accent text-bg transition-[filter,opacity] duration-micro ease-ease ${
                        sendDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:brightness-110 cursor-pointer'
                    }`}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ChatContainer
