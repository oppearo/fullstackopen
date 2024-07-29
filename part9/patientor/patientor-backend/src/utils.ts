import { NewPatient, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (string: unknown): string => {
  if (!isString(string)) throw new Error("incorrect string: " + string);
  return string;
};

const isGender = (text: string): text is Gender => {
  return Object.values(Gender)
    .map((val) => val.toString())
    .includes(text);
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("incorrect gender: " + gender);
  }
  return gender;
};

const isDate = (dob: string): boolean => {
  return Boolean(Date.parse(dob));
};

const parseDateOfBirth = (dob: unknown): string => {
  if (!isString(dob) || !isDate(dob)) {
    throw new Error("incorrect DOB: " + dob);
  }
  return dob;
};

export const parseEntriesType = (entries: Array<Entry>): Array<Entry> => {
  const entryTypes = entries.map((entry) => entry.type);
  for (const type of entryTypes) {
    if (type !== ("Hospital" || "OccupationalHealthcare" || "HealthCheck")) {
      throw new Error("incorrect type of entry: " + type);
    }
  }
  return entries;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: parseEntriesType(object.entries as Entry[]),
    };
    return newPatient;
  }

  throw new Error("data field missing");
};
