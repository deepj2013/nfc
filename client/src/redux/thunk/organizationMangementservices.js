import { createAsyncThunk } from '@reduxjs/toolkit';
import axios  from '../../utils/Axios';
import { BASE_URL, BASE_URL_SUPER_ADMIN } from '../../utils/Urls';
import { handleError } from '../../utils/ErrorHandler';


export const organisationListservices = createAsyncThunk(
    "organisationListservices",
    async (payload) => {
      try {
        let url = `${BASE_URL_SUPER_ADMIN}organisations`;
        const res = await axios.get(url,payload);
        return res.data;
      } catch (error) {
          console.log(error);
        handleError(error);
        throw error;
      }
    }
  );



  export const updateorganisationservices = createAsyncThunk(
    "updateorganisationservices",
    async (payload, organisationId) => {
      try {
        let url = `${BASE_URL_SUPER_ADMIN}organisations/${organisationId}`;
        const res = await axios.post(url,payload);
        return res.data;
      } catch (error) {
        //   console.log(error);
        handleError(error);
        throw error;
      }
    }
  );

  

  