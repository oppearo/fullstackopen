import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const countryHook = () => {
    console.log("get countries");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        console.log("country promise fulfilled");
        setCountries(response.data);
      });
  };

  useEffect(countryHook, []);

  const handleSearch = (event) => {
    console.log("Searching for: ", event.target.value);
    setSearch(event.target.value);
  };

  const handleShow = (event) => {
    console.log("Show clicked, search term is now: ", event);
    setSearch(event);
  };

  return (
    <div>
      <h1>Let's look at different countries</h1>
      <Filter search={search} handleSearch={handleSearch} />
      <Countries
        countries={countries}
        search={search}
        handleShow={handleShow}
      />
    </div>
  );
};

export default App;
