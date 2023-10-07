'use client'

import React from 'react'
import RecommendedPost from '../posts/RecommendedPost'
import RecommendedBar from './RecommendedBar'

const Body = () => {
  return (
    <main className='flex w-full h-screen overflow-y-scroll justify-between'>
      <>
        <div className='lg:w-[42.65%] fixed z-50 bg-black w-11/12'>
          <div className='flex flex-col w-full py-5'>
            <h2 className='text-3xl text-white capitalize font-semibold ml-5'>{window.location.pathname.split('/')}</h2>
            <div className='w-full flex text-white justify-evenly border-b py-5'>
              <h2>For you</h2>
              <h2>Following</h2>
            </div>
          </div>
        </div>
        <div className='w-7/12 pt-[120px] max-lg:w-full'>
          <RecommendedPost />
        </div>
      </>
      <div className='w-5/12 flex flex-col gap-10 max-lg:hidden'>
        <RecommendedBar />
      </div>
    </main>
  )
}

export default Body