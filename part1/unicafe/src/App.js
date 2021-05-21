import React, { useState } from "react";

const Header = (props) => <h1>{props.text}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
);

const Statistics = (props) => {
  const good = props.values[0];
  const neutral = props.values[1];
  const bad = props.values[2];

  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <StatisticLine text="good " value={good} />
      <StatisticLine text="neutral " value={neutral} />
      <StatisticLine text="bad " value={bad} />
      <StatisticLine text="all " value={good + neutral + bad} />
      <StatisticLine
        text="average "
        value={(good + neutral * 0 + bad * -1) / (good + neutral + bad)}
      />
      <StatisticLine
        text="positive "
        value={(good / (good + neutral + bad)) * 100 + " %"}
      />
    </table>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics values={[good, neutral, bad]} />
    </div>
  );
};

export default App;
