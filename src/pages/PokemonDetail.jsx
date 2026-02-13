import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPokemonById } from '../services/pokemonService';
import { getTrainerById } from '../services/trainerService';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonById(id)
      .then(async (data) => {
        setPokemon(data);
        if (data.trainer) {
          try {
            const trainerData = await getTrainerById(data.trainer);
            setTrainer(trainerData);
          } catch (error) {
            console.error("Error al cargar entrenador:", error);
          }
        }
      })
      .catch(error => {
        console.error('Error al cargar pokemon:', error);
        alert('Error al cargar el pokemon');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (!pokemon) {
    return <Typography>Pokemon no encontrado</Typography>;
  }

  const pokemonImageUrl = pokemon.picture
    ? `${API_MEDIA_URL}/${pokemon.picture}`
    : null;

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ marginBottom: 2 }}
      >
        Volver
      </Button>

      <Card>
        {pokemonImageUrl && (
          <CardMedia
            component="img"
            height={400}
            image={pokemonImageUrl}
            alt={pokemon.name}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {pokemon.name}
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Tipo</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {pokemon.type}
            </Typography>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Peso</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {pokemon.weight} kg
            </Typography>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Altura</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {pokemon.height} m
            </Typography>
          </Box>
          
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6">Entrenador</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {trainer ? `${trainer.name} ${trainer.last_name ?? ''}` : 'Sin entrenador'}
            </Typography>
          </Box>

          <Box sx={{ marginTop: 3, display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/edit-pokemon/${id}`)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate('/')}
            >
              Volver
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
