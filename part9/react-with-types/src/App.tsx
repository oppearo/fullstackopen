import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { courseName, courseParts, totalExercises } from "./CourseParts";

const App = () => {
  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total count={totalExercises} />
    </div>
  );
};

export default App;
