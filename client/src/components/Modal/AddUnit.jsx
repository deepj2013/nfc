import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import Dropdown from "../common/DropDown";
import { useDispatch } from "react-redux";
import { getMeasurementUnitsServices, measurementUnitsServices } from "../../redux/thunk/unitServices";
import { handleError } from "../../utils/ErrorHandler";
import { logger } from "../../utils/Helper";

const AddUnit = ({ isOpen, onClose, setFeedBackModal }) => {
    const navigate = useNavigate()

    const dispatch=useDispatch();
    const [formData, setFormData] = useState({
  "unitName": "",
  "abbreviation": "",
  "conversionFactor": 1,
  "productId": "",
  "createdBy": 1,
  "updatedBy": 1
    })
const {unitName,abbreviation,conversionFactor,productId,createdBy,updatedBy,}= formData


    const upadteStateHandler = (e)=>{
        let {name,value}=e.target
        setFormData((pre)=>({...pre,[name]:value}))
    }

    const addUnitHandler =async ()=>{
        // alert("this is test")
        try {
            console.log("hhh")
            let response = await dispatch(measurementUnitsServices(formData)).unwrap();
            dispatch(getMeasurementUnitsServices())
onClose()
            
        } catch (error) {
            console.log(error);
            logger(error)
        }
    }
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


                    <h2 className="text-2xl  w-full font-medium lg:px-8">Add Units</h2>
                    {/* <img className="w-64  h-32 my-6 object-cover" src={TeacherFeedback}/> */}
                    <p className="text-xl mt-4 w-full"></p>
                    <div className="w-full lg:px-8">
                        <Input placeholder={'Name'} value={unitName} name={"unitName"} onChange={upadteStateHandler}/>

                        <Input placeholder={'Symbol'} value={abbreviation} name={"abbreviation"} onChange={upadteStateHandler}/>

                    
                        <Input placeholder={'Parent Unit'} value={conversionFactor} name={"conversionFactor"} onChange={upadteStateHandler}/>





                        <Button name={'Add'} style={'w-full py-2'} onClick={addUnitHandler}/>
                    </div>

                </div>
            </div>
        </div>
    );
};


export default AddUnit


