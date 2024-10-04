// import React, { useState } from "react";
// import { FaXmark } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";

// import { stockInOrOutServices } from "../../redux/thunk/productServices";
// import { logger, successToast } from "../../utils/Helper";
// import { getStorageValue } from "../../services/LocalStorageServices";
// import { useDispatch } from "react-redux";
// import { twMerge } from "tailwind-merge";
// import Button from "../../components/common/Button";
// import SelectDropdown from "../../components/common/SelectDropdown";

// const AddRestaurant = ({ isOpenAddRestaurant, onClose, view }) => {
//   console.log("view is open", view);
//   let userDetails = getStorageValue("userDetails");
//   const [formData, setFormData] = useState({
//     sku: "",
//     transactionType: view === "STOCK_IN" ? "inward" : "outward",
//     quantity: null,
//     departmentId: "",
//     createdBy: 2,
//     remarks: "",
//     errors: {},
//   });

//   const {
//     sku,
//     transactionType,
//     quantity,
//     departmentId,
//     createdBy,
//     remarks,
//     errors,
//   } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const upadteStateHandler = (e) => {
//     let { name, value } = e.target;
//     setFormData((pre) => ({ ...pre, [name]: value }));
//   };

//   const handleValidation = () => {
//     const validationRules = {
//       sku: { required: true },
//       quantity: { required: true },
//       departmentId: { required: true },
//       remarks: { required: true },
//     };
//     const formData = {
//       sku,
//       quantity,
//       departmentId,
//       remarks,
//     };
//     const { formIsValid, errors } = validateFields(formData, validationRules);
//     setFormData((prev) => ({ ...prev, errors }));
//     return formIsValid;
//   };

//   const createStockInOrOutHandler = async () => {
//     // let formIsValid = handleValidation();
//     // if (!formIsValid) {
//     //   return;
//     // }

//     let payload = {
//       sku,
//       transactionType,
//       quantity,
//       departmentId,
//       createdBy,
//       remarks,
//     };

//     try {
//       let response = await dispatch(stockInOrOutServices(payload)).unwrap();
//       successToast("Category created successfully");
//       onClose();
//     } catch (error) {
//       console.log(error);
//       logger(error);
//     }
//   };

//   const department_Id = [
//     {
//       label: "DEP001",
//       value: "DEP001",
//     },
//     {
//       label: "DEP001",
//       value: "DEP001",
//     },
//     {
//       label: "DEP001",
//       value: "DEP001",
//     },
//   ];

//   return (
//     <div
//       className={`fixed w-full inset-0 flex items-center justify-center z-[999] transition-opacity duration-300 ${
//         isOpenAddRestaurant ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
//           isOpenAddRestaurant ? "opacity-100" : "opacity-0"
//         }`}
//         // onClick={onClose}
//       ></div>
//       <div
//         className={`bg-white  overflow-scroll w-[95vw] lg:w-[500px] py-4 rounded-lg h-[95vh] lg:h-auto  shadow-xl transform transition-transform duration-300 ${
//           isOpenAddRestaurant ? "translate-y-0" : "translate-y-full"
//         }`}
//         style={{ minHeight: "100px" }}
//       >
//         <button
//           onClick={onClose}
//           className="text-2xl absolute right-2 top-2 text-secondry"
//         >
//           <FaXmark />
//         </button>
//         <div className=" flex flex-col items-center">
//           <h2 className="text-2xl  w-full font-medium lg:px-10">
//             Create New Restaurant
//           </h2>

//           <p className="text-xl mt-4 w-full"></p>
//           <div className="w-full lg:px-10">
//             <FormInput
//               errors={errors?.sku}
//               placeholder={"sku"}
//               value={sku}
//               name={"sku"}
//               onChange={upadteStateHandler}
//             />

//             <FormInput
//               errors={errors?.quantity}
//               placeholder={"quantity"}
//               value={quantity}
//               name={"quantity"}
//               onChange={upadteStateHandler}
//             />

//             <SelectDropdown
//               data={department_Id}
//               handleSelectChange={(e) => {
//                 setFormData((pre) => ({
//                   ...pre,
//                   departmentId: e.target.value,
//                 }));
//               }}
//               selected={departmentId}
//               label={"departmentId"}
//               placeHolder={"departmentId"}
//             />
//             <FormInput
//               errors={errors?.remarks}
//               placeholder={"remarks"}
//               value={remarks}
//               name={"remarks"}
//               onChange={upadteStateHandler}
//             />

//             <Button
//               name={"Add"}
//               style={"w-full py-2"}
//               onClick={createStockInOrOutHandler}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddRestaurant;

// const FormInput = ({
//   width,
//   showButton,
//   placeholder,
//   name,
//   onChange,
//   value,
//   type,
//   errors,
// }) => {
//   return (
//     <div class={twMerge("mb-5 relative", width)} className="fle">
//       <div className="flex flex-row justify-center items-center w-full">
//         <label
//           for="email"
//           class="block mb-2 text-sm font-medium text-gray-900 "
//         >
//           {placeholder}
//         </label>
//         <div>
//           <input
//             onChange={onChange}
//             value={value}
//             name={name}
//             type={type ? type : "text"}
//             id="email"
//             class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder={placeholder}
//             required
//             // chooseDate={date}
//           />
//           <span style={{ color: "red" }}>{errors}</span>
//         </div>
//       </div>
//       {showButton && (
//         <button className="text-sm bg-theme text-white absolute top-[34px] p-1.5 right-2 rounded-lg ">
//           Genrate Code
//         </button>
//       )}
//     </div>
//   );
// };

import React, { useState } from "react";
import ModalWrapper from "../../layout/ModalWrapper";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { createRestaurantServices } from "../../redux/thunk/micellaneousServices";

export default function RestaurantModal({ isOpen, setIsOpen, onClose }) {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    type: "Third-Party",
    commissionRate: 30,
    description: "",
    cuisines: [],
    images: ["", "", ""],
    timings: [
      {
        days: [0, 1, 2, 3, 4, 5, 6],
        openingTime: "11:00",
        closingTime: "22:00",
      },
    ],
    isOpen: true,
    createdBy: 1,
    updatedBy: 1,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    setRestaurantData((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const handleImageChange = (index, value) => {
    setRestaurantData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await dispatch(
        createRestaurantServices(restaurantData)
      ).unwrap();
      successToast("Category created successfully");
      onClose();
    } catch (error) {
      console.log(error);
      logger(error);
    }
    console.log("Submitting restaurant data:");
    setIsOpen(false); // Close modal after submission
  };

  const updateTiming = (field, value) => {
    setRestaurantData((prev) => ({
      ...prev,
      timings: [{ ...prev.timings[0], [field]: value }],
    }));
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="mt-2 text-left h-[500px] overflow-scroll"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={restaurantData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            value={restaurantData.type}
            onChange={handleTypeChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Own">Own</option>
            <option value="Partnership">Partnership</option>
            <option value="Third-Party">Third-Party</option>
          </select>
        </div>

        {(restaurantData.type === "Partnership" ||
          restaurantData.type === "Third-Party") && (
          <div className="mb-4">
            <label
              htmlFor="commissionRate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Commission Rate
            </label>
            <input
              type="number"
              id="commissionRate"
              name="commissionRate"
              value={restaurantData.commissionRate}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={restaurantData.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cuisines"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Cuisines
          </label>
          <input
            type="text"
            id="cuisines"
            name="cuisines"
            value={restaurantData.cuisines.join(", ")}
            onChange={(e) =>
              setRestaurantData((prev) => ({
                ...prev,
                cuisines: e.target.value.split(", "),
              }))
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {restaurantData.images.map((image, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`image-${index}`}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Image {index + 1}
            </label>
            <input
              type="text"
              id={`image-${index}`}
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}

        <div className="mb-4">
          <label
            htmlFor="openingTime"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Opening Time
          </label>
          <input
            type="time"
            id="openingTime"
            value={restaurantData.timings[0].openingTime}
            onChange={(e) => updateTiming("openingTime", e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="closingTime"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Closing Time
          </label>
          <input
            type="time"
            id="closingTime"
            value={restaurantData.timings[0].closingTime}
            onChange={(e) => updateTiming("closingTime", e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="isOpen"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Is Open
          </label>
          <input
            type="checkbox"
            id="isOpen"
            checked={restaurantData.isOpen}
            onChange={(e) =>
              setRestaurantData((prev) => ({
                ...prev,
                isOpen: e.target.checked,
              }))
            }
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Restaurant
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
