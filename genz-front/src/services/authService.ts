import axios from 'axios';

// Register
export async function register(name: string, email: string, password: string, password_confirmation: string) {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/api/register', {
            name,
            email,
            password,
            password_confirmation
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
}

// Login
export async function login(email: string, password: string) {
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post('/api/login', {
            email,
            password
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
}

// Logout
export async function logout() {
    try {
        const response = await axios.post('/api/logout');
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
}

// Get authenticated user
export async function getUser() {
    try {
        const response = await axios.get('/api/user');
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
}