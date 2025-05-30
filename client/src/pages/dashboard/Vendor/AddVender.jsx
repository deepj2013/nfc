import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import { createVendersServices, updateVendorsServices } from '../../../redux/thunk/vendorServices';
import { useLocation, useNavigate, useParams } from 'react-router';
import { errorToast, logger, successToast } from '../../../utils/Helper';
import moment from "moment"
function AddVender() {
    const { state } = useLocation();
    console.log("ppp",state?.item?.updatedAt)
    const navigate=useNavigate();
const dispatch=useDispatch();
    const [formData, setFormData] = useState(
        {
  "vendorName": "",
  "contactPerson": "",
  "contactEmail": "",
  "contactPhone": "",
  "gstNumber": "",
  "address": {
    "street": "",
    "city": "",
    "state": "",
    "postalCode": "",
    "country": ""
  },
  "paymentTerms": "",
  "createdBy": "",
  "updatedBy":"",
  
}
    )
const {vendorName,contactPerson,contactEmail,contactPhone,gstNumber,address,paymentTerms,createdBy,updatedBy}= formData


const validation=()=>{
    if(!vendorName){
        errorToast("Vendor name can't be empaty")
        return false
    }
    if(!contactPerson){
        errorToast("contactPerson can't be empaty")
        return false
    }
    if(!contactEmail){
        errorToast("Contact Email can't be empaty")
        return false
    }
    if(!contactPhone){
        errorToast("Contact Phone can't be empaty")
        return false
    }
    if(!gstNumber){
        errorToast("gstNumber can't be empaty")
        return false
    }
    if(!address.street){
        errorToast("Street can't be empaty")
        return false
    }
    if(!address.city){
        errorToast("city can't be empaty")
        return false
    }
    if(!address.state){
        errorToast("state can't be empaty")
        return false
    }
    if(!address.postalCode){
        errorToast("postalCode can't be empaty")
        return false
    }
    if(!address.country){
        errorToast("country can't be empaty")
        return false
    }
    if(!paymentTerms){
        errorToast("paymentTerms can't be empaty")
        return false
    }
    return true
}
    const upadteStateHandler = (e)=>{
        let {name,value}=e.target
        setFormData((pre)=>({...pre,[name]:value}))
    }


    const upadteStateHandler2 = (e)=>{
        let {name,value}=e.target
        setFormData((pre)=>({...pre,address:{...pre.address,[name]:value}}))
    }
    const addVenderHandler =async ()=>{
        if(!validation()){
            return
        }
        // alert("this is test")
        try {
            const dataa={vendorName,contactPerson,contactEmail,contactPhone,gstNumber,address,paymentTerms,createdBy,updatedBy}
            let response = await dispatch(createVendersServices(formData)).unwrap();
            dispatch(getAllVendorsServices())
            navigate('/vendor')
            
        } catch (error) {
            console.log(error);
            logger(error)
        }
    }

    const updateVenderHandler = async () => {
    let payload =
        {
  vendorName: vendorName,
  contactPerson: contactPerson,
  contactEmail: contactEmail,
  contactPhone: contactPhone,
  gstNumber: gstNumber,
  address: {
    street: address.street,
    city: address.city,
    state: address.state,
    postalCode:address.postalCode,
    country: address.country,
  },
  paymentTerms:paymentTerms,
  updatedBy:createdBy
    }
    try {
      let response = await dispatch(updateVendorsServices(payload)).unwrap();
    //   console.log("responserespons567",response)
    } catch (error) {
      console.log(error);
      logger(error);
    }
  };

  useEffect(() => {
    if (state.type==="edit") {
      setFormData((pre) => ({
        ...pre,
        vendorName: state?.item?.vendorName,
  contactPerson: state?.item?.contactPerson,
  contactEmail: state?.item?.contactEmail,
  contactPhone: state?.item?.contactPhone,
  gstNumber: state?.item?.gstNumber,
  address: {
    street: state?.item?.address?.street,
    city: state?.item?.address?.city,
    state: state?.item?.address?.state,
    postalCode: state?.item?.address?.postalCode,
    country: state?.item?.address?.country,
  },
  paymentTerms: state?.item?.paymentTerms,
updatedBy:moment(state?.item?.updatedAt).format("YYYY-MM-DD")
      }));
    } else {
      setFormData((prev)=>(
        {...prev,
        vendorName: "",
  contactPerson: "",
  contactEmail: "",
  contactPhone: "",
  gstNumber: "",
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
  paymentTerms: "",
  updatedBy:""
      }));
    }
  }, []);

    return (
        <div>
            <div className='mb-6 flex items-center justify-between'>
                <p className='font-semibold h28'>Add Vender / Services</p>
                <div className='flex gap-4'>
                </div>
            </div>

            <div className='flex bg-white p-4 rounded-lg  w-full border justify-between flex-wrap'>
                {/* <FormInput
                    width={'w-[30%]'}
                    placeholder={'Item Type '}
                /> */}
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'Vender Name'}
                    value={vendorName} name={"vendorName"} onChange={upadteStateHandler}
                />
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'Contact Person'}
                    value={contactPerson} name={"contactPerson"} onChange={upadteStateHandler}
                />
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'Contact Email'}
                    value={contactEmail} name={"contactEmail"} onChange={upadteStateHandler}
                />
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'Contact Phone'}
                    value={contactPhone} name={"contactPhone"} onChange={upadteStateHandler}
                />
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'Gst Number'}
                    value={gstNumber} name={"gstNumber"} onChange={upadteStateHandler}
                />
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'street'}
                    value={address.street} name={"street"} onChange={upadteStateHandler2}
                />
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'city'}
                    value={address.city} name={"city"} onChange={upadteStateHandler2}
                />
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'state'}
                    value={address.state} name={"state"} onChange={upadteStateHandler2}
                />
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'postalCode'}
                    value={address.postalCode} name={"postalCode"} onChange={upadteStateHandler2}
                />
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'country'}
                    value={address.country} name={"country"} onChange={upadteStateHandler2}
                />
                
                <FormInput
                    width={'w-[30%]'}
                    placeholder={'Payment Terms'}
                    value={paymentTerms} name={"paymentTerms"} onChange={upadteStateHandler}
                />

                <FormInput
                type={"date"}
                    width={'w-[30%]'}
                    placeholder={state?.type==="edit" ? "Updated By":'Created By'}
                    value={updatedBy}
                    name="updatedBy" 
                    onChange={upadteStateHandler}
                />
                
                
                {/* <FormInput
                    placeholder={'Product Code (SKU)'}
                    width={'w-[30%]'} showButton={true} />
                <FormInput
                    placeholder={'Category'}
                    width={'w-[30%]'} />
                <FormInput
                    placeholder={'Selling Price'}
                    width={'w-[30%]'} />
                <FormInput
                    placeholder={'Purchase Price'}
                    width={'w-[30%]'} />

                <FormInput
                    placeholder={'Quantity'}
                    width={'w-[30%]'} /> */}

                {/* <Dropdown placeholder={'Units'} width={'w-[30%]'} /> */}
                {/* <Dropdown placeholder={'Discount Type'} width={'w-[30%]'} /> */}

                {/* <FormInput
                    showButton={true}
                    placeholder={'Generate Barcode'}
                    width={'w-[30%]'} />

                <FormInput

                    placeholder={'Alert Quantity'}
                    width={'w-[30%]'} /> */}

                {/* <Dropdown placeholder={'Tax'} width={'w-[30%]'} /> */}


                {/* <div className="w-full">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">           
                     Your Message
                    </label>
                    <textarea rows="6"
                        className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
                </div> */}

                <div className='w-full'>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">           
                     {/* Upload Product Image */}
                    </label>
                {/* <Dropzone/> */}
                </div>
                <button onClick={state.type? updateVenderHandler:addVenderHandler} type="submit" className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </div>
        </div>
    )
}

export default AddVender



const FormInput = ({ width, showButton, placeholder,name,onChange,value,type,id }) => {
    return (
        <div className={twMerge("mb-5 relative", width)}>
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">{placeholder}</label>
            <input onChange={onChange}
             value={value}  name={name} type={type ? type : "text"} id={id?id:"text"} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
            {showButton && <button className='text-sm bg-theme text-white absolute top-[34px] p-1.5 right-2 rounded-lg '>
                Genrate Code
            </button>}
        </div>
    )
}



const Dropdown = ({ width, placeholder }) => {
    return (
        <div className={twMerge(" text-gray-900 dark:text-gray-100 ", width)}>
            <div className="relative w-full group">
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">{placeholder}</label>

                <button className="py-2.5 px-3 w-full md:text-sm text-site text-black bg-transparent border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded ">All</button>
                <div
                    className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg w-full  peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-100   border border-dimmed text-xs md:text-sm">
                    <div
                        className=" w-full block cursor-pointer  text-black  hover:text-link px-3 py-2 rounded-md">
                        All (9)</div>
                    <div
                        className=" w-full block cursor-pointer hover:bg-white text-black  hover:text-link px-3 py-2 rounded-md">
                        Full Stack (6)
                    </div>
                    <div
                        className=" w-full block cursor-pointer hover:bg-white text-black  hover:text-link px-3 py-2 rounded-md">
                        Front End (1)
                    </div>
                    <div
                        className=" w-full block cursor-pointer hover:bg-white text-black  hover:text-link px-3 py-2 rounded-md">
                        Freelance (1)
                    </div>
                    <div
                        className=" w-full block cursor-pointer hover:bg-white text-black  hover:text-link px-3 py-2 rounded-md">
                        New Stack
                        Project (1)</div>
                </div>
            </div>
        </div>
    )
}