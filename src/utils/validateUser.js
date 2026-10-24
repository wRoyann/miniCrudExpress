export const validateUser = (user) => {
    const { name, email, password } = user;

    if (!name || !email || !password) {
        return { valid: false, message: "Name, email, and password are required" };
    }

    if (!email.includes("@")) {
        return { valid: false, message: "Invalid email format" };
    }

    if (password.length < 9) {
        return { valid: false, message: "Password must be at least 9 characters long" };
    }

    return { valid: true, message: "User data is valid" };
};
