import { toast } from "react-toastify";

export const logger = (log) => {
  console.log(log);
};

export let tempToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwODZjOWI0MzFmMjJkMmU4ODVhODgiLCJ0b2tlbkV4cGlyeVRpbWUiOjE3MjU1NDc2MTY4NDksImlhdCI6MTcyNTQ2MTIxNn0.l5qs8T35lwSTzyqQ5Or4x3mMtBqSkYgJv5_Q4kRNxxU`;

export const successToast = (msg) => {
  return toast.success(msg);
};

export const errorToast = (msg) => {
  return toast.error(msg);
};

export const checkArray = (arr) => {
  if (!Array.isArray(arr)) {
    return false;
  }
  if (arr.length === 0) {
    return false;
  }
  return true;
};




export const GENDER_DATA = [
  {
    label: "Male",
    value: "Male"
  },
  {
    label: "Female",
    value: "Female"
  },
  {
    label: "Other",
    value: "Other"
  }
]



export const validateFields = (formData, validationRules) => {
  let errors = {};
  let formIsValid = true;

  Object.keys(validationRules).forEach((field) => {
    const rules = validationRules[field];
    const value = formData[field] ? formData[field].trim() : '';

    if (rules.required && !value) {
      errors[`${field}`] = `* ${field.charAt(0).toUpperCase() + field.slice(1)} can't be empty`;
      formIsValid = false;
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors[`${field}`] = `* ${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rules.minLength} characters long`;
      formIsValid = false;
    }

    if (rules.email && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errors[`${field}`] = '* Invalid email format';
        formIsValid = false;
      }
    }

    // Phone number validation (10 digits)
    if (rules.phone && value) {
      const phonePattern = /^\d{10}$/; // Only allows exactly 10 digits
      if (!phonePattern.test(value)) {
        errors[`${field}`] = '* Phone number must be exactly 10 digits';
        formIsValid = false;
      }
    }

    // You can add more validation rules like regex patterns, etc.
  });

  return { formIsValid, errors };
};


