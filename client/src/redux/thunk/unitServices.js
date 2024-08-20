// authServices.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios  from '../../utils/Axios';
import { BASE_URL } from '../../utils/Urls';


export const createUnitServices = createAsyncThunk(
    "createUnitServices",
    async (payload) => {
      try {
        let url = `${BASE_URL}inv/createcategory`;
        const res = await axios.post(url,payload);
        return res.data;
      } catch (error) {
        //   console.log(error);
        // handleError(error);
        throw error;
      }
    }
  );


  export const updateUnitServices = createAsyncThunk(
    "updateUnitServices",
    async (payload) => {
      try {
        let url = `${BASE_URL}inv/updatecategory`;
        const res = await axios.post(url,payload);
        return res.data;
      } catch (error) {
        //   console.log(error);
        // handleError(error);
        throw error;
      }
    }
  );
  


  export const getUnitservices = createAsyncThunk(
    "getUnitservices",
    async (payload) => {
      try {
        let url = `${BASE_URL}inv/getcategory`;
        const res = await axios.post(url,payload);
        return res.data;
      } catch (error) {
        //   console.log(error);
        // handleError(error);
        throw error;
      }
    }
  );