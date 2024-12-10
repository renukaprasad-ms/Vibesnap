import React from 'react'
import Post from "../components/Post"

const Home = () => {
  return (
    <div className='w-full h-auto lg:w-[60%] border  border-red-600 overflow-scroll scroll-container'>
      <p className='font-bold text-xl ml-6 lg:text-4xl lg:m-8'>Feeds</p>
      <div className='w-full h-full flex flex-col gap-6  items-center '>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      </div>
    </div>
  )
}

export default Home