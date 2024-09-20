// authServices.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/Axios";
import { BASE_URL, BASE_URL_SUPER_ADMIN } from "../../utils/Urls";
import { handleError } from "../../utils/ErrorHandler";
import { getStorageValue } from "../../services/LocalStorageServices";



export const getAllMenuServices = createAsyncThunk(
    "getAllMenuServices",
    async () => {
        try {
            let url = `${BASE_URL_SUPER_ADMIN}getallmenu`;
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            handleError(error)
            throw error;
        }
    }
);



export const getMenuByRoleServices = createAsyncThunk(
    "getMenuByRoleServices",
    async (payload) => {
        try {
            let userDetails = getStorageValue('userDetails')
            console.log(userDetails.role_id,'userDetails');
            let url = `${userDetails?.role_id == 1 ? BASE_URL_SUPER_ADMIN : BASE_URL}getmenubyrole`;
            const res = await axios.post(url, payload);
            return res.data;
        } catch (error) {
            handleError(error)
            throw error;
        }
    }
);