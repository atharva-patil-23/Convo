import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.js'
import { ChatContext } from '../../context/ChatContext.js'

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext)

  const { logout, onlineUsers } = useContext(AuthContext)

  const [query, setQuery] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const filteredUsers = query
    ? users.filter((u) => u.fullName?.toLowerCase().includes(query.toLowerCase()))
    : users

  useEffect(() => {
    getUsers()
  }, [onlineUsers])

  return (
    <aside
      className={`bg-surface-1 border-r border-border h-full overflow-y-auto p-2 text-text ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* brand + menu */}
      <div className='flex items-center justify-between px-2 py-3'>
        <div className='flex items-center gap-2'>
          <div className='w-[22px] h-[22px] rounded-md bg-accent grid place-items-center text-bg font-bold text-[13px]'>C</div>
          <p className='text-sm font-semibold tracking-tight'>Convo</p>
        </div>

        <div className='relative'>
          <button
            type='button'
            onClick={() => setMenuOpen((v) => !v)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 120)}
            aria-label='Menu'
            className='w-7 h-7 grid place-items-center rounded-md text-text-muted hover:text-text hover:bg-surface-2 transition-colors duration-micro ease-ease cursor-pointer'
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
          </button>
          {menuOpen && (
            <div className='absolute right-0 top-full mt-1 z-20 w-36 p-1 rounded-lg bg-surface-2 border border-border shadow-lg'>
              <button
                type='button'
                onMouseDown={() => navigate("/profile")}
                className='w-full text-left px-3 py-2 text-sm rounded-md text-text hover:bg-bg transition-colors duration-micro ease-ease'
              >
                Edit profile
              </button>
              <button
                type='button'
                onMouseDown={() => logout()}
                className='w-full text-left px-3 py-2 text-sm rounded-md text-text hover:bg-bg transition-colors duration-micro ease-ease'
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* search */}
      <div className='px-2 pb-2'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search'
          aria-label='Search conversations'
          className='w-full px-3 py-2 bg-bg border border-border rounded-lg text-sm text-text placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors duration-micro ease-ease'
        />
      </div>

      {/* list */}
      <div className='flex flex-col'>
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id)
          const isActive = selectedUser?._id === user._id
          const unread = unseenMessages?.[user._id] || 0
          return (
            <button
              type='button'
              onClick={() => {
                setSelectedUser(user)
                setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }))
              }}
              key={user._id}
              aria-label={`Open conversation with ${user.fullName}`}
              className={`relative flex items-center gap-2.5 px-2 py-2 rounded-lg text-left transition-colors duration-micro ease-ease ${
                isActive ? 'bg-surface-2' : 'hover:bg-surface-2'
              }`}
            >
              <div className='relative shrink-0'>
                <img
                  src={user.profilePic || '/avatar.svg'}
                  alt=''
                  className='w-8 h-8 rounded-full object-cover bg-surface-2'
                />
                {isOnline && (
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent ring-2 ${isActive ? 'ring-surface-2' : 'ring-surface-1'}`} />
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-text leading-tight truncate'>{user.fullName}</p>
                <p className='text-[11px] mono text-text-faint mt-0.5 tracking-wide'>
                  {isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
              {unread > 0 && (
                <span className='shrink-0 min-w-[18px] h-[18px] px-1.5 rounded-full bg-accent text-bg text-[11px] font-semibold grid place-items-center mono'>
                  {unread}
                </span>
              )}
            </button>
          )
        })}
        {filteredUsers.length === 0 && (
          <p className='px-3 py-6 text-xs text-text-faint text-center'>No conversations.</p>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
