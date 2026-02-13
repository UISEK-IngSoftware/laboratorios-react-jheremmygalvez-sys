const API_BASE_URL= import.meta.env.VITE_API_AUTH_URL;
const CLIENT_ID= import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET= import.meta.env.VITE_CLIENT_SECRET;
import axios from 'axios';

export async function login(username, password) {
    const params=new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);

    const response=await axios.post(`${API_BASE_URL}/token/`, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data;
}
export async function logout(){
    const token=localStorage.getItem("access_token");
    if (!token) return;
    const params=new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('token', token);

    await axios.post(`${API_BASE_URL}/revoke_token/`, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    localStorage.removeItem("access_token");
}