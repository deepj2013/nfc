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
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { uploadFileServices } from "../../redux/thunk/useMangementServices";

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
      isSelected: false,
    },
    {
      label: "Chinese",
      value: "Chinese",
      isSelected: false,

    },
    {
      label: "Thai",
      value: "Thai",
      isSelected: false,

    },
    {
      label: "Indian",
      value: "Indian",
      isSelected: false,

    },
    {
      label: "French",
      value: "French",
      isSelected: false,

    },
    {
      label: "Japanese",
      value: "Japanese",
      isSelected: false,

    },
    {
      label: "Mexican",
      value: "Mexican",
      isSelected: false,

    },
  ];
  const [cuisinesShow, setCuisinesShow] = useState(false)
  const [cuisines, setCuisines] = useState(CUISINES_DATA)
  const [selectedData, setSelectedData] = useState([]);
  const [imageArray, setImageArray] = useState([]);
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


  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDaySelect = (day) => {
    // Toggle selected state
    if (selectedDays.includes(day)) {
      // Deselect the day if it's already selected
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      // Select the day
      setSelectedDays([...selectedDays, day]);
    }
  };


  const handleIsSelected = (index) => {
    const updatedCuisines = cuisines.map((ele, ind) =>
      ind === index ? { ...ele, isSelected: !ele.isSelected } : ele
    );
    setCuisines(updatedCuisines);

    const selectedItem = updatedCuisines[index];

    if (selectedItem.isSelected) {
      // Add to selectedData if selected
      setSelectedData([...selectedData, selectedItem.label]);
    } else {
      // Remove from selectedData if deselected
      setSelectedData(selectedData.filter((item) => item !== selectedItem.label));
    }
  };



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



  const handleFileChange = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    uploadFile(e.target.files[0]);
  };


  const uploadFile = async (file) => {
    try {
      let response = await dispatch(uploadFileServices(file)).unwrap();
      console.log("responseresponse{}{", response?.fileUrl);
      setImageArray([...imageArray, response?.fileUrl]);
    } catch (error) {
      console.log(error);
      logger(error);
    }
  };

  console.log(imageArray);
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
      setSelectedData(menuEdit?.cuisines);
      setImageArray(menuEdit?.images);
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
      setSelectedData([]);
      setImageArray([]);
    }
  }, [isOpen]);

  const updateHandler = async () => {
    let payload = {
      name: menuEdit?.name,
      type: menuEdit?.type,
      commissionRate: menuEdit?.commissionRate,
      description: menuEdit?.description,
      cuisines: selectedData,
      images: imageArray,
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
        className="mt-2 text-left h-[85vh] overflow-scroll"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            required
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
        </div>{ }

        <p onClick={() => {
          setCuisinesShow(!cuisinesShow);
        }}>Select Cusine</p>
        <div className=" p-2 rounded-md bg-slate-100">
          {
            <div className=" flex overflow-scroll">
              {selectedData.length > 0 ? (
                <div className="flex">
                  {selectedData.map((data, idx) => (
                    <p className="bg-black/10 text-sm p-1 rounded-md mr-3" key={idx}>{data}</p>
                  ))}
                </div>
              ) : (
                <p>No cuisines selected.</p>
              )}
            </div>
          }
        </div>
        {cuisinesShow && <div className="bg-slate-50 p-4 rounded-md h-[200px] overflow-scroll border">
          {
            cuisines?.map((ele, ind) => {
              return (
                <div className="flex  mb-2 justify-between">
                  <div>
                    {ele?.label}
                  </div>
                  <button type="button" onClick={() => handleIsSelected(ind)}>
                    {!ele?.isSelected ? <MdOutlineCheckBoxOutlineBlank /> : <IoCheckbox />}
                  </button>
                </div>
              )
            })
          }
        </div>}

        <p className="text-base font-semibold mt-4">Upload Restaurant Image</p>
        <div className="my-2 mb-4 flex">
          <div className="flex gap-3">
            {
              imageArray?.map((image, ind) => {
                return (
                  <img className="h-10 w-10 border" src={image} alt={'ind' + 1} />
                )
              })
            }
          </div>


          <div className="ml-3">
            <div class=" border border-indigo-500 bg-gray-50 p-4 shadow-md h-10 w-10 flex justify-center items-center ">
              <label
                for="upload"
                class="flex flex-col items-center gap-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 fill-white stroke-indigo-500"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </label>
              <input
                onChange={handleFileChange}
                id="upload"
                type="file"
                class="hidden"
              />
            </div>
          </div>


        </div>
        <div className="flex space-x-2 w-full mb-4 overflow-scroll">
          {daysOfWeek.map((day, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleDaySelect(day)}
              className={`px-4 text-sm  py-2 rounded-full ${selectedDays.includes(day) ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
            >
              {day}
            </button>
          ))}
        </div>


        <div className="grid grid-cols-2 gap-3 ">
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
