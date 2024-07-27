import React, { useState } from 'react'
import Button from '../../components/common/Button'
import { IoAddCircleSharp, IoEyeOutline } from 'react-icons/io5'
import { FiPrinter } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import Table from '../../components/common/Table';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaMinusCircle } from 'react-icons/fa';
import InventoryMangement from '../../components/Modal/InventoryMangement';

function Inventory() {
    const [isOpen,setIsOpen]=useState(false)

    return (
        <div>
            <div className='mb-6 flex items-center justify-between'>
                <p className='font-semibold h28'>Inventory</p>
                <div className='flex gap-4'>


                    <div className='bg-white py-1 shadow-sm px-3.5 text-2xl flex justify-center items-center rounded-xl text-gray-400 hover:bg-theme/10 hover:text-theme'>
                        <IoFilterSharp />
                        <span className='text-lg font-light mx-2'>
                            Filter
                        </span>

                    </div>

                    <div
                        className='bg-white shadow-sm px-3.5 text-2xl flex justify-center items-center rounded-xl text-gray-400 hover:bg-theme/10 hover:text-theme'>
                        <MdOutlineFileDownload />
                        <div id="tooltip-light" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                            Tooltip content
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>

                    </div>
                    <div className='bg-white shadow-sm px-3.5 text-2xl flex justify-center items-center rounded-xl text-gray-400 hover:bg-theme/10 hover:text-theme'>
                        <FiPrinter />

                    </div>


                </div>

            </div>

            <div>
            <div className=' ' >
        <div class="flex flex-col">
      <div class=" overflow-x-auto pb-4">
          <div class="min-w-full inline-block align-middle">
              <div class="overflow-hidden  shadow bg-white rounded-lg border-gray-300">
                  <table class="table-auto min-w-full rounded-xl">
                      <thead>
                          <tr class="bg-gray-50">
                              <th class="">
                                  <div class="flex items-center py-5 px-5 ">
                                      <input type="checkbox" value="" class="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"/>
                                  </div>
                              </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Id </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Item </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"> Code </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Unit </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Quantity </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Sales Price </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Purchase Price </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Action</th>

                          </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-300 ">
                        {
                            [1].map((ele,ind)=>{
                                return(
                                    <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                                    <td class="">
                                        <div class="flex items-center py-5 px-5 ">
                                            <input type="checkbox" value="" class="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"/>
                                        </div>
                                    </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">{ind+1} </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">Pizza</td>
                                    <td class=" px-5 py-3">
                                        <div class="w-48 flex items-center gap-3">
                                            <img className='h-10 w-10 rounded-full' src="https://www.indianhealthyrecipes.com/wp-content/uploads/2015/10/pizza-recipe-1.jpg" alt="Floyd image"/>
                                            <div class="data">
                                                <p class="font-normal text-sm text-gray-900">Pizza</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Food </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> 10 </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> 100 </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                        <div class="py-1.5 px-2.5 bg-emerald-50 rounded-full flex justify-center w-20 items-center gap-1">
                                            <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="2.5" cy="3" r="2.5" fill="#059669"></circle>
                                            </svg>
                                            <span class="font-medium text-xs text-emerald-600 ">$200</span>
                                        </div>
                                    </td>

                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                        <div className='flex gap-2'>
                                        <div class="py-1.5 px-2.5 bg-orange-400/30 rounded flex justify-center w-20 items-center gap-1">
                                        <IoEyeOutline />

                                            <span class="font-medium text-xs text-orange-500 ">History</span>
                                        </div>

                                        <div
                                        onClick={()=>setIsOpen(true)}
                                         class="py-1.5 px-2.5 bg-green-500 rounded flex justify-center w-20 items-center gap-1">
                                        <FaCirclePlus className='text-white' />

                                            <span class="font-medium text-xs text-white ">Stock In</span>
                                        </div>

                                        <div class="py-1.5 px-2.5 bg-red-400/30 rounded flex justify-center w-20 items-center gap-1">
                                        <FaMinusCircle className='text-red-500' />

                                            <span class="font-medium text-xs text-red-600 ">Stock Out</span>
                                        </div>
                                        </div>
                                    </td>
                               
                                </tr>
                                )
                            })
                        }
                         
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
      </div>
    </div>
            </div>

            <InventoryMangement isOpen={isOpen} onClose={()=>{
                setIsOpen(false)
            }}/>
        </div>
    )
}

export default Inventory