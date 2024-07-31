import { OccupationalHealthcareEntry } from "../../types";

import { Typography } from "@mui/material";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetails = ({
  entry,
}: OccupationalHealthcareEntryProps) => {
  return (
    <div>
      <WorkRoundedIcon /> <i>{entry.employerName}</i>
      <Typography sx={{ type: "p", fontStyle: "italic" }}>
        {entry.description}
      </Typography>
      <Typography>diagnosed by {entry.specialist}</Typography>
      {entry.sickLeave ? (
        <Typography>
          Sick leave from {entry.sickLeave.startDate} until{" "}
          {entry.sickLeave.endDate}
        </Typography>
      ) : null}
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
