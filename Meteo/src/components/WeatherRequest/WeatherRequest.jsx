import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const WeatherRequest = ({ city, onRequest = () => {} }) => {
  const [isFetching, setIsFetching] = useState({
    loading: false,
    error: null,
    data: {
      city: "",
      temp: null,
      weather: {
        description: "",
        icon: "",
      },
    },
  });

  useEffect(() => {
    setIsFetching({
      loading: true,
      error: null,
      data: {
        city: "",
        temp: null,
        weather: {
          description: "",
          icon: "",
        },
      },
    });

    const URL = `https://api.openweathermap.org/data/2.5/weather/?q=__query__&appid=${
      import.meta.env.VITE_API_KEY
    }&units=metric&lang=fr`;

    axios
      .get(URL.replace("__query__", city))
      .then((result) => {
        setIsFetching({
          loading: false,
          error: null,
          data: {
            city: result.data.name,
            temp: result.data.main.temp,
            weather: {
              description: result.data.weather[0].description,
              icon: result.data.weather[0].icon,
            },
          },
        });
      })
      .catch((error) => {
        setIsFetching({
          loading: false,
          error: error.message,
          data: null,
        });
      });
  }, [city]);

  useEffect(() => {
    if (isFetching.data.temp !== null) {
      onRequest(isFetching.data);
    }
  }, [isFetching.data]);

  return (
    <>
      <section>
        {isFetching.loading ? (
          <p>Données en cours de chargement...</p>
        ) : isFetching.error ? (
          <p>Oups ! Une erreur est survenue... : {isFetching.error}</p>
        ) : !isFetching.data.temp ? (
          <p>Oups ! Pas de données météo pour la ville recherchée...</p>
        ) : (
          <div>
            <p>
              La température de {isFetching.data.city} est de{" "}
              {isFetching.data.temp.toLocaleString("fr-FR", {
                style: "unit",
                unit: "celsius",
              })}
            </p>

            <p>
              La météo est actuellement : {isFetching.data.weather.description}
            </p>
            <img
              src={`https:/openweathermap.org/img/w/${isFetching.data.weather.icon}.png`}
              alt={isFetching.data.weather.description}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default WeatherRequest;
