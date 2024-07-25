import { CoursePart } from "../CourseParts";

interface PartProps {
  part: CoursePart;
}

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
            <br />
          </b>
          <i>{props.part.description}</i>
          <p />
        </div>
      );
    case "background":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
            <br />
          </b>
          <i>{props.part.description}</i>
          <br />
          background material found at {props.part.backgroundMaterial}
          <p />
        </div>
      );
    case "group":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
            <br />
          </b>
          project exercises {props.part.groupProjectCount}
          <p />
        </div>
      );
    case "special":
      return (
        <div>
          <b>
            {props.part.name} {props.part.exerciseCount}
            <br />
          </b>
          <i>{props.part.description}</i> <br />
          required skills: {props.part.requirements.join(", ")}
        </div>
      );
    default:
      return null;
  }
};

export default Part;
