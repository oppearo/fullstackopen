import { Diagnosis, Gender, Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface PatientPageProps {
  patient: Patient | undefined;
  diagnoses: Diagnosis[];
}

const PatientPage = ({ patient, diagnoses }: PatientPageProps) => {
  console.log(patient);

  if (!patient) {
    return null;
  }

  const genderToIcon = (gender: Gender): JSX.Element => {
    switch (gender) {
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Other:
        return <TransgenderIcon />;
      default:
        return <p />;
    }
  };

  const diagnosisCodeToText = (diagnosisCode: string): string => {
    const foundDiagnosis = diagnoses.find((d) => d.code === diagnosisCode);
    if (!foundDiagnosis) return "unknown code";
    return foundDiagnosis.name;
  };

  return (
    <div>
      <Typography variant="h4">
        <Box sx={{ fontWeight: "bold", m: 1 }}>
          {patient.name} {genderToIcon(patient.gender)}
        </Box>
      </Typography>
      <Typography>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation} <br />
      </Typography>
      <Typography variant="h5">entries</Typography>
      <List>
        {patient.entries.map((entry) => {
          return (
            <ListItem disablePadding key={entry.id}>
              <ListItemText>{entry.date}</ListItemText>
              <ListItemText sx={{ fontStyle: "italic" }}>
                {entry.description}
              </ListItemText>
            </ListItem>
          );
        })}
        {patient.entries.map((entry) => {
          return entry.diagnosisCodes?.map((diagnosis) => {
            return (
              <ListItem key={diagnosis}>
                <Typography>
                  {diagnosis} {diagnosisCodeToText(diagnosis)}
                </Typography>
              </ListItem>
            );
          });
        })}
      </List>
    </div>
  );
};

export default PatientPage;
