import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import WeatherRequest from "../components/WeatherRequest/WeatherRequest";
import Cities from "../components/Cities/Cities";

const Weather = () => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  const handleCityQuery = (name) => {
    setCity(name);
  };

  const handleCityList = (data) => {
    setCities((prevState) => [...prevState, data]);
  };

  return (
    <>
      <div>
        <h2>Application météo de démonstation de React</h2>

        {/* futur searchbar */}
        <SearchBar
          label="Recherche"
          placeholder="Nom d'une ville"
          onSearch={handleCityQuery}
        />

        <h2>Résultat de la recherche météo</h2>
        {city ? (
          <WeatherRequest city={city} onRequest={handleCityList} />
        ) : (
          <p>Vous n'avez pas encore effectué de recherche...</p>
        )}

        {/* Liste des vill:e */}
        {cities.length > 2 && <Cities list={cities} />}
      </div>
    </>
  );
};

export default Weather;
