import React from "react";

const Persons = ({ persons, search }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
