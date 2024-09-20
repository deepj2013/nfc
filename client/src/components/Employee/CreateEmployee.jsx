import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { successToast } from "../../utils/Helper";
import { createusersServices, employeeListServices } from "../../redux/thunk/useMangementServices";
const CreateEmployee = ({ isOpen, onClose, setFeedBackModal }) => {
    const navigate = useNavigate()
    const { employees,roleList } = useSelector((state) => state.userStateMangementState)
    const dispatch = useDispatch()
    // Handle dropdown change
    const handleSelectChange = (event) => {
        const selectedId = event.target.value;
        setFormDetails((pre) => ({ ...pre, user_id_parent: selectedId }))
    };

    const handleSelectChange1 = (event) => {
        const selectedId = event.target.value;
        setFormDetails((pre) => ({ ...pre, role_id: selectedId }))
    };
    const [formDetails, setFormDetails] = useState({
        user_name: '',
        mobile_number: '',
        email_id: '',
        password: '',
        user_id_parent: '',
        role_id: '',

    })



    const updateStateHandler = (e) => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    }


    const submitHandler = async (e) => {
        try {
            let response = await dispatch(createusersServices(formDetails)).unwrap()
            successToast('User Add Successfully')
            dispatch(employeeListServices())
            onClose()

        } catch (error) {
            console.log(error);
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
                className={`bg-white  overflow-scroll w-[95vw] lg:w-[420px] py-4 rounded-lg h-[95vh] lg:h-auto  shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-y-0" : "translate-y-full"
                    }`}
                style={{ minHeight: "100px" }}
            >
                <button
                    onClick={onClose}
                    className="text-2xl absolute right-2 top-2 text-secondry">
                    <FaXmark />
                </button>
                <div className=" flex flex-col items-center">


                    <h2 className="text-2xl  w-full font-medium lg:px-5">Employee Creation</h2>
                    {/* <img className="w-64  h-32 my-6 object-cover" src={TeacherFeedback}/> */}
                    <p className="text-xl mt-4 w-full"></p>
                    <div className="w-full lg:px-6">
                        <Input onChange={updateStateHandler} name={'user_name'} placeholder={'Name'} />
                        <Input placeholder={'Mobile Number'} onChange={updateStateHandler} name={'mobile_number'} />
                        <Input placeholder={'Email'} onChange={updateStateHandler} name={'email_id'} />
                        <Input placeholder={'Password'} onChange={updateStateHandler} name={'password'} />

                        <div className="bg-white flex-col">
                            <label className="mb-5" htmlFor="employee-select">Role</label>
                            <select id="employee-select" onChange={handleSelectChange1} className="w-full p-2 mt-2 border rounded-lg bg-gray-100" value={formDetails?.role_id}>
                                <option value="" disabled>Select an employee</option>
                                {roleList && roleList.map((role) => (
                                    <option key={role?.role_id} value={role?.role_id}>
                                        {role?.role_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-white flex-col mt-4 mb-5">
                            <label className="mb-5" htmlFor="employee-select">Select Employee: </label>
                            <select id="employee-select" onChange={handleSelectChange} className="w-full p-2 mt-2 border rounded-lg bg-gray-100" value={formDetails?.user_id_parent}>
                                <option value="" disabled>Select an employee</option>
                                {employees && employees.map((employee) => (
                                    <option key={employee?.user_id} value={employee?.user_id}>
                                        {employee?.user_name}
                                    </option>
                                ))}
                            </select>
                        </div>


       

                        <Button onClick={submitHandler} name={'Submit'} />
                    </div>

                </div>
            </div>
        </div>
    );
};


export default CreateEmployee


