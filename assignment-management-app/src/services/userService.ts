import axios from 'axios';
import { User } from '../types';

const API_URL = 'http://localhost:5000/api/users';

export const userService = {
    register,
    login,
    getUser,
    updateUser,
    deleteUser
};

function register(user: User) {
    return axios.post(`${API_URL}/register`, user)
        .then(response => response.data);
}

function login(email: string, password: string) {
    return axios.post(`${API_URL}/login`, { email, password })
        .then(response => response.data);
}

function getUser(userId: string) {
    return axios.get(`${API_URL}/${userId}`)
        .then(response => response.data);
}

function updateUser(userId: string, user: User) {
    return axios.put(`${API_URL}/${userId}`, user)
        .then(response => response.data);
}

function deleteUser(userId: string) {
    return axios.delete(`${API_URL}/${userId}`)
        .then(response => response.data);
}