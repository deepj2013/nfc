import React, { useEffect, useState } from 'react'
import Table from '../../../components/common/Table'
import CreateEmployee from '../../../components/Employee/CreateEmployee'
import Input from '../../../components/common/Input'
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { employeeListServices, roleListServices } from '../../../redux/thunk/useMangementServices';

function Employee() {
    const [isOpen, setisOpen] = useState(false)
    const {employees}=useSelector((state)=>state.userStateMangementState)
    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(employeeListServices())
        dispatch(roleListServices())
    }, [])
    
    
    return (
        <div>
            <div className='mb-6 flex items-center justify-between'>
                <p className='font-semibold h28'>Employee Management</p>
                <button
                    onClick={() => setisOpen(true)}
                    className='bg-theme text-white p-3 px-6 rounded-md
                            flex flex-row  items-center justify-center   py-3   lg:text-base font-medium leading-6 capitalize duration-100 transform  shadow cursor-pointer focus:ring-4 focus:ring-theme focus:ring-opacity-50 focus:outline-none sm:mb-0  lg:px-8   hover:shadow-lg hover:-translate-y-4>

                '>
                    Add  Employee
                </button>
            </div>

            <div className='mb-4 flex'>
                <div className='flex relative items-center rounded-lg overflow-hidden  bg-white shadow-md  '>
                <input className='w-[300px] px-4 text-sm  h-full py-3 ' placeholder='Search Employee..'/>
                <IoSearch className='absolute right-2'/>
                </div>
            </div>
            <div>
                <Table data={employees??[]} />
            </div>

            <CreateEmployee isOpen={isOpen} onClose={() => setisOpen(false)} />
        </div>
    )
}

export default Employee