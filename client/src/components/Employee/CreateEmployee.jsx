import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
const CreateEmployee = ({ isOpen, onClose, setFeedBackModal }) => {
    const navigate = useNavigate()
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
                className={`bg-white  overflow-scroll w-[95vw] lg:w-[700px] py-4 rounded-lg h-[95vh] lg:h-auto  shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"
                    }`}
                style={{  minHeight: "100px" }}
            >
                <button
                    onClick={onClose}
                    className="text-2xl absolute right-2 top-2 text-secondry">
                    <FaXmark />
                </button>
                <div className="p-4 flex flex-col items-center">


                    <h2 className="text-2xl  w-full font-medium lg:px-10">Employee Creation</h2>
                    {/* <img className="w-64  h-32 my-6 object-cover" src={TeacherFeedback}/> */}
                    <p className="text-xl mt-4 w-full"></p>
                    <div className="w-full lg:px-10">
                        <div className="flex justify-between lg:gap-6 flex-wrap lg:flex-nowrap">
                        <Input  placeholder={'First Name'}/>
                        <Input placeholder={'Last Name'}/>
                        </div>

                        <div className="flex justify-between lg:gap-6 flex-wrap lg:flex-nowrap">
                        <Input placeholder={'Email'}/>
                        <Input placeholder={'Mobile Number'}/>
                        </div>
                        <div className="flex justify-between lg:gap-6 flex-wrap lg:flex-nowrap">
                        <Input placeholder={'Date of Birth'}/>
                        <Input placeholder={'Date of joining'}/>
                        </div>
                        <Input placeholder={'Designation'}/>
                        <Input placeholder={'Salary Structure'}/>
                        <Input placeholder={'Employee code'}/>
                    <Button/>
                    </div>

                </div>
            </div>
        </div>
    );
};


export default CreateEmployee


