const Persons = (props) => {
  const filteredPersons = props.persons.filter((person) =>
  person.name.toLowerCase().includes(props.search.toLowerCase()));

  return (
      <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button id={person.id} name={person.name} onClick={() => props.deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
