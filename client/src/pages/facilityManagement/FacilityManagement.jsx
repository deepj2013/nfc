// import React, { useEffect, useState } from "react";
// import Button from "../../components/common/Button";
// import { IoAddCircleSharp, IoEyeOutline } from "react-icons/io5";
// import { FiPrinter } from "react-icons/fi";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { IoFilterSharp } from "react-icons/io5";
// import Table from "../../components/common/Table";
// import { FaCirclePlus } from "react-icons/fa6";
// import { FaMinusCircle } from "react-icons/fa";
// import InventoryMangement from "../../components/Modal/InventoryStockMangement";
// import { useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllProductListServices } from "../../redux/thunk/productServices";
// import InventryHistoryModal from "../../components/Modal/InventryHistoryModal";
// import InventoryStockMangement from "../../components/Modal/InventoryStockMangement";
// import AddRestaurant from "./AddRestaurant";
// import RestaurantModal from "./AddRestaurant";

// function FacilityManagement() {
//   const [isOpenAddRestaurant, setIsOpenAddRestaurant] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   // const [isOpenStock, setIsOpenStock] = useState(false);
//   // const [view, setView] = useState("");

//   // const navigate = useNavigate();
//   // const dispatch = useDispatch();

//   // const getHandler = async () => {
//   //   try {
//   //     let response = await dispatch(getAllProductListServices()).unwrap();
//   //     console.log("hemender", response);
//   //   } catch (error) {
//   //     console.log("hemender", error);
//   //     logger(error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   getHandler();
//   // }, []);

//   // const { allProductList } = useSelector((state) => state.inventaryState);

//   return (
//     <div>
//       <div className="mb-6 flex items-center justify-between">
//         <p className="font-semibold h28">Restaurant</p>
//         <div className="flex gap-4">
//           <div className="flex gap-4">
//             <Button
//               onClick={() => {
//                 setIsOpen(true);
//               }}
//               rigntIcon={<IoAddCircleSharp className="text-2xl" />}
//               name={"Add Member"}
//             />
//           </div>

//           {/* <div className="bg-white shadow-sm px-3.5 text-2xl flex justify-center items-center rounded-xl text-gray-400 hover:bg-theme/10 hover:text-theme">
//             <MdOutlineFileDownload />
//             <div
//               id="tooltip-light"
//               role="tooltip"
//               class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
//             >
//               Tooltip content
//               <div class="tooltip-arrow" data-popper-arrow></div>
//             </div>
//           </div>
//           <div className="bg-white shadow-sm px-3.5 text-2xl flex justify-center items-center rounded-xl text-gray-400 hover:bg-theme/10 hover:text-theme">
//             <FiPrinter />
//           </div> */}
//         </div>
//       </div>
//       <div>
//         <div className=" ">
//           <div class="flex flex-col">
//             <div class=" overflow-x-auto pb-4">
//               <div class="min-w-full inline-block align-middle">
//                 <div class="overflow-hidden  shadow bg-white rounded-lg border-gray-300">
//                   <table class="table-auto min-w-full rounded-xl">
//                     <thead>
//                       <tr class="bg-gray-50">
//                         <th class="">
//                           <div class="flex items-center py-5 px-5 ">
//                             <input
//                               type="checkbox"
//                               value=""
//                               class="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
//                             />
//                           </div>
//                         </th>
//                         <th
//                           scope="col"
//                           class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
//                         >
//                           {" "}
//                           Id{" "}
//                         </th>
//                         <th
//                           scope="col"
//                           class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
//                         >
//                           {" "}
//                           productName{" "}
//                         </th>
//                         <th
//                           scope="col"
//                           class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize min-w-[150px]"
//                         >
//                           {" "}
//                           description{" "}
//                         </th>
//                         <th
//                           scope="col"
//                           class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
//                         >
//                           {" "}
//                           quantityInStock{" "}
//                         </th>
//                         <th
//                           scope="col"
//                           class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
//                         >
//                           {" "}
//                           reorderLevel{" "}
//                         </th>
//                         <th
//                           scope="col"
//                           class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
//                         >
//                           {" "}
//                           sku{" "}
//                         </th>
//                         <th
//                           scope="col"
//                           class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
//                         >
//                           {" "}
//                           price{" "}
//                         </th>
//                         <th
//                           scope="col"
//                           class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
//                         >
//                           {" "}
//                           unitOfMeasure{" "}
//                         </th>
//                         <th
//                           scope="col"
//                           class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
//                         >
//                           {" "}
//                           vendorId{" "}
//                         </th>
//                         <th
//                           scope="col"
//                           class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
//                         >
//                           {" "}
//                           Action
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody class="divide-y divide-gray-300 ">
//                       {[1, 2, 3, 4].map((ele, ind) => {
//                         console.log("================================", ele);
//                         return (
//                           <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
//                             <td class="">
//                               <div class="flex items-center py-5 px-5 ">
//                                 <input
//                                   type="checkbox"
//                                   value=""
//                                   class="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
//                                 />
//                               </div>
//                             </td>
//                             <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                               {ind + 1}{" "}
//                             </td>
//                             <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
//                               {ele?.productName}
//                             </td>
//                             {/* <td class=" px-5 py-3">
//                               <div class="w-48 flex items-center gap-3">
//                                 <img
//                                   className="h-10 w-10 rounded-full"
//                                   src="https://www.indianhealthyrecipes.com/wp-content/uploads/2015/10/pizza-recipe-1.jpg"
//                                   alt="Floyd image"
//                                 />
//                                 <div class="data">
//                                   <p class="font-normal text-sm text-gray-900">
//                                     Pizza
//                                   </p>
//                                 </div>
//                               </div>
//                             </td> */}
//                             <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                               {" "}
//                               {ele?.description}{" "}
//                             </td>
//                             <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                               {" "}
//                               {ele?.quantityInStock}{" "}
//                             </td>
//                             <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                               {" "}
//                               {ele?.reorderLevel}{" "}
//                             </td>
//                             <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                               {" "}
//                               {ele?.sku}{" "}
//                             </td>

//                             <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                               <div class="py-1.5 px-2.5 bg-emerald-50 rounded-full flex justify-center w-20 items-center gap-1">
//                                 <svg
//                                   width="5"
//                                   height="6"
//                                   viewBox="0 0 5 6"
//                                   fill="none"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                   <circle
//                                     cx="2.5"
//                                     cy="3"
//                                     r="2.5"
//                                     fill="#059669"
//                                   ></circle>
//                                 </svg>
//                                 <span class="font-medium text-xs text-emerald-600 ">
//                                   {`$ ${ele?.price}`}{" "}
//                                 </span>
//                               </div>
//                             </td>
//                             <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                               {" "}
//                               {ele?.unitOfMeasure}{" "}
//                             </td>
//                             <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                               {" "}
//                               {ele?.vendorId}{" "}
//                             </td>

//                             <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                               <div className="flex gap-2">
//                                 <div
//                                   onClick={() => {
//                                     setIsOpenAddRestaurant(true);
//                                   }}
//                                   class="py-1.5 px-2.5 bg-orange-400/30 rounded flex justify-center w-20 items-center gap-1"
//                                 >
//                                   <IoEyeOutline />

//                                   <span class="font-medium text-xs text-orange-500 ">
//                                     History
//                                   </span>
//                                 </div>

//                                 <div
//                                   onClick={() => {
//                                     setView("STOCK_IN");
//                                     setIsOpenStock(true);
//                                   }}
//                                   class="py-1.5 px-2.5 bg-green-500 rounded flex justify-center w-20 items-center gap-1"
//                                 >
//                                   <FaCirclePlus className="text-white" />

//                                   <span class="font-medium text-xs text-white ">
//                                     Stock In
//                                   </span>
//                                 </div>
//                                 <div
//                                   onClick={() => {
//                                     setView("STOCK_OUT");
//                                     setIsOpenStock(true);
//                                   }}
//                                   class="py-1.5 px-2.5 bg-red-400/30 rounded flex justify-center w-20 items-center gap-1"
//                                 >
//                                   <FaMinusCircle className="text-red-500" />

//                                   <span class="font-medium text-xs text-red-600 ">
//                                     Stock Out
//                                   </span>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <RestaurantModal
//         setIsOpen={setIsOpen}
//         isOpen={isOpen}
//         onClose={() => {
//           setIsOpen(false);
//         }}
//       />

//       {/* {isOpenStock && (
//         <InventoryStockMangement
//           isOpenStock={isOpenStock}
//           onClose={() => {
//             setIsOpenStock(false);
//           }}
//           view={view}
//         />
//       )} */}
//     </div>
//   );
// }

// export default FacilityManagement;

import React from "react";

const MenuCard = ({ name, cuisines, image, hours }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
    <div className="flex">
      <div className="w-1/4 relative">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <button className="bg-black bg-opacity-50 text-white p-1 rounded-full">
            &lt;
          </button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <button className="bg-black bg-opacity-50 text-white p-1 rounded-full">
            &gt;
          </button>
        </div>
      </div>
      <div className="w-3/4 p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">{cuisines}</p>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Object.entries(hours).map(([day, time]) => (
            <div key={day} className="bg-gray-100 p-1 rounded text-center">
              <p className="font-semibold text-sm">{day}</p>
              <p className="text-xs text-gray-600">{time}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <button className="px-4 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
              Delete
            </button>
            <button className="px-4 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
              Edit
            </button>
          </div>
          <div className="flex items-center">
            <a
              href="#"
              className="text-blue-600 hover:underline mr-2 text-sm flex items-center"
            >
              View More
              <span className="ml-1">→</span>
            </a>
            <button className="px-4 py-1 bg-blue-700 text-white rounded hover:bg-blue-800">
              Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function RestaurantMenuList() {
  const menus = [
    {
      name: "INDIAN MENU",
      cuisines: "North Indian, FastFood, Chinese",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-03%20at%2022.52.35-xYhgSqRmzqQ20rYE0SjANqWf7IAnYY.png",
      hours: {
        Mon: "11:00 - 23:00",
        Tue: "11:00 - 23:00",
        Wed: "11:00 - 23:00",
        Thu: "11:00 - 23:00",
        Fri: "11:00 - 23:00",
        Sat: "11:00 - 23:00",
        Sun: "11:00 - 23:00",
      },
    },
    {
      name: "CHINESE MENU",
      cuisines: "Chinese",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-03%20at%2022.52.35-xYhgSqRmzqQ20rYE0SjANqWf7IAnYY.png",
      hours: {
        Mon: "11:00 - 23:00",
        Tue: "11:00 - 23:00",
        Wed: "11:00 - 23:00",
        Thu: "11:00 - 23:00",
        Fri: "11:00 - 23:00",
        Sat: "11:00 - 23:00",
        Sun: "11:00 - 23:00",
      },
    },
    {
      name: "CONTINENTAL MENU",
      cuisines: "Italian",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-03%20at%2022.52.35-xYhgSqRmzqQ20rYE0SjANqWf7IAnYY.png",
      hours: {
        Mon: "11:00 - 23:00",
        Tue: "11:00 - 23:00",
        Wed: "11:00 - 23:00",
        Thu: "11:00 - 23:00",
        Fri: "11:00 - 23:00",
        Sat: "11:00 - 23:00",
        Sun: "11:00 - 23:00",
      },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {menus.map((menu, index) => (
        <MenuCard key={index} {...menu} />
      ))}
    </div>
  );
}
