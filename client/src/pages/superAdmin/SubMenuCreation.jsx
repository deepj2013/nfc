import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Dropzone from "../../components/common/Dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductsServices,
  getAllProductListServices,
} from "../../redux/thunk/productServices";
import { logger } from "../../utils/Helper";
import moment from "moment";
import { menuCreationServices } from "../../redux/thunk/adminServices";

function SubMenuCreation() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    menuName: "Organisation Master",
    menuDescription: "Organisation Master",
    isActive: 1,
    parentMenuId: 0,
    routeUrl: "/rolemaster",
    menuOrder: 1,
    iconClass: "fa-submenu1",
    errors: {},
  });
  const {
    menuName,
    menuDescription,
    isActive,
    parentMenuId,
    routeUrl,
    menuOrder,
    iconClass,
    errors: {},
  } = formData;

  const upadteStateHandler = (e) => {
    let { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  //   const dropDownChange = (item) => {
  //     setFormData((pre) => ({ ...pre, categoryId: item?.category_id }));
  //   };

  //   const dropDownChangeVender = (item) => {
  //     setFormData((pre) => ({ ...pre, vendorId: item?.vendor }));
  //   };

  const handleValidation = () => {
    let error = {};
    let formIsValid = true;

    if (!menuName || !menuName.trim()) {
      error.menuNameError = " * Menu Name can't be empty";
      formIsValid = false;
    }

    if (!menuDescription || !menuDescription.trim()) {
      error.menuDescriptionError = " * Menu Description can't be empty";
      formIsValid = false;
    }

    if (!menuOrder || !menuOrder.trim()) {
      error.menuOrderError = " * Menu Order can't be empty";
      formIsValid = false;
    }

    // Add more validation checks as needed
    setFormData((prev) => ({ ...prev, errors: error }));
    return formIsValid;
  };

  const menuCreateHandler = async (e) => {
    e.preventDefault();
    let formIsValid = handleValidation();
    if (formIsValid) {
      try {
        delete [formData.errors];
        let response = await dispatch(menuCreationServices(formData)).unwrap();
        // dispatch(getAllProductListServices());
        navigate("/menu-creation-list");
      } catch (error) {
        console.log(error);
        logger(error);
      }
    }
  };

  const getHandler = async () => {
    try {
      let response = await dispatch(getcategoryServices()).unwarp();
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getHandler();
  }, []);

  const { categoryList } = useSelector((state) => state.categoryState);
  const { allVenderList } = useSelector((state) => state.inventaryState);
  // console.log("78909",allVenderList,categoryList)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-semibold h28">Add Products / Services</p>
        <div className="flex gap-4"></div>
      </div>

      <div className="flex bg-white p-4 rounded-lg  w-full border justify-between flex-wrap">
        <FormInput
          errors={errors.menuNameError}
          width={"w-[30%]"}
          placeholder={"Product Name"}
          value={productName}
          name={"productName"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.menuDescriptionError}
          width={"w-[30%]"}
          placeholder={"Description"}
          value={description}
          name={"description"}
          onChange={upadteStateHandler}
        />
        {/* <FormInput
                    width={'w-[30%]'}
                    placeholder={'Category Id'}
                    value={categoryId} name={"categoryId"} onChange={upadteStateHandler}

                /> */}
        <Dropdown
          width={"w-[30%]"}
          data={categoryList}
          placeholder={"Category Id"}
          // name={"categoryId"}
          onChange={(val) => dropDownChange(val)}
        />

        <FormInput
          errors={errors.menuOrderError}
          width={"w-[30%]"}
          placeholder={"price"}
          value={price}
          name={"price"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.quantityInStockError}
          width={"w-[30%]"}
          placeholder={"Quantity In Stock"}
          value={quantityInStock}
          name={"quantityInStock"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.unitOfMeasureError}
          width={"w-[30%]"}
          placeholder={"Unit Of Measure"}
          value={unitOfMeasure}
          name={"unitOfMeasure"}
          onChange={upadteStateHandler}
        />
        {/* <FormInput
          width={"w-[30%]"}
          placeholder={"Vendor Id"}
          value={vendorId}
          name={"vendorId"}
          onChange={upadteStateHandler}
        /> */}
        <Dropdown
          width={"w-[30%]"}
          data={allVenderList}
          placeholder={"Vendor Id"}
          // name={"categoryId"}
          onChange={(val) => dropDownChangeVender(val)}
        />
        <FormInput
          errors={errors.createdByError}
          type={"date"}
          width={"w-[30%]"}
          placeholder={"Created By"}
          // value={createdBy}
          name={"createdBy"}
          onChange={(e) => {
            const selectedDate = e.target.value;
            console.log("sachinTime", selectedDate);
            const timestamp = selectedDate
              ? new Date(selectedDate).getTime()
              : null;
            setFormData({
              ...formData,
              createdBy: timestamp,
            });
          }}
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

        <div className="w-full">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            {/* Upload Product Image */}
          </label>
          {/* <Dropzone/> */}
        </div>

        <button
          onClick={(e) => menuCreateHandler(e)}
          type="submit"
          className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SubMenuCreation;

const FormInput = ({
  width,
  showButton,
  placeholder,
  name,
  onChange,
  value,
  type,
  errors,
}) => {
  return (
    <div className={twMerge("mb-5 relative", width)}>
      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">
        {placeholder}
      </label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        type={type ? type : "text"}
        id="email"
        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        // chooseDate={date}
      />
      <span style={{ color: "red" }}>{errors}</span>
      {showButton && (
        <button className="text-sm bg-theme text-white absolute top-[34px] p-1.5 right-2 rounded-lg ">
          Genrate Code
        </button>
      )}
    </div>
  );
};

const Dropdown = ({ width, placeholder, data, onChange }) => {
  const [selectedVal, setSelectedVal] = useState("select");
  return (
    <div className={twMerge(" text-gray-900 dark:text-gray-100 ", width)}>
      <div className="relative w-full group">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {placeholder}
        </label>

        <button className="py-2.5 px-3 w-full md:text-sm text-site text-black bg-transparent border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded ">
          {selectedVal}
        </button>
        <div className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg w-full  peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-100   border border-dimmed text-xs md:text-sm">
          {data?.map((ele, ind) => {
            return (
              <div
                onClick={() => {
                  onChange(ele);
                  setSelectedVal(ele?.categoryName || ele?.vendor);
                }}
                className=" w-full block cursor-pointer  text-black  hover:text-link px-3 py-2 rounded-md"
              >
                {ele?.categoryName || ele?.vendor}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
