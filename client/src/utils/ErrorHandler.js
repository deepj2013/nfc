// import { toast } from "react-toastify";

export const handleError = (err) => {
  if (err?.response?.data?.message) {
    // toast.error(err.response.data.message);
    console.log(err);
  } else if (err?.response?.data?.errors) {
    console.log(err);
    err?.response?.data?.errors.map((d, i) => {
      // toast.error(d.msg);
    });
  } else {
    // console.log(err);
  }
};
