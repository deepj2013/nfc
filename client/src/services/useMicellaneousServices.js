// src/services/apiServices.js

import { useDispatch } from 'react-redux';
import { getAllMenuServices, getMenuByRoleServices } from '../redux/thunk/micellaneousServices';
import { BASE } from '../utils/Urls';
import axios from 'axios';


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


    // Set App Logo
    const getmenubyroleHandler = async (payload) => {
        try {
            let response = await dispatch(getMenuByRoleServices(payload)).unwrap()
            return response
        } catch (error) {
          
        }
    }

    

    return { dashBoardMenuHandler,getmenubyroleHandler};
};


export const updateKitchenOrderItemStatus = async (itemId,orderId, payload) => {
  return await axios.patch(`${BASE}kitchen/update-itemstatus/${orderId}/${itemId}`, payload);
};
// Get all functions
export const getAllFunctions = async () => {
  const res = await axios.get(`${BASE}admin/getFunctions`);
  return res.data.result; // ✅ extract `result` array from `res.data`
};
  
  // Create new function
  export const createFunction = async (payload, token) => {
    console.log(token)
    try {
      const res = await fetch(`${BASE}admin/createfunction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(payload),
      });
  
      const contentType = res.headers.get('Content-Type') || '';
  
      if (!contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error('Expected JSON but got: ' + text.slice(0, 100));
      }
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create function');
      }
  
      return data.result;
    } catch (err) {
      console.error('createFunction error:', err.message);
      throw err;
    }
  };
  
  // Upload multiple images (max 20 at once)
  // export const bulkUploadImages = async (files, functionName) => {
  //   const formData = new FormData();
  //   files.forEach(file => formData.append('files', file));
  
  //   const res = await fetch(`/api/utility/upload/files?type=function&functionName=${encodeURIComponent(functionName)}`, {
  //     method: 'POST',
  //     body: formData
  //   });
  
  //   const data = await res.json();
  //   if (!res.ok) throw new Error(data.message || 'Failed to upload images');
  //   return data;
  // };
  
  export const bulkUploadImages = async (files, functionName) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
  
    try {
      const res = await axios.post(
        `${BASE}utility/upload/files?type=${encodeURIComponent(functionName)}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      console.log(res.data, 'uploaded image result');
      return res.data; // ✅ contains { uploaded: [], failed: [], message: ... }
  
    } catch (err) {
      console.error('❌ Bulk Upload Error:', err);
      throw new Error(err.response?.data?.message || 'Bulk upload failed');
    }
  };

 export const updateFunction = async (functionId, payload, token) => {
  try {
    const res = await fetch(`${BASE}admin/updatefunction/${functionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get('Content-Type') || '';

    if (!contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error('Expected JSON but got: ' + text.slice(0, 100));
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to update function');
    }

    return data.result;
  } catch (err) {
    console.error('❌ Update error:', err.message);
    throw err;
  }
};
