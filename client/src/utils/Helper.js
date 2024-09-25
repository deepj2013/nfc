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
