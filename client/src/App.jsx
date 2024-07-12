import React, { useState } from 'react'
import Sidebar from './layout/Sidebar'
import { twMerge } from 'tailwind-merge';
import Chart from './components/common/Chart';
import CircleChart from './components/common/CircleChart';

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className=' h-screen w-screen bg-[#fafafa]'>
      <Sidebar open={open} setOpen={setOpen} />
      <div className={twMerge('pt-24 px-4', open ? 'ml-64' : 'ml-20')}>


<div className='flex justify-between'>
        <div class="w-[24%] p-6 bg-white border border-gray-200 rounded-lg shadow ">
          <img className='h-10 w-10' src='https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/calendar.svg'/>
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 mt-2">Appointments</h5>
          </a>
          <p class="mb-3  text-theme font-bold text-3xl">250</p>
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>

        <div class="w-[24%] p-6 bg-white border border-gray-200 rounded-lg shadow ">
          <img className='h-10 w-10' src='https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/profile-add.svg'/>
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 mt-2">New Patients</h5>
          </a>
          <p class="mb-3  text-theme font-bold text-3xl">250</p>
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>


        <div class="w-[24%] p-6 bg-white border border-gray-200 rounded-lg shadow ">
          <img className='h-10 w-10' src='https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/empty-wallet.svg'/>
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 mt-2">Operations</h5>
          </a>
          <p class="mb-3  text-theme font-bold text-3xl">250</p>
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>


        <div class="w-[24%] p-6 bg-white border border-gray-200 rounded-lg shadow ">
          <img className='h-10 w-10' src='https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/calendar.svg'/>
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 mt-2">Earnings</h5>
          </a>
          <p class="mb-3  text-theme font-bold text-3xl">250</p>
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
        </div>

<div className='flex gap-4  mt-10'>
      <div className='bg-white w-[75%]  p-6'>
        <Chart/>
        
      </div>

      <div className='bg-white'>

      <CircleChart/>
      </div>
      </div>


      <div>




      </div>

      
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase  bg-white">
            <tr>
                <th scope="col" class="px-6 py-3">
                     Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Mobile
                </th>
                <th scope="col" class="px-6 py-3">
                    Address
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {
            [1,1,1,1,1,1,1,1].map((ele,ind)=>{
              return(
                <tr class="">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    Name
                </th>
                <td class="px-6 py-4">
                    @gmail.com
                </td>
                <td class="px-6 py-4">
                    18727272
                </td>
                <td class="px-6 py-4">
                    ABCSSDD
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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
  )
}

export default App