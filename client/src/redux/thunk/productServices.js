// authServices.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios  from '../../utils/Axios';
import { BASE_URL } from '../../utils/Urls';


export const createProductServices = createAsyncThunk(
    "createProductServices",
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


  export const updateProductServices = createAsyncThunk(
    "updateProductServices",
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
  


  export const getProductListServices = createAsyncThunk(
    "getProductListServices",
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



  export const searchProductByNameServices = createAsyncThunk(
    "searchProductByNameServices",
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