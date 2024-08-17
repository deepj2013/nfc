
// authServices.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/Axios';
import { BASE_URL } from '../../utils/Urls';
// import { handleError } from '@/services/ErrorHandlerServices';

export const adminLoginServices = createAsyncThunk(
    "adminLoginServices",
    async (payload) => {

        try {
            let url = `${BASE_URL}login-user`;
            const res = await axios.post(url, payload);
            return res.data;
        } catch (error) {
            //   console.log(error);
            handleError(error);
            throw error;
        }
    }
);