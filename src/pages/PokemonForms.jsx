import { TextField, Typography, Box, Button, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPokemon, updatePokemon, getPokemonById } from "../services/pokemonService";
import { fetchTrainers } from "../services/trainerService"; // 👈 reutilizamos tu fetchTrainers

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function PokemonForm() {
  const { id } = useParams();
  const isEdit = !!id;

  const [pokemonData, setPokemonData] = useState({
    name: "",
    type: "",
    height: "",
    weight: "",
    picture: null,
    trainer: "", // 👈 nuevo campo para guardar el id del entrenador
  });

  const [trainers, setTrainers] = useState([]); // lista de entrenadores
  const [loading, setLoading] = useState(false);
  const [pictureChanged, setPictureChanged] = useState(false);
  const navigate = useNavigate();

  // Cargar datos si es edición
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getPokemonById(id)
        .then((data) => {
          setPokemonData({
            name: data.name,
            type: data.type,
            height: data.height,
            weight: data.weight,
            picture: data.picture || null,
            trainer: data.trainer ? data.trainer.id : "", // 👈 preselecciona el entrenador actual
          });
        })
        .catch((error) => {
          console.error("Error al cargar Pokémon:", error);
          alert("Error al cargar el Pokémon");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  // Cargar lista de entrenadores
  useEffect(() => {
    fetchTrainers()
      .then((data) => setTrainers(data))
      .catch((error) => {
        console.error("Error obteniendo entrenadores:", error);
        alert("Error obteniendo entrenadores, regresa más tarde");
      });
  }, []);

  // Manejo de cambios
  const handleChange = (e) => {
    if (e.target.name === "picture") {
      setPokemonData({
        ...pokemonData,
        picture: e.target.files[0],
      });
      setPictureChanged(true);
    } else {
      const { name, value } = e.target;
      setPokemonData({ ...pokemonData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updatePokemon(id, pokemonData, pictureChanged);
        alert("Pokémon actualizado con éxito");
      } else {
        await createPokemon(pokemonData);
        alert("Pokémon creado con éxito");
      }
      navigate("/");
    } catch (error) {
      const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
      alert(`Error al ${isEdit ? "actualizar" : "crear"} el Pokémon: ${errorMsg}`);
      console.error(error);
    }
  };

  const pokemonImageUrl =
    pokemonData.picture && typeof pokemonData.picture === "string"
      ? `${API_MEDIA_URL}${pokemonData.picture}`
      : null;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Editar Pokémon" : "Crear Pokémon"}
      </Typography>
      {loading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField 
            label="Nombre" 
            name="name" 
            variant="outlined" 
            value={pokemonData.name} 
            onChange={handleChange}
            required
            error={!pokemonData.name}
            helperText={!pokemonData.name ? "El nombre es requerido" : ""}
          />
          <TextField 
            select
            label="Tipo" 
            name="type" 
            variant="outlined" 
            value={pokemonData.type} 
            onChange={handleChange}
            required
            error={!pokemonData.type}
            helperText={!pokemonData.type ? "El tipo es requerido" : ""}
          >
            <MenuItem value="">-- Selecciona un tipo --</MenuItem>
            <MenuItem value="Acero">🛡️ Acero</MenuItem>
            <MenuItem value="Agua">💧 Agua</MenuItem>
            <MenuItem value="Eléctrico">⚡ Eléctrico</MenuItem>
            <MenuItem value="Fantasma">👻 Fantasma</MenuItem>
            <MenuItem value="Fuego">🔥 Fuego</MenuItem>
          </TextField>
          <TextField 
            label="Altura" 
            name="height" 
            variant="outlined" 
            type="number" 
            value={pokemonData.height} 
            onChange={handleChange}
            required
          />
          <TextField 
            label="Peso" 
            name="weight" 
            variant="outlined" 
            type="number" 
            value={pokemonData.weight} 
            onChange={handleChange}
            required
          />

          {/* Selector de entrenador */}
          <TextField
            select
            label="Entrenador"
            name="trainer"
            value={pokemonData.trainer}
            onChange={handleChange}
          >
            <MenuItem value="">Sin entrenador</MenuItem>
            {trainers.map((trainer) => (
              <MenuItem key={trainer.id} value={trainer.id}>
                {trainer.name} {trainer.last_name}
              </MenuItem>
            ))}
          </TextField>

          {/* Subir una nueva imagen */}
          <Button variant="outlined" component="label">
            Subir Imagen
            <input type="file" name="picture" hidden onChange={handleChange} />
          </Button>

          {/* Mostramos la imagen si es que ya había una */}
          {pokemonImageUrl && (
            <img src={pokemonImageUrl} alt="Pokemon" style={{ width: "150px", marginTop: "10px" }} />
          )}

          <Button type="submit" variant="contained">
            {isEdit ? "Actualizar" : "Guardar"}
          </Button>
        </Box>
      )}
    </>
  );
}