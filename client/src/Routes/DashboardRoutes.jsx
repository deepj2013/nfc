import React, { useState } from 'react'
import Sidebar from '../layout/Sidebar'
import { Route, Routes } from 'react-router'
import Dashboard from '../pages/dashboard/Dashboard'
import { twMerge } from 'tailwind-merge'

function DashboardRoutes() {
    const [open,setOpen]=useState(true)
    return (
        <>
       
            <div className=' h-screen w-screen bg-[#fafafa]'>
                <Sidebar open={open} setOpen={setOpen} />
                <div className={twMerge('pt-24  px-8', open ? 'ml-60' : 'ml-20')}>
                <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
                </div>
            </div>
        </>

    )
}

export default DashboardRoutes