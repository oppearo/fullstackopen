import { Diagnosis, Gender, Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import { assertNever } from "../utils";
import EntryDetails from "./EntryDetails";
import { useState } from "react";
import AddEntryForm from "./AddEntryForm";

interface PatientPageProps {
  patient: Patient | undefined;
  diagnoses: Diagnosis[];
}

const PatientPage = ({ patient, diagnoses }: PatientPageProps) => {
  const [showAddEntry, setShowAddEntry] = useState(false);

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
      {showAddEntry ? (
        <AddEntryForm diagnoses={diagnoses} id={patient.id} />
      ) : null}
      <EntryDetails entries={patient.entries} diagnoses={diagnoses} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddEntry(!showAddEntry)}
        startIcon={<AddIcon />}
      >
        add new entry
      </Button>
    </div>
  );
};

export default PatientPage;
