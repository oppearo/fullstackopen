import { Diagnosis, Entry } from "../../types";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box, Typography } from "@mui/material";
import { assertNever } from "../../utils";

interface EntryDetailsProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const EntryDetails = (props: EntryDetailsProps) => {
  const diagnosisCodeToText = (diagnosisCode: string): string => {
    const foundDiagnosis = props.diagnoses.find(
      (d) => d.code === diagnosisCode
    );
    if (!foundDiagnosis) return "unknown code";
    return foundDiagnosis.name;
  };

  const entryDetailedInformation = (entry: Entry): JSX.Element => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetails entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryDetails entry={entry} />;
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
