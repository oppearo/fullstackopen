import patientData from "../../data/patients";
import { Entry, EntryWithoutId, NewPatient, Patient } from "../types";
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

const addEntryToPatient = (patientId: string, entry: EntryWithoutId): Entry => {
  const patient = findById(patientId);
  if (patient) {
    const id: string = uuid();
    const newEntry = {
      id: id,
      ...entry,
    };
    patient.entries.push(newEntry);
    return newEntry;
  }
  throw new Error(
    "no patient found with ID " + patientId + " to add entry to!"
  );
};

export default { getPatients, addPatient, findById, addEntryToPatient };
