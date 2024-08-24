export const setStorageValue = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  };
  
  export const getStorageValue = (key) => {
    try {
      let data = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  };
  export const removeStorageValue = (key) => {
    try {
      let data = localStorage.removeItem(key);
      return data;
    } catch (error) {
      return null;
    }
  };