import React, { useState } from 'react'
import useContextApi from "../context/ContextApi"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Loader from '../shared/Loader'
import ytlogo from "../assets/yt-logo.png"
import ytlogomobile from "../assets/yt-logo-mobile.png"

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io"
import { RiVideoAddFill } from "react-icons/ri"
import { FiBell } from "react-icons/fi"
import { CgClose } from "react-icons/cg"


const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { mobileMenu, setMobileMenu, loading } = useContextApi();

  const searchQueryHandler = e => {
    if ((e?.key == "Enter" || e == "searchButton") && searchQuery?.length > 0) {
      navigate(`/searchResult/${searchQuery}`)
    }
  }

  const { pathname } = useLocation()

  const pagename = pathname?.split("/")?.filter(Boolean)?.[0]

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu)
  }

  return (
    <header className='sticky z-50 top-0 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black'>
      {
        loading && <Loader />
      }

      <div className='flex h-5 items-center'>
        {
          pagename !== "video" && (
            <div className='flex md:hidden md:mr-6 items-center justify-center h-10 w-10 cursor-pointer rounded-full hover:bg-[#303030]/[0.6]' onClick={mobileMenuToggle}>
              {
                mobileMenu ? <CgClose className='text-white text-xl' /> : <SlMenu className='text-white text-xl' />
              }
            </div>
          )
        }
        <Link to={"/"} className='flex items-center h-5'>
          <img className='h-full hidden dark:md:block' src={ytlogo} alt="youtube logo" />
          <img className='h-full md:hidden' src={ytlogomobile} alt="youtube logo" />
        </Link>



      </div>

      <div className='group flex items-center'>
        <div className='flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-3xl rounded-br-none rounded-tr-none group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0'>
          <div className='w-10 items-center justify-center hidden group-focus-within:md:flex'>
            <IoIosSearch className='text-white text-xl' />
          </div>
          <input
            type="text"
            className='bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]'
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
            placeholder='Search'
          />

        </div>
        <button className='w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]'>
          <IoIosSearch className='text-white text-xl' />
        </button>

      </div>

      <div className='flex items-center '>
        <div className='hidden md:flex '>
          <div className='flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6] '>
            <RiVideoAddFill className='text-white text-xl cursor-pointer' />
          </div>
          <div className='flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6] '>
            <FiBell className='text-white text-xl cursor-pointer' />
          </div>
          <div className='flex h-8 w-8 rounded-full overflow-hidden md:ml-4'>
            <img src="https://xsgames.co/randomusers/assets/avatars/male/18.jpg" alt="" />
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header
