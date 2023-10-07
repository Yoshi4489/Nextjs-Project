import Chats from '@/Components/Layout/Chats'
import SideBar from '@/Components/Layout/SideBar'
import React from 'react'

const page = () => {
  return (
    <main className='flex'>
      <SideBar />
      <Chats />
    </main>
  )
}

export default page