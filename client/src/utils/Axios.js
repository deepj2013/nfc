import axios from "axios";
import { getStorageValue } from "../services/LocalStorageServices";
import { tempToken } from "./Helper";
import { handleError } from "./ErrorHandler";

axios.interceptors.request.use(
  async (config) => {
    console.log("hello");

    const userDetails = await getStorageValue("userDetails");
    // console.log("token1234567890", userDetails, "token");
    // config.headers["Authorization"] = `Bearer ${userDetails?.token}`;

    config.headers["x-auth-token"] = `${userDetails?.token}`;

    return config;
  },
  (error) => {
    console.log("hello1");

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log("hello2");

    return response;
  },
  async function (error) {
    console.log("hello3");

    if (
      error?.response?.data?.message == "invalid signature" ||
      error?.response?.data?.message == "jwt malformed"
    ) {
      //   await deleteAllKeysFromAsyncStorage();
      // store.dispatch({
      //   type: "CHANGE_STACK",
      //   payload: "AUTH",
      // });
    }
    handleError(error);
    return Promise.reject(error);
  }
);

export default axios;
