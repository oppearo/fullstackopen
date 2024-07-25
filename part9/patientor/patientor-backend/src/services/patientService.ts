import patients from "../../data/patients";
import { Patient, NewPatient, FullPatientInfo } from "../types";
import { v1 as uuid } from "uuid";
import { toNewPatient } from "../utils";

const getPatientData = (): Patient[] => {
  return patients.map((obj) => {
    const object = toNewPatient(obj) as unknown as Patient;
    object.id = uuid();
    return object;
  });
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

export default { getPatientData, addPatient };
