// import { toast } from "react-toastify";

import { errorToast } from "./Helper";

export const handleError = (err) => {
  console.log('eeee',err.response?.data?.error);
  if (err.response?.data?.error) {
    errorToast(err.response?.data?.error)
    // toast.error(err.response.data.message);
    console.log(err);
  } else if (err?.response?.data?.errors) {
    console.log(err);
    err?.response?.data?.errors.map((d, i) => {
      console.log(d);
      errorToast(d.msg);
    });
  } else {
    errorToast('Something went wrong')
    // console.log(err);
  }
};
