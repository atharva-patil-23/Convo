import React from 'react'

const ChatContainer = () => {
  return (
    <div>
        <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
            <img src="./src/assets/avatar.svg" alt="profile picture" className='w-8 rounded-full' />
            <p className='flex-1 text-lg text-white flex items-center gap-2'>
                Martin jhonson 
                <span className='w-2 h-2 rounded-full bg-green-500'></span>
            </p>
            <img src="" alt="" />
        </div>
    </div>
  )
}

export default ChatContainer