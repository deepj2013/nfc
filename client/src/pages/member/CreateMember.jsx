import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Dropzone from "../../components/common/Dropzone";
import NationalityDropdown from "../../components/common/Nationality";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductsServices,
  getAllProductListServices,
} from "../../redux/thunk/productServices";
import { logger, successToast } from "../../utils/Helper";
import moment from "moment";
import { getStorageValue } from "../../services/LocalStorageServices";
import {
  createMemberServices,
  updateMemberServices,
  uploadFileServices,
} from "../../redux/thunk/useMangementServices";
import { useLocation, useNavigate } from "react-router";
import CATEGORY_CHARGES from "../../constants/subscriptionCharges";

function CreateMember() {
  const location = useLocation();
  const { element } = location.state || {};
  const dispatch = useDispatch();
  let userDetails = getStorageValue("userDetails");
  const navigate = useNavigate();
  const [payableAmount, setPayableAmount] = useState(0);
  const [formData, setFormData] = useState({
    typeofmember: "",
    memberCategory: "",
    memberType: "",
    title: "",
    firstName: "",
    middleName: "",
    surname: "",
    fatherName: "",
    husbandName: "",
    spouseName: "",
    gender: "",
    dateOfBirth: "",
    maritalStatus: "",
    nationality: "",
    bloodGroup: "",
    mobileNumber: "",
    emailId: "",
    phoneNumber: "",
    membershipStatus: "Inactive",
    panNumber: "",
    weddingDate: "",
    serviceBusinessDetail: "",
    occupation: "",
    organization: "",
    designation: "",
    address: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
    modeOfTransaction: "",
    createdBy: userDetails?.role_id,
    updatedBy: userDetails?.role_id,
    errors: {},
    profilePicture: "",
  });
  const {
    typeofmember,
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
  const handleCategoryChange = (category) => {
    setFormData((prev) => ({ ...prev, memberCategory: category }));

    if (CATEGORY_CHARGES[category]) {
      const today = new Date();
      const currentMonth = today.getMonth(); // 0 = January, 11 = December
      const monthsRemaining = 12 - currentMonth + 2; // Months till next March (including current month)

      const { monthlyCharge, annualFee, discount } = CATEGORY_CHARGES[category];

      // Calculate total payable amount till next March
      const total = monthlyCharge * monthsRemaining + annualFee - discount;
      const gst = total * 0.18; // 18% GST on total payable amount

      const totalWithGst = total + gst;

      setPayableAmount(totalWithGst);
    } else {
      setPayableAmount(0); // Reset if invalid category
    }
  };

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

    // Required fields validation
    if (!typeofmember || typeofmember === "") {
      error.typeofmemberError = " * Please select a user type";
      formIsValid = false;
    }

    if (!memberType || memberType === "") {
      error.memberTypeError = " * Please select a Member type";
      formIsValid = false;
    }

    if (!memberCategory || memberCategory === "") {
      error.memberCategoryError = " * Please select a Member category";
      formIsValid = false;
    }

    if (!title || title === "") {
      error.titleError = " * Please select a proper Title";
      formIsValid = false;
    }

    if (!dateOfBirth || dateOfBirth === "") {
      error.dateOfBirthError = " * Please select a proper Date of Birth";
      formIsValid = false;
    }

    if (!maritalStatus || maritalStatus === "") {
      error.maritalStatusError = " * Please select Marital Status";
      formIsValid = false;
    }

    if (maritalStatus === "Married" && (!weddingDate || weddingDate === "")) {
      error.weddingDateError = " * Please select Wedding Date";
      formIsValid = false;
    }

    // Name fields validation
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (!firstName || !firstName.trim()) {
      error.firstNameError = " * First name can't be empty";
      formIsValid = false;
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      error.firstNameError = " * First name must contain only alphabets";
      formIsValid = false;
    }

    if (!middleName || !middleName.trim()) {
      error.middleNameError = " * Middle name can't be empty";
      formIsValid = false;
    } else if (!/^[A-Za-z]+$/.test(middleName)) {
      error.middleNameError = " * Middle name must contain only alphabets";
      formIsValid = false;
    }

    if (!surname || !surname.trim()) {
      error.surnameError = " * Surname can't be empty";
      formIsValid = false;
    } else if (!/^[A-Za-z]+$/.test(surname)) {
      error.surnameError = " * Surname must contain only alphabets";
      formIsValid = false;
    }

    if (!fatherName || !fatherName.trim()) {
      error.fatherNameError = " * Father Name can't be empty";
      formIsValid = false;
    } else if (!namePattern.test(fatherName)) {
      error.fatherNameError =
        " * Father Name must contain only alphabets with a single space between words";
      formIsValid = false;
    }

    if (husbandName && !/^[A-Za-z]+$/.test(husbandName)) {
      error.husbandNameError = " * Husband Name must contain only alphabets";
      formIsValid = false;
    }

    if (!spouseName || !spouseName.trim()) {
      error.spouseNameError = " * Spouse Name can't be empty";
      formIsValid = false;
    } else if (!namePattern.test(spouseName)) {
      error.spouseNameError =
        " * Spouse Name must contain only alphabets with a single space between words";
      formIsValid = false;
    }

    if (!gender || !gender.trim()) {
      error.genderError = " * Please select gender";
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

    // Contact Information Validation
    const mobilePattern = /^[0-9]{10}$/;
    const phonePattern = /^[0-9]{10,12}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!mobileNumber || !mobileNumber.trim()) {
      error.mobileNumberError = " * Mobile Number can't be empty";
      formIsValid = false;
    } else if (!mobilePattern.test(mobileNumber)) {
      error.mobileNumberError = " * Mobile Number must be exactly 10 digits";
      formIsValid = false;
    }

    if (!emailId || !emailId.trim()) {
      error.emailIdError = " * Email ID can't be empty";
      formIsValid = false;
    } else if (!emailPattern.test(emailId)) {
      error.emailIdError = " * Email ID is not valid";
      formIsValid = false;
    }

    if (phoneNumber && !phonePattern.test(phoneNumber)) {
      error.phoneNumberError =
        " * Phone Number must be between 10 to 12 digits";
      formIsValid = false;
    }

    // PAN Validation
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!panNumber || !panNumber.trim()) {
      error.panNumberError = " * PAN Number can't be empty";
      formIsValid = false;
    } else if (!panPattern.test(panNumber)) {
      error.panNumberError =
        " * PAN Number must be in a valid format (e.g., ABCDE1234F)";
      formIsValid = false;
    }

    // Additional fields validation
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
      error.addressError = " * Address can't be empty";
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
    } else if (!mobilePattern.test(emergencyContactNumber)) {
      error.emergencyContactNumberError =
        " * Emergency Contact Number must be 10 digits";
      formIsValid = false;
    }

    if (!emergencyContactRelation || !emergencyContactRelation.trim()) {
      error.emergencyContactRelationError =
        " * Emergency Contact Relation can't be empty";
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
        if (element) {
          let response = await dispatch(
            updateMemberServices(formData)
          ).unwrap();
          successToast("Update Sucessfully");
          navigate("/members");
        } else {
          let response = await dispatch(
            createMemberServices(formData)
          ).unwrap();
          successToast("Add Sucessfully");
          navigate("/members");
        }
      } catch (error) {
        console.log(error);
        logger(error);
      }
    }
  };

  useEffect(() => {
    if (element) {
      let paylod = { ...element, errors: {} };
      setFormData(paylod);
    }
  }, []);

  const updateMemberHandler = async (file) => {
    try {
      let response = await dispatch(uploadFileServices(file)).unwrap();
      console.log("responseresponse{}{", response);
    } catch (error) {
      console.log(error);
      logger(error);
    }
  };
  const handleFileChange = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    updateMemberHandler(e.target.files[0]);
  };

  // const { categoryList } = useSelector((state) => state.categoryState);
  // const { allVenderList } = useSelector((state) => state.inventaryState);
  // console.log("78909",allVenderList,categoryList)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-semibold h28">Member / Services</p>
        <div className="flex gap-4"></div>
      </div>

      <div className="mx-auto w-full bg-white flex justify-center items-center py-4">
        <div className="rounded-full border border-indigo-500 bg-gray-50 p-4 shadow-md h-36 flex justify-center items-center w-36">
          <label
            for="upload"
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 fill-white stroke-indigo-500"
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
            <span className="text-gray-600 font-medium">Upload file</span>
          </label>
          <input
            // value={}
            onChange={handleFileChange}
            id="upload"
            type="file"
            className="hidden"
          />
        </div>
      </div>

      <div className="flex bg-white p-4 rounded-lg  w-full border justify-between flex-wrap my-4">
        {/* User Type Select */}
        <FormSelect
          width="w-[30%]"
          placeholder="Select User Type"
          name="typeofmember"
          onChange={upadteStateHandler}
          value={typeofmember}
          options={["Member", "Corporate", "Honorary"]}
          errors={errors.typeofmemberError}
        />

        {/* Member Category Select */}
        <div className="relative w-[30%]">
          <FormSelect
            width="w-full"
            placeholder="Select Member Category"
            name="memberCategory"
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={memberCategory}
            options={Object.keys(CATEGORY_CHARGES)}
            errors={errors.memberCategoryError}
          />

          {/* Payable Amount */}
          {payableAmount && (
            <div className="mb-2 text-sm text-gray-700 left-0 top-full">
              Payable Amount till Next March:{" "}
              <strong>₹{payableAmount.toFixed(2)}</strong>
            </div>
          )}
        </div>

        {/* Member Type Select */}
        <FormSelect
          width="w-[30%]"
          placeholder="Select Member Type"
          name="memberType"
          onChange={upadteStateHandler}
          value={memberType}
          options={[
            "Absentee Member",
            "Associate Life Member",
            "Associate Member",
            "Resident Dependent Member",
            "Founder Member",
            "Resident Member",
            "Senior Citizen Associate Member",
            "Senior Citizen Resident",
            "Associate Dependent Member",
            "Temporary Member",
            "Honorary Member",
          ]}
          errors={errors.memberTypeError}
        />
      </div>

      <div className="flex bg-white p-4 rounded-lg  w-full border justify-between flex-wrap">
        <FormSelect
          width="w-[10%]"
          placeholder="Select Title"
          name="title"
          onChange={upadteStateHandler}
          value={title}
          options={["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."]}
          errors={errors.titleError}
        />

        <FormInput
          errors={errors.firstNameError}
          width={"w-[28%]"}
          placeholder={"First Name"}
          value={firstName}
          name={"firstName"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.middleName}
          width={"w-[28%]"}
          placeholder={"Middle Name"}
          value={middleName}
          name={"middleName"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.surnameError}
          width={"w-[28%]"}
          placeholder={"Surname"}
          value={surname}
          name={"surname"}
          onChange={upadteStateHandler}
        />
        <FormInput
          errors={errors.dateOfBirthError}
          width={"w-[30%]"}
          placeholder={"Date of Birth"}
          value={dateOfBirth}
          name={"dateOfBirth"}
          type="date"
          onChange={upadteStateHandler}
        />

        <FormSelect
          width="w-[30%]"
          placeholder="Select Gender"
          name="gender"
          onChange={upadteStateHandler}
          value={gender}
          options={["Male", "Female", "Other"]}
          errors={errors.genderError}
        />
        <FormSelect
          width="w-[30%]"
          placeholder="Select Marital Status"
          name="maritalStatus"
          onChange={upadteStateHandler}
          value={maritalStatus}
          options={["Single", "Married", "Divorced", "Widowed", "Separated"]}
          errors={errors.maritalStatusError}
        />
        {maritalStatus === "Married" && (
          <FormInput
            errors={errors.weddingDateError}
            width={"w-[30%]"}
            placeholder={"Wedding Date"}
            value={weddingDate}
            name={"weddingDate"}
            type="date"
            onChange={upadteStateHandler}
          />
        )}

       

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

        <FormSelect
          width="w-[30%]"
          placeholder="Select Nationality"
          name="nationality"
          onChange={upadteStateHandler}
          value={nationality}
          options={["Indian", "Other"]}
          errors={errors.nationalityError}
        />

        <FormSelect
          width="w-[30%]"
          placeholder="Select Blood Group"
          name="bloodGroup"
          onChange={upadteStateHandler}
          value={bloodGroup}
          options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
          errors={errors.bloodGroupError}
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

        <button
          onClick={(e) => addMemberHandler(e)}
          type="submit"
          className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
const FormSelect = ({
  width,
  placeholder,
  name,
  onChange,
  value,
  options,
  errors,
}) => {
  return (
    <div className={twMerge("mb-5 relative", width)}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {placeholder}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span style={{ color: "red" }}>{errors}</span>
    </div>
  );
};
