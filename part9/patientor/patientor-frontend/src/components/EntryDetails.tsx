import {
  Diagnosis,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
} from "../types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, Typography } from "@mui/material";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import MedicalInformationRoundedIcon from "@mui/icons-material/MedicalInformationRounded";
import { assertNever } from "../utils";

interface EntryDetailsProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
}

interface HospitalEntryProps {
  entry: HospitalEntry;
}

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}

const EntryDetails = (props: EntryDetailsProps) => {
  const diagnosisCodeToText = (diagnosisCode: string): string => {
    const foundDiagnosis = props.diagnoses.find(
      (d) => d.code === diagnosisCode
    );
    if (!foundDiagnosis) return "unknown code";
    return foundDiagnosis.name;
  };

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

  const OccupationalHealthcareEntry = ({
    entry,
  }: OccupationalHealthcareEntryProps) => {
    return (
      <div>
        <WorkRoundedIcon /> <i>{entry.employerName}</i>
        <Typography sx={{ type: "p", fontStyle: "italic" }}>
          {entry.description}
        </Typography>
        <Typography>diagnosed by {entry.specialist}</Typography>
      </div>
    );
  };

  const HospitalEntry = ({ entry }: HospitalEntryProps) => {
    return (
      <div>
        <LocalHospitalRoundedIcon />
        <Typography sx={{ type: "p", fontStyle: "italic" }}>
          {entry.description}
        </Typography>
        <Typography>diagnosed by {entry.specialist}</Typography>
      </div>
    );
  };

  const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
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

  const entryDetailedInformation = (entry: Entry): JSX.Element => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <Typography variant="h5">entries</Typography>
      <List>
        {props.entries.map((entry) => {
          return (
            <Box
              key={entry.id}
              mb={2}
              sx={{
                border: 1,
                borderRadius: 1,
                padding: "8px",
              }}
            >
              <ListItem key={entry.id}>
                <ListItemText>
                  {entry.date} {entryDetailedInformation(entry)}
                </ListItemText>
              </ListItem>
            </Box>
          );
        })}
        {props.entries.map((entry) => {
          return entry.diagnosisCodes?.map((diagnosis) => {
            return (
              <Box
                mb={1}
                sx={{
                  border: 1,
                  borderRadius: 1,
                  padding: "8px",
                }}
                key={diagnosis}
              >
                <ListItem key={diagnosis}>
                  <Typography>
                    {diagnosis}: {diagnosisCodeToText(diagnosis)}
                  </Typography>
                </ListItem>
              </Box>
            );
          });
        })}
      </List>
    </div>
  );
};

export default EntryDetails;
