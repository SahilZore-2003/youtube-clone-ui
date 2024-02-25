import React from 'react'
import { useNavigate } from 'react-router-dom';
import useContextApi from '../context/ContextApi';
import { categories } from "../utils/constants"
import LeftNavMenuItem from "../components/LeftNavMenuItem"
import "./navbar.css"


const LeftNav = () => {

  const navigate = useNavigate()
  const { selectCategory, setSelectCategory, mobileMenu } = useContextApi()
  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectCategory(name)
      case "home":
        return setSelectCategory(name)
      case "menu":
        return false
    }
  }




  return (
    <div className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10  md:translate-x-0 transition-all ${mobileMenu ? "translate-x-0" : "translate-x-[-240px]"} `} id='navbar'>
      <div className='flex flex-col px-5'>
        {
          categories.map((item) => (
            <>
              <LeftNavMenuItem
                text={item.type == "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => { clickHandler(item.name, item.type); navigate("/") }}
                classname={selectCategory == item.name ? "bg-white/[0.15]" : ""}
              />
              {
                item.divider && (
                  <hr className='my-5 border-white/[.2]' />
                )
              }
            </>
          ))
        }
        <hr className='my-5 border-white/[.2]' />
        <div className='text-white/[0.5] text-[14px]'>
          Clone by: Sahil Zore.
        </div>
      </div>
    </div>
  )
}

export default LeftNav
