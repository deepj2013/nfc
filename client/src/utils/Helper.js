import { toast } from "react-toastify";

export const logger = (log) => {
  console.log(log);
};

export let tempToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmMwODZjOWI0MzFmMjJkMmU4ODVhODgiLCJ0b2tlbkV4cGlyeVRpbWUiOjE3MjUzMzk5MDU5ODgsImlhdCI6MTcyNTI1MzUwNX0.bF2iViOsKuzSJAkYxzG4vTH-81DRJ3CgGvYYXBSS5Sc`;

export const successToast = (msg) => {
  return toast.success(msg);
};

export const errorToast = (msg) => {
  return toast.error(msg);
};
