import React, { useEffect, useState } from 'react'
import Table from '../../../components/common/Table'
import CreateOrganization from '../../../components/Modal/CreateOrganization'
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { organisationListservices } from '../../../redux/thunk/organizationMangementservices';


function Organization() {
    const [isOpen, setisOpen] = useState(false)
    const {organisation} = useSelector((state)=> state.organisationMangementState)
    const dispatch=useDispatch()
    dispatch(organisationListservices())
    useEffect(()=> {
        
    })

    return (
        <div>
         <div className='mb-6 flex items-center justify-between'>
                <p className='font-semibold h28'>Organization Management</p>
                <button
                    onClick={() => setisOpen(true)}
                    className='bg-theme text-white p-3 px-6 rounded-md
                            flex flex-row  items-center justify-center   py-3   lg:text-base font-medium leading-6 capitalize duration-100 transform  shadow cursor-pointer focus:ring-4 focus:ring-theme focus:ring-opacity-50 focus:outline-none sm:mb-0  lg:px-8   hover:shadow-lg hover:-translate-y-4>

                '>
                    Add  Organization
                </button>
            </div>
            <div className='mt-10' >
        <div class="flex flex-col">
      <div class=" overflow-x-auto pb-4">
          <div class="min-w-full inline-block align-middle">
              <div class="overflow-hidden  shadow bg-white rounded-lg border-gray-300">
                  {/* <table class="table-auto min-w-full rounded-xl">
                      <thead>
                          <tr class="bg-gray-50">
                         
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Organization </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Logo </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"> Adress </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> Created At </th>
                      
                          </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-300 ">
                        {
                            [1].map((ele,ind)=>{
                                return(
                                    <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                              
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 "> NFC</td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> 20010510 </td>
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
         
                            
                                  
                                </tr>
                                )
                            })
                        }
                         
                      </tbody>
                  </table> */}
                   {/* <Table data={organisation??[]} /> */}
              </div>
          </div>
      </div>
      </div>
    </div>
    <CreateOrganization isOpen={isOpen} onClose={()=>{
        setisOpen(false)
    }}/>
        </div>
    )
}

export default Organization