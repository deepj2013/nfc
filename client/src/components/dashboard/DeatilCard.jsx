import React from 'react'

function DeatilCard({tittle,value,image}) {
  return (
    <div class="w-[24%] p-6 bg-white  shadow rounded-lg  ">
        <div className='h-12 w-12 bg-gray-200 flex items-center justify-center rounded-md'>
          <img className='h-8 w-8' src='https://preclinic.dreamstechnologies.com/html/template/assets/img/icons/calendar.svg'/>
        </div>
          <a href="#">
            <h5 class="mb-2 h24  font-medium tracking-tight text-gray-900 mt-2">Appointments</h5>
          </a>
          <p class="mb-3  text-theme font-semibold text-3xl">250</p>
     <div className='text-gray-500 font-light'>
    <span className='text-green-500 text-sm'> 40%  </span>vs last month


     </div>
        </div>
  )
}

export default DeatilCard