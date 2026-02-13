import { TextField, Typography, Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createTrainer, updateTrainer, getTrainerById } from "../services/trainerService";

export default function TrainerForm() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const isEdit = !!id; // true si hay ID, false si es crear nuevo

  const [trainerData, setTrainerData] = useState({
    name: '',
    last_name: '',
    years: '',
    level: '',
    datebirth: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cargar datos del trainer si es edición
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      getTrainerById(id)
        .then(data => {
          setTrainerData({
            name: data.name,
            last_name: data.last_name,
            years: data.years,
            level: data.level,
            datebirth: data.datebirth,
          });
        })
        .catch(error => {
          console.error('Error al cargar trainer:', error);
          alert('Error al cargar el trainer');
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value} = e.target;
    setTrainerData({ ...trainerData, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (isEdit) {
        await updateTrainer(id, trainerData);
        alert('Trainer actualizado con éxito');
      } else {
        await createTrainer(trainerData);
        alert('Trainer creado con éxito');
      }
      navigate('/');
    }catch(error){
      alert(`Error al ${isEdit ? 'actualizar' : 'crear'} el Trainer`);
      console.error(error);
      return;
    }
  }
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Editar Trainer' : 'Crear Trainer'}
      </Typography>
      {loading ? (
        <Typography>Cargando...</Typography>
      ) : (
        <Box component="form" onSubmit ={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Nombre" name="name" variant="outlined" value={trainerData.name} onChange={handleChange}/>
          <TextField label="Apellido" name="last_name" variant="outlined" value={trainerData.last_name} onChange={handleChange}/>
          <TextField label="Edad" name="years" variant="outlined" type="number" value={trainerData.years} onChange={handleChange}/>
          <TextField label="Nivel" name="level" variant="outlined" type="number" value={trainerData.level} onChange={handleChange}/>
          <TextField label="Fecha de nacimiento" name="datebirth" variant="outlined" type="date" value={trainerData.datebirth} onChange={handleChange}/>
          <Button type="submit" variant="contained">{isEdit ? 'Actualizar' : 'Guardar'}</Button>
        </Box>
      )}
    </>
  )
}