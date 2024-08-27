import React, { useEffect } from 'react'
// import Button from '../../components/common/Button'
import { IoAddCircleSharp } from 'react-icons/io5'
import { FiPrinter } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
// import Table from '../../components/common/Table';
import { useNavigate } from 'react-router';
import Button from '../../../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVendorsServices } from '../../../redux/thunk/vendorServices';

function Vendor() {
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const getHandler = async () => {
        try {
            let response = await dispatch(getAllVendorsServices()).unwrap()
        } catch (error) {
            logger(error)
        }
    }
    useEffect(() => {
        getHandler()
    }, [])

    const { allVenderList } = useSelector((state) => state.inventaryState);

    return (
        <div>
            <div className='mb-6 flex items-center justify-between'>
                <p className='font-semibold h28'>All/Vendor</p>
                <div className='flex gap-4'>
                    <div className='bg-white shadow-xl px-3.5 text-2xl flex justify-center items-center rounded-xl text-gray-400 hover:bg-theme/10 hover:text-theme'>
                        <IoFilterSharp />
                        <span className='text-lg font-light mx-2'>
                            Filter
                        </span>

                    </div>
                    <div
                        className='bg-white shadow-xl px-3.5 text-2xl flex justify-center items-center rounded-xl text-gray-400 hover:bg-theme/10 hover:text-theme'>
                        <MdOutlineFileDownload />
                        <div id="tooltip-light" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                            Tooltip content
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                    <div className='bg-white shadow-xl px-3.5 text-2xl flex justify-center items-center rounded-xl text-gray-400 hover:bg-theme/10 hover:text-theme'>
                        <FiPrinter />
                    </div>
                    <Button
                        // rigntIcon={<IoAddCircleSharp className='text-2xl' />}
                        style={'bg-white bg-white text-theme w-[170px]'}
                        name={'Import'} />
                    <Button
                        onClick={()=>{
                            navigate('/add-vender')
                        }}
                        rigntIcon={<IoAddCircleSharp className='text-2xl' />}
                        name={'Add Vendor'} />
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
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> vendorName </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"> vendor </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> contactPerson </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> contactEmail </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> contactPhone </th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> gstNumber</th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize">address</th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> productsSupplied</th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> paymentTerms</th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"> createdBy</th>
                              

                          </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-300 ">
                        {
                            allVenderList.map((ele,ind)=>{
                                console.log("elele",ele)
                                return(
                                    <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                                    <td class="">
                                        <div class="flex items-center py-5 px-5 ">
                                            <input type="checkbox" value="" class="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"/>
                                        </div>
                                    </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"><p class="font-normal text-sm text-gray-900">{ind+1} </p></td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 "><p class="font-normal text-sm text-gray-900">{ele?.vendorName}</p></td>
                                    <td class=" px-5 py-3">
                                                <p class="font-normal text-sm text-gray-900">{ele?.vendor}</p>
                                    </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">  
                                                <p class="font-normal text-sm text-gray-900">{ele?.contactPerson}</p>

                                    </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> <p class="font-normal text-sm text-gray-900"> {ele?.contactEmail}</p></td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"><p class="font-normal text-sm text-gray-900">{ele?.contactPhone}</p></td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"><p class="font-normal text-sm text-gray-900">
                                        {ele?.gstNumber}</p>
                                    </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"><p class="font-normal text-sm text-gray-900">
                                        {`${ele?.address?.street},${ele?.address?.city},${ele?.address?.state},${ele?.address?.country},${ele?.address?.postalCode}`}</p>
                                    </td>
                                    <td class="flex p-5 items-center gap-0.5"><p class="font-normal text-sm text-gray-900">
                                        {ele?.productsSupplied.length>0 && productsSupplied.map((ele)=>{<p class="flex p-5 items-center gap-0.5">{ele}</p>})}</p>
                                    </td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"><p class="font-normal text-sm text-gray-900">{ele?.paymentTerms} </p></td>
                                    <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"><p class="font-normal text-sm text-gray-900"> {ele?.createdBy} </p></td>


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
        </div>
    )
}

export default Vendor