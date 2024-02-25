import React from 'react'

const LeftNavMenuItem = ({ text, icon, action, classname }) => {
  return (
    <div className={`text-white text-sm min-h-6 flex items-center py-1 px-3 mb-[5px] rounded-lg hover:bg-white/[0.15] hover:cursor-pointer ${classname}`} onClick={action}>
      <span className='text-xl mr-5'>{icon()}</span>
      {text}
    </div>
  )
}

export default LeftNavMenuItem
