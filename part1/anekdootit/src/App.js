import React, { useState } from "react";

const Header = (props) => <h1>{props.text}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const Anecdote = (props) => (
  <div>
    <p>{props.anecdote}</p>
    <p>has {props.votes} votes</p>
  </div>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const vote = () => {
    let copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const indexOfMaxValue = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={vote} text="vote" />
      <Button
        handleClick={() =>
          setSelected(getRandomIntInclusive(0, anecdotes.length - 1))
        }
        text="next anecdote"
      />
      <Header text="Anecdote with the most votes" />
      <Anecdote
        anecdote={anecdotes[indexOfMaxValue]}
        votes={votes[indexOfMaxValue]}
      />
    </div>
  );
};

export default App;
