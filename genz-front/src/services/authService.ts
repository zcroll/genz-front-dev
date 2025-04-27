import axios from 'axios';
import { get, post } from './api';

// Register
export async function register(name: string, email: string, password: string, password_confirmation: string) {
    try {
        await axios.get('/sanctum/csrf-cookie');
        return await post('/register', {
            name,
            email,
            password,
            password_confirmation
        });
    } catch (error: any) {
        throw error.response?.data;
    }
}

// Login
export async function login(email: string, password: string) {
    try {
        await axios.get('/sanctum/csrf-cookie');
        return await post('/login', {
            email,
            password
        });
    } catch (error: any) {
        throw error.response?.data;
    }
}

// Logout
export async function logout() {
    try {
        return await post('/logout');
    } catch (error: any) {
        throw error.response?.data;
    }
}

// Get authenticated user
export async function getUser() {
    try {
        return await get('/user');
    } catch (error: any) {
        throw error.response?.data;
    }
}
