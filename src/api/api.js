import { json } from "react-router-dom";

const API_URL = 'https://trip-tracker-backend.onrender.com/#';
// const API_URL = 'http://localhost:1337';

export async function listLogEntries() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/logs/map`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export async function createLogEntry(entry) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/logs/map`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}

export async function registerUser(userData) {
    const response = await fetch(`${API_URL}/api/logs/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (data.user) {
        localStorage.setItem('token', data.token);
        return {user: data.user}
    } else {
        return {error: "Email already registered!"};
    }
}

export async function loginUser(loginData) {
    const response = await fetch(`${API_URL}/api/logs/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });
    const data = await response.json();
    if (response.ok && data.message === "Success") {
        localStorage.setItem('token', data.token);
        return {user: data.user};
    } else {
        return {error: data.message};
    }
}

export async function deleteTrip(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/logs/delete/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params:{
            id: id
        }
    });
    return response;
}

export async function updateTrip(id, entry) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/logs/update-trip/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: {
            id: id
        },
        body: JSON.stringify(entry)
    })
    return response.json();  
}

export async function listRecentTrips() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/logs/profile`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export async function listFavoriteTrips() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/logs/profile/favorites`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export async function getUserInfo() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/logs/profile/user-information`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}
