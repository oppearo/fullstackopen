import patientData from "../../data/patients";
import { NewPatient, FullPatientInfo, Gender } from "../types";
import { v1 as uuid } from "uuid";

const patients: FullPatientInfo[] = patientData.map((p) => {
  const obj = {
    ...p,
    gender: p.gender as Gender,
    entries: [],
  };
  return obj;
});

const getPatients = (): FullPatientInfo[] => {
  return patients;
};

const findById = (id: string): FullPatientInfo | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient) {
    return patient;
  } else {
    return;
  }
};

const addPatient = (entry: NewPatient): FullPatientInfo => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient, findById };
