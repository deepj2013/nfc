import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import Dropdown from "../common/DropDown";

const InventoryMangement = ({ isOpen, onClose, setFeedBackModal }) => {
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


                    <h2 className="text-2xl  w-full font-medium lg:px-10">Manage Inventory</h2>
                    {/* <img className="w-64  h-32 my-6 object-cover" src={TeacherFeedback}/> */}
                    <p className="text-xl mt-4 w-full"></p>
                    <div className="w-full lg:px-10">
                        <Input placeholder={'Name'} />

                        <Input placeholder={'Qunatity'} />

                        <Dropdown placeholder={'Unit'}/>

                        <div class="w-full">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">           
                     Notes
                    </label>
                    <textarea rows="3"
                        class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
                </div>

                   
                <Button name={'Add'} style={'w-full py-2'} />
                    </div>

                </div>
            </div>
        </div>
    );
};


export default InventoryMangement


