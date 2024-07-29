import patientData from "../../data/patients";
import { NewPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient) {
    return patient;
  } else {
    return;
  }
};

const addPatient = (entry: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient, findById };
