import axios from "axios";
import { getStorageValue } from "../services/LocalStorageServices";
import { tempToken } from "./Helper";

axios.interceptors.request.use(
  async (config) => {
    const userDetails = await getStorageValue("userDetails");
    console.log("token1234567890", userDetails, "token");
    // config.headers["Authorization"] = `Bearer ${userDetails?.token}`;

    config.headers["x-auth-token"] = `${userDetails?.token}`;

    return config;
  },
  (error) => {
    console.log("hello2");

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
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
    // handleError(error)
    return Promise.reject(error);
  }
);

export default axios;
