import { HospitalEntry } from "../../types";

import { Typography } from "@mui/material";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";

interface HospitalEntryProps {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: HospitalEntryProps) => {
  return (
    <div>
      <LocalHospitalRoundedIcon />
      <Typography sx={{ type: "p", fontStyle: "italic" }}>
        {entry.description}
      </Typography>
      <Typography>diagnosed by {entry.specialist}</Typography>
      {entry.discharge ? (
        <Typography>
          discharged {entry.discharge.date}: {entry.discharge.criteria}
        </Typography>
      ) : null}
    </div>
  );
};

export default HospitalEntryDetails;
