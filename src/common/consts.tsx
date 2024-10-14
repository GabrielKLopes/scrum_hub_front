
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export interface PasswordValidations {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
  }
  
  export const validatePassword = (password: string): PasswordValidations => {
    return {
      length: password.length >= 8 && password.length <= 16,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    };
  };