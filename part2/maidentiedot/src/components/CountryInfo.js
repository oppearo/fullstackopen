import React from "react";
import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <img
        src={country.flag}
        alt="The flag of the country"
        width="300"
        height="200"
      ></img>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Spoken languages</h3>
      {country.languages.map((language) => (
        <ul key={language.name}>
          <li key={language.name}>{language.name}</li>
        </ul>
      ))}
      <WeatherInfo capital={country.capital} />
    </div>
  );
};

export default CountryInfo;
