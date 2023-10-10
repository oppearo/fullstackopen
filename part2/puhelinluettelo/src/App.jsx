import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/PersonsService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [messageIsError, setMessageIsError] = useState(true);

  const addPerson = (event) => {
    event.preventDefault();
    const listOfNames = persons.map((person) => person.name);
    if (listOfNames.includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you want to replace the old number with a new one?`
        )
      ) {
        return updatePerson(newName);
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedObject) => {
      setPersons(persons.concat(returnedObject));
      setMessageIsError(false);
      setMessage(`Added ${newName}`);
      setTimeout(() => {
        setMessage(null);
      }, 8000);
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    if (window.confirm("Delete " + event.target.name + " ?")) {
      personService.remove(id).then((returnedPerson) => {
        persons.map((person) => (person.id !== id ? person : returnedPerson));
      });
      setMessageIsError(false);
      setMessage(`Deleted ${event.target.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 8000);
      setPersons(persons.filter((p) => p.id !== id));
    }
  };

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const updatePerson = (personName) => {
    console.log("updating person " + personName);
    const updatedPerson = persons.find((person) => person.name === personName);
    const personObject = { ...updatedPerson, number: newNumber };
    personService
      .update(updatedPerson.id, personObject)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== updatedPerson.id ? person : returnedPerson
          )
        );
        setMessageIsError(false);
        setMessage(`Updated ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 8000);
      })
      .catch((error) => {
        setMessageIsError(true);
        setMessage(`${updatedPerson.name} was already removed from the server`);
        setTimeout(() => {
          setMessage(null);
        }, 8000);
      });
  };

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
      <Notification message={message} isError={messageIsError} />
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
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
