import { Grid } from '@mui/material'
import TrainerCard from './TainerCard'
import "./TrainerList.css";
import { useEffect, useState } from 'react';
import { fetchTrainers, deleteTrainer} from '../services/trainerService';
import { useNavigate } from 'react-router-dom';

export default function TrainerList() {
    const [trainers, setTrainers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchTrainers()
            .then((data) => setTrainers(data))
            .catch((error) => {
                console.error('Error obteniendo entrenadores:', error);
                alert("Error obteniendo entrenadores, regresa más tarde")
            });
    }, []);
    const handleDeleteTrainer = async (trainerId) => {
        try {
            await deleteTrainer(trainerId);
            setTrainers(trainers.filter(p => p.id !== trainerId));
        } catch (error) {
            console.error("Error deleting trainer:", error);
            alert("No se puede eliminar sin estar autenticado.");
        }
    };

    const handleUpdateTrainer = (trainerId) => {
        navigate(`/edit-trainer/${trainerId}`);
    };

    const handleDetailsTrainer = (trainerId) => {
        navigate(`/trainers/${trainerId}`);
    };

    return (
        <Grid container spacing={2}>
            {trainers.map(
                (trainer) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={trainer.id}>
                        <TrainerCard trainer={trainer} onDelete={handleDeleteTrainer} onUpdate={handleUpdateTrainer} onDetails={handleDetailsTrainer} />
                    </Grid>
                ))}
        </Grid>
    )
}