import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>
        {country.name.common}
        {country.flag} {/* flag as an emoji */}
      </h2>{" "}
      <p>official name: {country.name.official}</p>
      <p>capital: {country.capital}</p>
      <p>area: {country.area} square kilometers</p>
      <p>population: {country.population}</p>
      <h3>Spoken languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, idx) => (
          <li key={idx}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        width="300"
        height="200"
      ></img>
      <WeatherInfo capital={country.capital} />
    </div>
  );
};

export default CountryInfo;
