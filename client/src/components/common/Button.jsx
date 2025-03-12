import React from 'react'
import { twMerge } from 'tailwind-merge'

function Button({rigntIcon,name,style,onClick}) {
  return (
    <button
    onClick={onClick}
     className={twMerge(" gap-1 w-[170px] inline-flex items-center justify-center rounded-xl bg-theme py-3  font-dm text-base font-small text-white shadow-xl shadow-theme/20 transition-transform duration-200 ease-in-out hover:scale-[1.02]",style)}
  >
      {rigntIcon}
    {name}
</button>
  )
}

export default Button