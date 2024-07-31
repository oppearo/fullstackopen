import { InputLabel, MenuItem, Select } from "@mui/material";
import { HealthCheckRating } from "../../types";

interface AddHealthCheckEntryProps {
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

const AddHealthCheckEntry = (props: AddHealthCheckEntryProps) => {
  return (
    <div>
      <InputLabel id="health-check-rating">Health check rating</InputLabel>
      <Select
        id="health-check-rating"
        required
        defaultValue={0}
        onChange={(e) => {
          props.setHealthCheckRating(e.target.value as number);
        }}
      >
        {Object.keys(HealthCheckRating)
          .map((v) => Number(v))
          .filter((v) => !isNaN(v))
          .map((val) => (
            <MenuItem value={val} key={val}>
              {val}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};

export default AddHealthCheckEntry;
