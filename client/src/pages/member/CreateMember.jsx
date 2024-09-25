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
import { getStorageValue } from "../../services/LocalStorageServices";
import { createMemberServices } from "../../redux/thunk/useMangementServices";

function CreateMember() {
  const dispatch = useDispatch();
  let userDetails = getStorageValue("userDetails");
  //   console.log("jkhvgjkl", userDetails);

  const [formData, setFormData] = useState({
    memberCategory: "SENIOR_CITIZEN_RESIDENT",
    memberType: "Regular",
    title: "Mr",
    firstName: "",
    middleName: "",
    surname: "",
    fatherName: "",
    husbandName: "",
    spouseName: "",
    gender: "Male",
    dateOfBirth: "1950-04-22",
    maritalStatus: "singale",
    nationality: "",
    bloodGroup: "",
    mobileNumber: "",
    emailId: "",
    phoneNumber: "",
    membershipStatus: "Active",
    panNumber: "",
    weddingDate: "2005-06-15",
    serviceBusinessDetail: "",
    occupation: "",
    organization: "",
    designation: "",
    address: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
    createdBy: userDetails?.role_id,
    updatedBy: userDetails?.role_id,
    errors: {},
  });
  const {
    memberCategory,
    memberType,
    title,
    firstName,
    middleName,
    surname,
    fatherName,
    husbandName,
    spouseName,
    gender,
    dateOfBirth,
    maritalStatus,
    nationality,
    bloodGroup,
    mobileNumber,
    emailId,
    phoneNumber,
    membershipStatus,
    panNumber,
    weddingDate,
    serviceBusinessDetail,
    occupation,
    organization,
    designation,
    address,
    emergencyContactName,
    emergencyContactNumber,
    emergencyContactRelation,
    errors,
  } = formData;

  // console.log("payload", formData);

  const upadteStateHandler = (e) => {
    let { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const dropDownChange = (item) => {
    setFormData((pre) => ({ ...pre, categoryId: item?.category_id }));
  };

  const dropDownChangeVender = (item) => {
    setFormData((pre) => ({ ...pre, vendorId: item?.vendor }));
  };

  const handleValidation = () => {
    let error = {};
    let formIsValid = true;

    if (!firstName || !firstName.trim()) {
      error.firstNameError = " * First name can't be empty";
      formIsValid = false;
    }

    if (!middleName || !middleName.trim()) {
      error.middleName = " * Smiddle name can't be empty";
      formIsValid = false;
    }

    if (!surname || !surname.trim()) {
      error.surnameError = " * Surname can't be empty";
      formIsValid = false;
    }
    if (!fatherName || !fatherName.trim()) {
      error.fatherNameError = " * Father Name can't be empty";
      formIsValid = false;
    }
    if (!husbandName || !husbandName.trim()) {
      error.husbandNameError = " * Husband Name can't be empty";
      formIsValid = false;
    }
    if (!spouseName || !spouseName.trim()) {
      error.spouseNameError = " * Spouse Name can't be empty";
      formIsValid = false;
    }
    if (!nationality || !nationality.trim()) {
      error.nationalityError = " * Nationality can't be empty";
      formIsValid = false;
    }
    if (!bloodGroup || !bloodGroup.trim()) {
      error.bloodGroupError = " * Blood Group can't be empty";
      formIsValid = false;
    }
    if (!mobileNumber || !mobileNumber.trim()) {
      error.mobileNumberError = " * Mobile Number can't be empty";
      formIsValid = false;
    }
    if (!emailId || !emailId.trim()) {
      error.emailIdError = " * EmailId can't be empty";
      formIsValid = false;
    }
    if (!phoneNumber || !phoneNumber.trim()) {
      error.phoneNumberError = " * Phone Number can't be empty";
      formIsValid = false;
    }
    if (!panNumber || !panNumber.trim()) {
      error.panNumberError = " * Pan Number can't be empty";
      formIsValid = false;
    }
    if (!serviceBusinessDetail || !serviceBusinessDetail.trim()) {
      error.serviceBusinessDetailError =
        " * Service Business Detail can't be empty";
      formIsValid = false;
    }
    if (!occupation || !occupation.trim()) {
      error.occupationError = " * Occupation can't be empty";
      formIsValid = false;
    }

    if (!organization || !organization.trim()) {
      error.organizationError = " * Organization can't be empty";
      formIsValid = false;
    }

    if (!designation || !designation.trim()) {
      error.designationError = " * Designation can't be empty";
      formIsValid = false;
    }
    if (!address || !address.trim()) {
      error.addressError = " * Aaddress can't be empty";
      formIsValid = false;
    }
    if (!emergencyContactName || !emergencyContactName.trim()) {
      error.emergencyContactNameError =
        " * Emergency Contact Name can't be empty";
      formIsValid = false;
    }
    if (!emergencyContactNumber || !emergencyContactNumber.trim()) {
      error.emergencyContactNumberError =
        " * Emergency Contact Number can't be empty";
      formIsValid = false;
    }
    if (!emergencyContactRelation || !emergencyContactRelation.trim()) {
      error.emergencyContactRelationError =
        " * emergencyContactRelation can't be empty";
      formIsValid = false;
    }

    setFormData((prev) => ({ ...prev, errors: error }));
    return formIsValid;
  };

  const addMemberHandler = async (e) => {
    e.preventDefault();
    let formIsValid = handleValidation();
    if (formIsValid) {
      try {
        delete [formData.errors];
        let response = await dispatch(createMemberServices(formData)).unwrap();
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
        <p className="font-semibold h28">Member / Services</p>
        <div className="flex gap-4"></div>
      </div>

      <div className="flex bg-white p-4 rounded-lg  w-full border justify-between flex-wrap">
        <FormInput
          errors={errors.firstNameError}
          width={"w-[30%]"}
          placeholder={"First Name"}
          value={firstName}
          name={"firstName"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.middleName}
          width={"w-[30%]"}
          placeholder={"Middle Name"}
          value={middleName}
          name={"middleName"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.surnameError}
          width={"w-[30%]"}
          placeholder={"Surname"}
          value={surname}
          name={"surname"}
          onChange={upadteStateHandler}
        />
        {/* <Dropdown
          width={"w-[30%]"}
          data={categoryList}
          placeholder={"Category Id"}
          // name={"categoryId"}
          onChange={(val) => dropDownChange(val)}
        /> */}

        <FormInput
          errors={errors.fatherNameError}
          width={"w-[30%]"}
          placeholder={"Father Name"}
          value={fatherName}
          name={"fatherName"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.husbandNameError}
          width={"w-[30%]"}
          placeholder={"Husband Name"}
          value={husbandName}
          name={"husbandName"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.spouseNameError}
          width={"w-[30%]"}
          placeholder={"Spouse Name"}
          value={spouseName}
          name={"spouseName"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.nationalityError}
          width={"w-[30%]"}
          placeholder={"Nationality"}
          value={nationality}
          name={"nationality"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.bloodGroupError}
          width={"w-[30%]"}
          placeholder={"BloodGroup"}
          value={bloodGroup}
          name={"bloodGroup"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.mobileNumberError}
          width={"w-[30%]"}
          placeholder={"Mobile Number"}
          value={mobileNumber}
          name={"mobileNumber"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.emailIdError}
          width={"w-[30%]"}
          placeholder={"EmailId"}
          value={emailId}
          name={"emailId"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.phoneNumberError}
          width={"w-[30%]"}
          placeholder={"Phone Number"}
          value={phoneNumber}
          name={"phoneNumber"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.panNumberError}
          width={"w-[30%]"}
          placeholder={"Pan Number"}
          value={panNumber}
          name={"panNumber"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.serviceBusinessDetailError}
          width={"w-[30%]"}
          placeholder={"Service Business Detail"}
          value={serviceBusinessDetail}
          name={"serviceBusinessDetail"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.occupationError}
          width={"w-[30%]"}
          placeholder={"Occupation"}
          value={occupation}
          name={"occupation"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.organizationError}
          width={"w-[30%]"}
          placeholder={"Organization"}
          value={organization}
          name={"organization"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.designationError}
          width={"w-[30%]"}
          placeholder={"Designation"}
          value={designation}
          name={"designation"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.addressError}
          width={"w-[30%]"}
          placeholder={"Address"}
          value={address}
          name={"address"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.emergencyContactNameError}
          width={"w-[30%]"}
          placeholder={"Emergency Contact Name"}
          value={emergencyContactName}
          name={"emergencyContactName"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.emergencyContactNumberError}
          width={"w-[30%]"}
          placeholder={"Emergency Contact Number"}
          value={emergencyContactNumber}
          name={"emergencyContactNumber"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.emergencyContactRelationError}
          width={"w-[30%]"}
          placeholder={"Emergency Contact Relation"}
          value={emergencyContactRelation}
          name={"emergencyContactRelation"}
          onChange={upadteStateHandler}
        />
        {/* <Dropdown
          width={"w-[30%]"}
          data={allVenderList}
          placeholder={"Vendor Id"}
          // name={"categoryId"}
          onChange={(val) => dropDownChangeVender(val)}
        /> */}
        {/* <FormInput
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
        /> */}
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

        {/* <div class="w-full">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">           
                     Your Message
                    </label>
                    <textarea rows="6"
                        class="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
                </div> */}

        <div className="w-full">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 "
          >
            {/* Upload Product Image */}
          </label>
          {/* <Dropzone/> */}
        </div>

        <button
          onClick={(e) => addMemberHandler(e)}
          type="submit"
          class="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateMember;

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
    <div class={twMerge("mb-5 relative", width)}>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">
        {placeholder}
      </label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        type={type ? type : "text"}
        id="email"
        class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    <div class={twMerge(" text-gray-900 dark:text-gray-100 ", width)}>
      <div class="relative w-full group">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 "
        >
          {placeholder}
        </label>

        <button class="py-2.5 px-3 w-full md:text-sm text-site text-black bg-transparent border border-dimmed  focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded ">
          {selectedVal}
        </button>
        <div class="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg w-full  peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 p-1 bg-gray-100   border border-dimmed text-xs md:text-sm">
          {data?.map((ele, ind) => {
            return (
              <div
                onClick={() => {
                  onChange(ele);
                  setSelectedVal(ele?.categoryName || ele?.vendor);
                }}
                class=" w-full block cursor-pointer  text-black  hover:text-link px-3 py-2 rounded-md"
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
