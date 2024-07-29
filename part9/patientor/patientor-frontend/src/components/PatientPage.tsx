import { Gender, Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

interface PatientPageProps {
  patient: Patient | undefined;
}

const PatientPage = ({ patient }: PatientPageProps) => {
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
            return <ListItem key={diagnosis}>{diagnosis}</ListItem>;
          });
        })}
      </List>
    </div>
  );
};

export default PatientPage;
