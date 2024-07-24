const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  interface HeaderProps {
    name: string;
  }

  interface ContentProps {
    courses: {
      name: string;
      exerciseCount: number;
    }[];
  }

  interface TotalProps {
    count: number;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  };

  const Content = (props: ContentProps) => {
    return props.courses.map((item) => (
      <p key={item.name}>
        {item.name} {item.exerciseCount}
      </p>
    ));
  };

  const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.count}</p>;
  };

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total count={totalExercises} />
    </div>
  );
};

export default App;
