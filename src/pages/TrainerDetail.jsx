import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTrainerById } from '../services/trainerService';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function TrainerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrainerById(id)
            .then(data => {
                setTrainer(data);
            })
            .catch(error => {
                console.error('Error al cargar trainer:', error);
                alert('Error al cargar el trainer');
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Typography>Cargando...</Typography>;
    }

    if (!trainer) {
        return <Typography>Trainer no encontrado</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={() => navigate('/trainers')}
                sx={{ marginBottom: 2 }}
            >
                Atrás
            </Button>
            
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {trainer.name}
                    </Typography>
                    
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Nombre</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {trainer.name}
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Peso</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {trainer.last_name} kg
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Edad</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {trainer.years} m
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Nivel</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {trainer.level} m
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="h6">Fecha de Nacimiento</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {trainer.datebirth} m
                        </Typography>
                    </Box>

                    <Box sx={{ marginTop: 3, display: 'flex', gap: 1 }}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => navigate(`/edit-trainer/${id}`)}
                        >
                            Editar
                        </Button>
                        <Button 
                            variant="contained" 
                            color="error"
                            onClick={() => navigate('/')}
                        >
                            Volver al Inicio
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
