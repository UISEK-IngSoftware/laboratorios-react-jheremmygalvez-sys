import { Grid } from '@mui/material'
import PokemonCard from '../components/PokemonCard'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchPokemons, deletePokemon } from '../services/pokemonService';

export default function PokemonList() {
    const [pokemons, setPokemons]= useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetchPokemons()
        .then(data => setPokemons(data))
        .catch(error => {
            console.error("Error fetching pokemons:", error)
            alert("Error fetching pokemons, intenta nuevamente más tarde.");
        });
    },[]);

    const handleDeletePokemon = async (pokemonId) => {
        try {
            await deletePokemon(pokemonId);
            setPokemons(pokemons.filter(p => p.id !== pokemonId));
        } catch (error) {
            console.error("Error deleting pokemon:", error);
            alert("No se puede eliminar sin estar autenticado.");
        }
    };

    const handleUpdatePokemon = (pokemonId) => {
        navigate(`/edit-pokemon/${pokemonId}`);
    };

    const handleDetailsPokemon = (pokemonId) => {
        navigate(`/pokemons/${pokemonId}`);
    };

    return (
        <Grid container spacing={2}>
            {pokemons.map(
                (pokemon) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pokemon.id}>
                        <PokemonCard pokemon={pokemon} onDelete={handleDeletePokemon} onUpdate={handleUpdatePokemon} onDetails={handleDetailsPokemon} />
                    </Grid>
                ))}
        </Grid>
    )
}