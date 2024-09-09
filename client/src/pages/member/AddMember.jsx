import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
// import Dropdown from "../common/DropDown";
import { useDispatch } from "react-redux";
import { getMeasurementUnitsServices, measurementUnitsServices, measurementUpdateUnitServices } from "../../redux/thunk/unitServices";
import { handleError } from "../../utils/ErrorHandler";
import { errorToast, logger } from "../../utils/Helper";
import moment from "moment";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { UpdateMemberServices, createMemberServices, getMemberCategoryServices } from "../../redux/thunk/vendorServices";

const AddMember = ({ isOpen, onClose, setFeedBackModal,selectedItem,type }) => {
    console.log("ghjkl",selectedItem)
    const navigate = useNavigate()

    const dispatch=useDispatch();
    const [formData, setFormData] = useState({
  "memberCategory": "",
  "status": true,
  "createdBy": 1,
  "updatedBy": 1
})
const {memberCategory,status,createdBy,updatedBy,}= formData


    const upadteStateHandler = (e)=>{
        let {name,value}=e.target
        setFormData((pre)=>({...pre,[name]:value}))
    }

    const validation=()=>{
    if(!memberCategory){
        errorToast("memberCategory can't be empaty")
        return false
    }
    return true
}

    const addMemberHandler =async ()=>{
        if(!validation()){
            return
        }
        if(!memberCategory){
             toast.success("Pls", {
            position: "top-right",
            autoClose: 1000,
          });
        }
        try {

            console.log("hhh")
            let response = await dispatch(createMemberServices(formData)).unwrap();
            
            dispatch(getMeasurementUnitsServices())
            onClose()
            
        } catch (error) {
            console.log(error);
            logger(error)
        }
    }

    useEffect(() => {
    if (selectedItem!== null && type==="edit") {
      setFormData((pre) => ({
        ...pre,
        memberCategory: selectedItem?.memberCategory,
        
      }));
    } else {
      setFormData((prev)=>(
        {...prev,
         memberCategory:"",
      }));
    }
  }, [isOpen]);

  

  const updateMemberHandler = async () => {

    // debugger
    let payload =
        {
 memberCategory:memberCategory,
  updatedBy:12345
    }
    try {
      let response = await dispatch(UpdateMemberServices(selectedItem?.memberCategoryId,payload)).unwrap();
      console.log("responserespons567",response.result)
      if(response.msg==="success"){
        dispatch(getMemberCategoryServices())
        onClose()
      }
    } catch (error) {
      console.log(error);
      logger(error);
    }
  };
    
    return (
        <div
            className={`fixed w-full inset-0 flex items-center justify-center z-[999] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
            // onClick={onClose}
            ></div>
            <div
                className={`bg-white  overflow-scroll w-[95vw] lg:w-[500px] py-4 rounded-lg h-[95vh] lg:h-auto  shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"
                    }`}
                style={{ minHeight: "100px" }}
            >
                <button
                    onClick={onClose}
                    className="text-2xl absolute right-2 top-2 text-secondry">
                    <FaXmark />
                </button>
                <div className=" flex flex-col items-center">


                    <h2 className="text-2xl  w-full font-medium lg:px-8">Add Member</h2>
                    {/* <img className="w-64  h-32 my-6 object-cover" src={TeacherFeedback}/> */}
                    <p className="text-xl mt-4 w-full"></p>
                    <div className="w-full lg:px-8">
                        <Input placeholder={'memberCategory'} value={memberCategory} name={"memberCategory"} onChange={upadteStateHandler}/>

                        {/* <Input placeholder={'Symbol'} value={abbreviation} name={"abbreviation"} onChange={upadteStateHandler}/> */}

                    
                        {/* <Input placeholder={'Parent Unit'} value={conversionFactor} name={"conversionFactor"} onChange={upadteStateHandler}/> */}





                        <Button name={'Add'} style={'w-full py-2'} onClick={selectedItem?updateMemberHandler:addMemberHandler}/>
                    </div>

                </div>
            </div>
        </div>
    );
};


export default AddMember


