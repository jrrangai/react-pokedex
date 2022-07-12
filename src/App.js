import { useState } from "react";

import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import PokemonDetails from "./components/Pokemon";
import Spinner from "./components/Spinner";
import { useEffect } from "react";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("machamp");

  useEffect(() => {
    console.log("Running useEffect...");
  }, []);

  const getPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
      .then((res) => res.json())
      .then((json) => setPokemon(json))
      .catch((err) => setError("Pokemon not found"))
      .finally(() => setLoading(false));
  };

  const renderUI = () => {
    if (loading) return <Spinner />;
    else if (error) return <p className="error">{error}</p>;
    else if (pokemon) return <PokemonDetails />;
    else if (!searchTerm) return <p>Search a pokemon to get started</p>;
    else return null;
  };

  return (
    <>
      <Header />
      <SearchForm />
      <PokemonDetails />
      <Spinner />
    </>
  );
}

export default App;
