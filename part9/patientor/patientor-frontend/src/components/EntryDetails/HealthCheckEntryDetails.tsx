import { HealthCheckEntry, HealthCheckRating } from "../../types";

import MedicalInformationRoundedIcon from "@mui/icons-material/MedicalInformationRounded";
import { Typography } from "@mui/material";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}

const healthCheckRatingToImage = (rating: HealthCheckRating): string => {
  switch (rating) {
    case 0:
      return "💚";
    case 1:
      return "💛";
    case 2:
      return "🤎";
    case 3:
      return "🖤";
    default:
      return "❓";
  }
};

const HealthCheckEntryDetails = ({ entry }: HealthCheckEntryProps) => {
  return (
    <div>
      <MedicalInformationRoundedIcon />
      <Typography sx={{ type: "p", fontStyle: "italic" }}>
        {entry.description}
      </Typography>
      {healthCheckRatingToImage(entry.healthCheckRating)}
      <Typography>diagnosed by {entry.specialist}</Typography>
    </div>
  );
};

export default HealthCheckEntryDetails;
