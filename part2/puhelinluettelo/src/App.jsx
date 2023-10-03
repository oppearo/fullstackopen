import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/PersonsService";

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

    personService
    .create(personObject)
    .then(returnedObject => {
      setPersons(persons.concat(returnedObject));
      setNewName("");
      setNewNumber("");
    })
  };

  const deletePerson = (id) => {
    if (window.confirm('Delete ' + event.target.name + ' ?')) {
      personService
        .remove(id)
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
      })
      setPersons(persons.filter(p => p.id !== id));
    }
  };

  useEffect(() => {
    console.log("effect");
    personService.getAll().then(initialPersons => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
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
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />

      <h3>Add a new</h3>
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
      <Persons
        persons={persons}
        search={search}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
