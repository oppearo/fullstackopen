import { Diagnosis, Gender, Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Box, Typography } from "@mui/material";
import { assertNever } from "../utils";
import EntryDetails from "./EntryDetails";

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
        return assertNever(gender);
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
      <EntryDetails entries={patient.entries} diagnoses={diagnoses} />
    </div>
  );
};

export default PatientPage;
