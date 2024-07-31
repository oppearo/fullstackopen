import { Box, Input, InputLabel } from "@mui/material";
import { useState } from "react";

interface AddHospitalEntryProps {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
  setDischarged: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddHospitalEntry = (props: AddHospitalEntryProps) => {
  const [isDischarged, setIsDischarged] = useState(false);

  const handleSetValues = (id: string, data: string) => {
    if (id === "discharge-date") {
      props.setDate(data);
    } else if (id === "discharge-criteria") {
      props.setCriteria(data);
    }
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDischarged(e.target.checked);
    props.setDischarged(!isDischarged);
  };

  const displayDischargeDates = (): JSX.Element => {
    if (isDischarged) {
      return (
        <div>
          <InputLabel id="discharge-date">Date</InputLabel>
          <Input
            type="date"
            id="discharge-date"
            sx={{ mb: 1 }}
            onChange={(e) =>
              handleSetValues(e.currentTarget.id, e.target.value)
            }
          />
          <InputLabel id="discharge-criteria">Criteria</InputLabel>
          <Input
            id="discharge-criteria"
            sx={{ mb: 1 }}
            onChange={(e) =>
              handleSetValues(e.currentTarget.id, e.target.value)
            }
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
      <InputLabel id="discharge-dates" sx={{ mt: 1 }}>
        Discharged?
      </InputLabel>{" "}
      <input type="checkbox" checked={isDischarged} onChange={handleClick} />
      {displayDischargeDates()}
    </Box>
  );
};

export default AddHospitalEntry;
