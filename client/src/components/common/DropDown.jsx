import React from 'react'
import { twMerge } from 'tailwind-merge'

const Dropdown = ({ width, placeholder }) => {
    return (
        <div class={twMerge(" text-gray-900 dark:text-gray-100 ", width)}>
            <div class="relative w-full group">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">{placeholder}</label>

                <button class="py-2.5 px-3 w-full md:text-sm text-site text-black bg-transparent border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded ">All</button>
                <div
                    class="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg w-full  peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-100   border border-dimmed text-xs md:text-sm">
                    <div
                        class=" w-full block cursor-pointer  text-black  hover:text-link px-3 py-2 rounded-md">
                        All (9)</div>
                    <div
                        class=" w-full block cursor-pointer hover:bg-white text-black  hover:text-link px-3 py-2 rounded-md">
                        Full Stack (6)
                    </div>
                    <div
                        class=" w-full block cursor-pointer hover:bg-white text-black  hover:text-link px-3 py-2 rounded-md">
                        Front End (1)
                    </div>
                    <div
                        class=" w-full block cursor-pointer hover:bg-white text-black  hover:text-link px-3 py-2 rounded-md">
                        Freelance (1)
                    </div>
                    <div
                        class=" w-full block cursor-pointer hover:bg-white text-black  hover:text-link px-3 py-2 rounded-md">
                        New Stack
                        Project (1)</div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown