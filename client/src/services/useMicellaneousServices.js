// src/services/apiServices.js

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllMenuServices } from '../redux/thunk/micellaneousServices';



// Custom hook to handle API calls
export const useMicellaneousServices = () => {
    const dispatch = useDispatch();

    // Set App Logo
    const dashBoardMenuHandler = async (payload) => {
        try {
            let response = await dispatch(getAllMenuServices(payload)).unwrap()
        } catch (error) {

        }
    }

    return {dashBoardMenuHandler };
};
