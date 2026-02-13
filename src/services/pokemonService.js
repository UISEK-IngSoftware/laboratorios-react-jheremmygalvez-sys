const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Convertir un archivo a Base64
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function createPokemon(pokemonData) {
  const formData = new FormData();
  formData.append('name', pokemonData.name);
  formData.append('type', pokemonData.type);
  formData.append('height', Number(pokemonData.height));
  formData.append('weight', Number(pokemonData.weight));
  if (pokemonData.trainer) {
    formData.append('trainer', pokemonData.trainer);
  }
  if (pokemonData.picture instanceof File) {
    formData.append('picture', pokemonData.picture);
  }
  
  try {
    const response = await axios.post(`${API_BASE_URL}/pokemons/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear Pokémon:", error.response?.data || error.message);
    throw error;
  }
}

export async function fetchPokemons() {
  const response = await axios.get(`${API_BASE_URL}/pokemons/`);
  return response.data;
}

export async function deletePokemon(pokemonId) {
  const response = await axios.delete(`${API_BASE_URL}/pokemons/${pokemonId}/`);
  return response.data;
}

export async function getPokemonById(pokemonId) {
  const response = await axios.get(`${API_BASE_URL}/pokemons/${pokemonId}/`);
  return response.data;
}

export async function updatePokemon(pokemonId, pokemonData, pictureChanged = false) {
  const formData = new FormData();
  formData.append('name', pokemonData.name);
  formData.append('type', pokemonData.type);
  formData.append('height', Number(pokemonData.height));
  formData.append('weight', Number(pokemonData.weight));
  if (pokemonData.trainer) {
    formData.append('trainer', pokemonData.trainer);
  }
  
  if (pictureChanged && pokemonData.picture instanceof File) {
    formData.append('picture', pokemonData.picture);
  }

  const response = await axios.patch(`${API_BASE_URL}/pokemons/${pokemonId}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}