export const successResponse = (message, data = {}) => {
    return {
      success: true,
      message,
      data,
    };
  };
  
  export const errorResponse = (message, statusCode = 400) => {
    return {
      success: false,
      message,
      statusCode,
    };
  };