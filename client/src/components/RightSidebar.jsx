import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/ChatContext.js'
import { AuthContext } from '../../context/AuthContext.js'

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext)
  const { logout, onlineUsers } = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  useEffect(() => {
    setMsgImages(messages.filter((m) => m.image).map((m) => m.image))
  }, [messages])

  if (!selectedUser) return null

  const isOnline = onlineUsers.includes(selectedUser._id)

  return (
    <aside className='bg-surface-1 border-l border-border h-full overflow-y-auto p-6 flex flex-col max-md:hidden'>
      <div className='flex flex-col items-center text-center'>
        <img
          src={selectedUser.profilePic || "/avatar.svg"}
          alt='profile picture'
          className='w-20 h-20 rounded-full object-cover bg-surface-2'
        />
        <p className='mt-3 text-base font-semibold tracking-tight text-text'>{selectedUser.fullName}</p>
        <p className={`mt-0.5 text-xs ${isOnline ? 'text-accent' : 'text-text-faint'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </p>
        {selectedUser.bio && (
          <p className='mt-3 text-sm text-text-muted leading-relaxed'>{selectedUser.bio}</p>
        )}
      </div>

      <div className='mt-7 pt-4 border-t border-border'>
        <p className='mono text-[11px] uppercase tracking-wider text-text-faint mb-3'>
          Media · {msgImages.length}
        </p>
        {msgImages.length === 0 ? (
          <p className='text-xs text-text-faint leading-relaxed'>
            No shared media yet. Photos sent in this chat will appear here.
          </p>
        ) : (
          <div className='grid grid-cols-3 gap-1 max-h-[220px] overflow-y-auto'>
            {msgImages.map((url, index) => (
              <button
                type='button'
                key={index}
                onClick={() => window.open(url)}
                aria-label='Open image'
                className='aspect-square overflow-hidden rounded-md bg-surface-2 cursor-pointer'
              >
                <img src={url} alt='' className='w-full h-full object-cover' />
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type='button'
        onClick={() => logout()}
        className='mt-auto self-stretch py-2.5 rounded-lg border border-border bg-transparent text-sm text-text-muted hover:bg-surface-2 hover:text-text transition-colors duration-micro ease-ease cursor-pointer'
      >
        Log out
      </button>
    </aside>
  )
}

export default RightSidebar
