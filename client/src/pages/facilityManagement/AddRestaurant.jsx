import React, { useEffect, useState } from "react";
import ModalWrapper from "../../layout/ModalWrapper";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  createRestaurantServices,
  updateRestaurantServices,
} from "../../redux/thunk/micellaneousServices";
import { GENDER_DATA, logger, successToast } from "../../utils/Helper";
import moment from "moment";

export default function RestaurantModal({
  isOpen,
  setIsOpen,
  onClose,
  menuEdit,
  types,
}) {
  let CUISINES_DATA = [
    {
      label: "Italian",
      value: "Italian",
    },
    {
      label: "Chinese",
      value: "Chinese",
    },
    {
      label: "Thai",
      value: "Thai",
    },
    {
      label: "Indian",
      value: "Indian",
    },
    {
      label: "French",
      value: "French",
    },
    {
      label: "Japanese",
      value: "Japanese",
    },
    {
      label: "Mexican",
      value: "Mexican",
    },
  ];
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
      console.log("response899", response);
    } catch (error) {
      console.log(error);
      logger(error);
    }
    console.log("Submitting restaurant data:");
    // setIsOpen(false); // Close modal after submission
  };

  const updateTiming = (field, value) => {
    setRestaurantData((prev) => ({
      ...prev,
      timings: [{ ...prev.timings[0], [field]: value }],
    }));
  };

  useEffect(() => {
    if (menuEdit !== null && types === "edit") {
      setRestaurantData((pre) => ({
        ...pre,
        name: menuEdit?.name,
        type: menuEdit?.type,
        commissionRate: menuEdit?.commissionRate,
        description: menuEdit?.description,
        cuisines: menuEdit?.cuisines,
        images: menuEdit?.images,
        timings: menuEdit?.timings,
        isOpen: menuEdit?.isOpen,
        updatedBy: moment(menuEdit?.updatedBy).format("YYYY-MM-DD"),
      }));
    } else {
      setRestaurantData((prev) => ({
        ...prev,
        name: "",
        type: "",
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
      }));
    }
  }, [isOpen]);

  const updateHandler = async () => {
    let payload = {
      name: menuEdit?.name,
      type: menuEdit?.type,
      commissionRate: menuEdit?.commissionRate,
      description: menuEdit?.description,
      cuisines: menuEdit?.cuisines,
      images: menuEdit?.images,
      timings: menuEdit?.timings,
      isOpen: menuEdit?.isOpen,
      updatedBy: moment(menuEdit?.updatedBy).format("YYYY-MM-DD"),
    };
    try {
      let response = await dispatch(updateRestaurantServices(payload)).unwrap();
      console.log("responseresponse", response);
    } catch (error) {
      console.log(error);
      logger(error);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={types === "eidt" ? updateHandler : handleSubmit}
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

        <SelectDropdown
          data={CUISINES_DATA}
          handleSelectChange={(e) => {
            const selectedOptions = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setRestaurantData((prev) => ({
              ...prev,
              cuisines: selectedOptions, // Update the cuisines with the selected options
            }));
          }}
          selected={restaurantData.cuisines} // Set the selected values
          label={"Cuisines"}
          placeHolder={"Cuisines"}
        />

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

// function SelectDropdown({
//   data,
//   handleSelectChange,
//   selected,
//   label,
//   placeHolder,
//   errors,
// }) {
//   console.log(data);
//   return (
//     <div>
//       <div className="bg-white flex-col mt-4 mb-5">
//         <label className="mb-5" htmlFor="employee-select">
//           {label}{" "}
//         </label>
//         <select
//           id="employee-select"
//           onChange={handleSelectChange}
//           className="w-full p-2 mt-2 border rounded-lg bg-gray-100"
//           value={selected}
//         >
//           <option value=" ">{placeHolder}</option>
//           {data &&
//             data.map((item) => (
//               <option key={item?.value} value={item?.value}>
//                 {item?.label}
//               </option>
//             ))}
//         </select>
//         <p className="text-red-600 mt-3">{errors}</p>
//       </div>
//     </div>
//   );
// }

function SelectDropdown({
  data,
  handleSelectChange,
  selected,
  label,
  placeHolder,
  errors,
}) {
  return (
    <div>
      <div className="bg-white flex-col mt-4 mb-5">
        <label className="mb-5" htmlFor="employee-select">
          {label}
        </label>
        <select
          id="employee-select"
          onChange={handleSelectChange}
          className="w-full p-2 mt-2 border rounded-lg bg-gray-100"
          value={selected}
          multiple
        >
          <option value=" " disabled>
            {placeHolder}
          </option>
          {data &&
            data.map((item) => (
              <option key={item?.value} value={item?.value}>
                {item?.label}
              </option>
            ))}
        </select>
        <p className="text-red-600 mt-3">{errors}</p>
      </div>
    </div>
  );
}
