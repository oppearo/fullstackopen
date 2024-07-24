import patients from "../../data/patients";
import { Patient } from "../types";

const getPatientData = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatientData };
