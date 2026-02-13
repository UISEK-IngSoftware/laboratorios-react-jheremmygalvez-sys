import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { Container, Grid } from '@mui/material'
import Login from './pages/Login'
import PokemonList from './pages/PokemonList'
import './App.css'
import PokemonForm from './pages/PokemonForms'
import PokemonDetail from './pages/PokemonDetail'
import TrainerList from './components/TrainerList'
import TrainerForm from './pages/TrainerForm'
import TrainerDetail from './pages/TrainerDetail'

function App() {
  return (
    <>
      <Container>
        <BrowserRouter>
          <Header />
          {/* Rutas y componentes irían aquí */}
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemons/:id" element={<PokemonDetail />} />
            <Route path="/add-pokemon" element={<PokemonForm />} />
            <Route path="/edit-pokemon/:id" element={<PokemonForm />} />
            <Route path="/trainers" element={<TrainerList />} />
            <Route path="/trainers/:id" element={<TrainerDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-trainer" element={<TrainerForm />} />
            <Route path="/edit-trainer/:id" element={<TrainerForm />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}
export default App