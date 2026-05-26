import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import ChatContainer from '../components/ChatContainer.jsx'
import RightSidebar from '../components/RightSidebar.jsx'
import { ChatContext } from '../../context/ChatContext.js'

function HomePage() {
  const { selectedUser } = useContext(ChatContext)

  return (
    <div className='w-full h-screen bg-bg'>
      <div
        className={`h-full grid grid-cols-1 ${
          selectedUser
            ? 'md:grid-cols-[256px_1fr_320px]'
            : 'md:grid-cols-[256px_1fr]'
        }`}
      >
        <Sidebar />
        <ChatContainer />
        {selectedUser && <RightSidebar />}
      </div>
    </div>
  )
}

export default HomePage
