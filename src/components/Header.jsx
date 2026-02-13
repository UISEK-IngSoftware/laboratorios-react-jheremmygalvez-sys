import { AppBar, Container, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/userService";
import pokedexLogo from "../assets/react.svg";
import "./Header.css";

export default function Header() {
    const isLoggedIn = localStorage.getItem("access_token") !== null;

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }
    return (
        <>
            <header>
                <div className="pokedex-navbar">
                    <AppBar position="static">
                        <Toolbar>
                            <div className="image-container">
                                <img src={pokedexLogo} alt="Pokedex Logo" height={100} />
                            </div>
                        </Toolbar>
                        <Toolbar>
                            <Button color="inherit" href="/">Inicio</Button>
                            <Button color="inherit" href="/trainers">Entrenadores</Button>
                            {isLoggedIn && (
                                <>
                                    <Button color="inherit" href="/add-pokemon">Crear Pokémon</Button>
                                    <Button color="inherit" href="/add-trainer">Crear Entrenador</Button>
                                    <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                                </>
                            )}
                            {!isLoggedIn && (
                                <Button color="inherit" href="/login">Iniciar Sesión</Button>
                            )}
                        </Toolbar>
                    </AppBar>
                </div>
            </header>
        </>
    );
}