import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import "./TainerCard.css";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL

export default function TrainerCard({ trainer, onDelete, onUpdate, onDetails }) {
    return (
        <Card>
            <CardContent>
                <Typography className="titulo" variant="h5" component="div">
                    {trainer.name}
                </Typography>
            </CardContent>
            <CardActions className="modelo-b">
                <Button size="small" onClick={() => onDetails(trainer.id)}>Detalles</Button>
                <Button size="small" color="error" onClick={() => onDelete(trainer.id)}>Eliminar</Button>
                <Button size="small" color="primary" onClick={() => onUpdate(trainer.id)}>Actualizar</Button>
            </CardActions>
        </Card>
    );
}