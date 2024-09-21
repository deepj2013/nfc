import React, { useEffect, useState } from 'react'
import Table from '../../../components/common/Table'
import CreateOrganization from '../../../components/Modal/CreateOrganization'
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { organisationListservices } from '../../../redux/thunk/organizationMangementservices';
import { FaEdit } from 'react-icons/fa';


function Organization() {
    const [isOpen, setisOpen] = useState(false)
    const { organisation } = useSelector((state) => state.organisationMangementState)
    const [selectedOrganisation,setSelectedOrganisation] = useState(null)
    // console.log(organisation);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(organisationListservices())
    }, [])

    return (
        <div>
            <div className='mb-6 flex items-center justify-between'>
                <p className='font-semibold h28'>Organization Management</p>

            </div>
            <div className='mt-10' >
                <div class="flex flex-col">
                    <div class=" overflow-x-auto pb-4">
                        <div class="min-w-full inline-block align-middle">
                            <div class="overflow-hidden  shadow bg-white rounded-lg border-gray-300">
                                <table class="table-auto min-w-full rounded-xl">
                      <thead>
                          <tr class="bg-gray-50">
                         
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Organization </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Organization Id </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"> Adress </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Created At </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Action</th>

                          </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-300 ">
                        {
                            organisation?.map((ele,ind)=>{
                                return(
                                    <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                              
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{ele?.fullName}</td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {ele?.organizationId} </td>
                                    <td class=" px-5 py-3">
                                        <div class="w-48 flex items-center gap-3">
                                            <img src="https://pagedone.io/asset/uploads/1697536419.png" alt="Floyd image"/>
                                            <div class="data">
                                                <p class="font-normal text-sm text-gray-900">Floyd Miles</p>
                                                <p class="font-normal text-xs leading-5 text-gray-400"> floydmiles@pagedone.io </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> Jun. 24, 2023 </td>
                                    <td className='px-5'>
                                        <button className='text-theme' onClick={() => {
                                            setSelectedOrganisation(ele)
                                            setisOpen(true)
                                            }}>
                                            <FaEdit/>
                                        </button>
                                    </td>
                            
                                  
                                </tr>
                                )
                            })
                        }
                         
                      </tbody>
                  </table>
                                {/* <Table data={organisation??[]} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
        <CreateOrganization selectedOrganisation={selectedOrganisation} isOpen={isOpen} onClose={() => setisOpen(false)}/>
        </div>
    )
}

export default Organization