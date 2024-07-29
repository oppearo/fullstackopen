import { Gender, Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

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
      <h3>
        {patient.name} {genderToIcon(patient.gender)}
      </h3>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation} <br />
    </div>
  );
};

export default PatientPage;
