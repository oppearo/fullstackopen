export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface FullPatientInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Patient = Omit<FullPatientInfo, "ssn">;
export type NewPatient = Omit<FullPatientInfo, "id">;
