import React from "react";
import CountryInfo from "./CountryInfo";

const Countries = ({ countries, search, handleShow }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <div>Too many matches, please filter more specifically</div>;
  }

  if (filteredCountries.length > 1 && filteredCountries.length < 11) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <p key={country.name}>
            {country.name}{" "}
            <button onClick={() => handleShow(country.name)}>show</button>
          </p>
        ))}
      </div>
    );
  }

  //this method above is quite unsophisticated, since it changes the searched text visibly, a better way is surely available

  if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]} />;
  }

  if (filteredCountries.length === 0) {
    return <div>No countries found with this search!</div>;
  }
};

export default Countries;
