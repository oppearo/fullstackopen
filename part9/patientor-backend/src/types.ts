export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface FullPatientInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type Patient = Omit<FullPatientInfo, "ssn">;
