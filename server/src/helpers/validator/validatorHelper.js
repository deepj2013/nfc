const ValidatorHelper = {
    /**
     * Validate a 10-digit mobile number
     * @param {string} mobileNumber - The mobile number to validate
     * @returns {boolean} - Returns true if valid, otherwise false
     */
    validateMobile: (mobileNumber) => {
      // Check if mobile number contains exactly 10 digits and no other characters
      const mobileRegex = /^[0-9]{10}$/;
      return mobileRegex.test(mobileNumber);
    },
  
    /**
     * Custom email validation function
     * @param {string} email - The email address to validate
     * @returns {boolean} - Returns true if valid, otherwise false
     */
    validateEmail: (email) => {
      // Simple regex for email validation (Basic structure: name@domain.extension)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  
    /**
     * Validate input text to ensure no special symbols, except spaces
     * @param {string} inputText - The text to validate
     * @returns {boolean} - Returns true if valid, otherwise false
     */
    validateText: (inputText) => {
      // Allow only alphabets and spaces
      const textRegex = /^[a-zA-Z\s]*$/;
      return textRegex.test(inputText);
    }
  };
  
  export default ValidatorHelper;
  