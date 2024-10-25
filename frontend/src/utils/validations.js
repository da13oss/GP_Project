// Validation utility functions for form fields

// Username validation: minimum 3 characters
export const validateUsername = (username) => {
    if (!username || username.length < 3) {
        return 'Username must be at least 3 characters long';
    }
    return '';
};

// Email validation using regex
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
};

// Password validation: at least one uppercase, one lowercase, and one number
export const validatePassword = (password) => {
    if (!password) return 'Password is required';

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    return '';
};