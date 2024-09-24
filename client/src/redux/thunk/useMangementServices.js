import { createAsyncThunk } from '@reduxjs/toolkit';
import axios  from '../../utils/Axios';
import { BASE_URL, BASE_URL_SUPER_ADMIN } from '../../utils/Urls';
import { handleError } from '../../utils/ErrorHandler';


export const employeeListServices = createAsyncThunk(
    "employeeListServices",
    async (payload) => {
      try {
        let url = `${BASE_URL_SUPER_ADMIN}getusers`;
        console.log(url, "url are ");
        const res = await axios.get(url,payload);
        return res.data;
      } catch (error) {
        //   console.log(error);
        handleError(error);
        throw error;
      }
    }
  );


  export const roleListServices = createAsyncThunk(
    "roleListServices",
    async (payload) => {
      try {
        let url = `${BASE_URL_SUPER_ADMIN}getrole`;
        const res = await axios.get(url,payload);
        return res.data;
      } catch (error) {
        //   console.log(error);
        handleError(error);
        throw error;
      }
    }
  );


  export const createusersServices = createAsyncThunk(
    "createusersServices",
    async (payload) => {
      try {
        let url = `${BASE_URL_SUPER_ADMIN}createusers`;
        const res = await axios.post(url,payload);
        return res.data;
      } catch (error) {
        //   console.log(error);
        handleError(error);
        throw error;
      }
    }
  );

  

  