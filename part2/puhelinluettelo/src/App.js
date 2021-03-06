import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const listOfNames = persons.map((person) => person.name);
    if (listOfNames.includes(newName)) {
      return window.alert(`${newName} is already added to phonebook`);
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleNewName = (event) => {
    console.log("New name: ", event.target.value);
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    console.log("Number: ", event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    console.log("Searching for: ", event.target.value);
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;
