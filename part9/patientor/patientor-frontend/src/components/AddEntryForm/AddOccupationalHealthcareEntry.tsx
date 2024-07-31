import { Box, Input, InputLabel } from "@mui/material";
import { useState } from "react";

interface AddOccupationalHealthcareEntryProps {
  setEmployer: React.Dispatch<React.SetStateAction<string>>;
  setGivenSickLeave: React.Dispatch<React.SetStateAction<boolean>>;
  setSickLeaveStart: React.Dispatch<React.SetStateAction<string>>;
  setSickLeaveEnd: React.Dispatch<React.SetStateAction<string>>;
}

const AddOccupationalHealthcareEntry = (
  props: AddOccupationalHealthcareEntryProps
) => {
  const [hasSickLeave, setHasSickLeave] = useState(false);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasSickLeave(e.target.checked);
    props.setGivenSickLeave(!hasSickLeave);
  };

  const displaySickLeaveDates = (): JSX.Element => {
    if (hasSickLeave) {
      return (
        <div>
          <InputLabel id="sick-leave-start">start date</InputLabel>
          <Input
            type="date"
            id="sick-leave-start"
            onChange={(e) => props.setSickLeaveStart(e.target.value)}
            sx={{ mb: 1 }}
          />
          <InputLabel id="sick-leave-end">end date</InputLabel>
          <Input
            type="date"
            id="sick-leave-end"
            onChange={(e) => props.setSickLeaveEnd(e.target.value)}
          />
        </div>
      );
    }
    return <p></p>;
  };

  return (
    <Box
      sx={{
        mt: 1,
        border: 1,
        borderRadius: 1,
        padding: "6px",
        borderColor: "lightgrey",
      }}
    >
      <InputLabel id="employer-name" sx={{ mt: 1 }}>
        Employer
      </InputLabel>
      <Input
        required
        id="discharge-criteria"
        onChange={(e) => props.setEmployer(e.target.value)}
      />
      <InputLabel sx={{ mt: 1, mb: 1 }}>Sick leave given?</InputLabel>
      <input type="checkbox" checked={hasSickLeave} onChange={handleClick} />
      {displaySickLeaveDates()}
    </Box>
  );
};

export default AddOccupationalHealthcareEntry;
