import React, { useState } from 'react'
import Sidebar from '../layout/Sidebar'
import { Route, Routes } from 'react-router'
import Dashboard from '../pages/dashboard/Dashboard'
import { twMerge } from 'tailwind-merge'
import Employee from '../pages/dashboard/Employee/Employee'
import Role from '../pages/dashboard/Role/Role'

function DashboardRoutes() {
    const [open,setOpen]=useState(true)
    return (
        <>
       
            <div className=' h-screen w-screen bg-bgColor ' >
                <Sidebar open={open} setOpen={setOpen} />
                <div className={twMerge('pt-24 px-2 lg:px-8', open ? 'ml-60' : 'ml-20')}>
                <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/role" element={<Role />} />


                
            </Routes>
                </div>
            </div>
        </>

    )
}

export default DashboardRoutes