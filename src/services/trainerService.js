const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;
const CLIENT_ID= import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET= import.meta.env.VITE_CLIENT_SECRET;
import axios from 'axios';

/**
 * Obtener Entrenadores desde la API
 * @returns Data de Entrenadores 
 */
export async function fetchTrainers () {
    const response = await axios.get(`${API_BASE_URL}/trainers`);
    return response.data;
}
export async function createTrainer(trainerData){
    const payload={
        ...trainerData,
    }
    const response =await axios.post (`${API_BASE_URL}/trainers/`, payload);
    return response.data;
}
export async function deleteTrainer(trainerId){
    const response = await axios.delete(`${API_BASE_URL}/trainers/${trainerId}/`);
    return response.data;
}
export async function getTrainerById(TrainerId){
    const response = await axios.get(`${API_BASE_URL}/trainers/${TrainerId}/`);
    return response.data;
}
export async function updateTrainer(trainerId, trainerData){
    const payload = { ...trainerData };
    const response = await axios.put(`${API_BASE_URL}/trainers/${trainerId}/`, payload);
    return response.data;
}