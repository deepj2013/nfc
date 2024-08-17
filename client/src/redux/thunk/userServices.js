// authServices.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios  from '../../utils/Axios';
import { handleError } from '@/services/ErrorHandlerServices';
import { BASE_URL } from '../../utils/Urls';




export const userRegestraionServices = createAsyncThunk(
    "userRegestraionServices",
    async (payload) => {
      try {
        let url = `${BASE_URL}user-details`;
        const res = await axios.get(url,payload);
        return res.data;
      } catch (error) {
        //   console.log(error);
        // handleError(error);
        throw error;
      }
    }
  );

