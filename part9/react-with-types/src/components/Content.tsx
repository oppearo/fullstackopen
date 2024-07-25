import Part from "./Part";
import { CoursePart } from "../CourseParts";

interface ContentProps {
  courses: CoursePart[];
}

const Content = (props: ContentProps) => {
  return props.courses.map((item) => <Part key={item.name} part={item} />);
};

export default Content;
