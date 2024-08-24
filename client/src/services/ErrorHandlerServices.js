// import { toast } from "react-toastify";
// import { errorTost } from "../Utils/Helper";

export const handleError = (err) => {
  try {
    if (err?.response?.data?.message) {
      // toast.error(err.response.data.message);
      console.log(err);
    } else if (err.response.data.errors) {
      console.log(err);
      err.response.data.errors.map((d, i) => {
        // toast.error(d.msg);
      })
    }
    else {
      console.log(err);
    }
  } catch (error) {
    // toast.error('Something went wrong')
    console.log(error);
    // errorTost()÷
  }

};



export const errorLog=(res)=>{
  console.log(res)
}