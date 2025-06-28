
import { errorToast } from "../utils/Helper.js";

export const handleError = (err) => {
  try {
    if (err?.response?.data?.message) {
      // toast.error(err.response.data.message);
      console.log(err);
    } else if (err.response.data.errors) {
      console.log(err);
      err.response.data.errors.map((d, i) => {
        errorToast(d.msg);
      })
    }
    else {
      errorToast(err);
    }
  } catch (error) {
    // toast.error('Something went wrong')
    errorToast(error);
    // errorTost()÷
  }

};



export const errorLog=(res)=>{
  console.log(res)
}