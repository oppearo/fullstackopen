import {
  NewPatient,
  Gender,
  Entry,
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "./types";

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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || typeof rating !== "number") {
    throw new Error("incorrect health check rating type: " + rating);
  }

  if (rating < 0 || rating > 3) {
    throw new Error("health check rating value incorrect: " + rating);
  }

  return rating;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("incorrect or missing data");
  }

  if (
    !(
      "description" in object &&
      "date" in object &&
      "specialist" in object &&
      "type" in object
    )
  ) {
    throw new Error("required data field in entry missing");
  }

  switch (object.type) {
    case "Hospital":
      return validateHospitalEntry(object as HospitalEntry);
    case "OccupationalHealthcare":
      return validateOccupationalHealthcareEntry(
        object as OccupationalHealthcareEntry
      );
    case "HealthCheck":
      return validateHealthCheckEntry(object as HealthCheckEntry);
    default:
      assertNever(object as never);
  }

  throw new Error("something went wrong with entry validation...");
};

const validateHospitalEntry = (entry: HospitalEntry): EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    date: parseString(entry.date),
    description: parseString(entry.description),
    specialist: parseString(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry),
    type: "Hospital",
    discharge:
      "discharge" in entry
        ? {
            date: parseString(entry.discharge?.date),
            criteria: parseString(entry.discharge?.criteria),
          }
        : undefined,
  };

  return newEntry;
};

const validateOccupationalHealthcareEntry = (
  entry: OccupationalHealthcareEntry
): EntryWithoutId => {
  if (!("employerName" in entry)) {
    throw new Error(
      "employer name missing from occupational health care entry"
    );
  }

  const newEntry: EntryWithoutId = {
    date: parseString(entry.date),
    description: parseString(entry.description),
    specialist: parseString(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry),
    type: "OccupationalHealthcare",
    employerName: parseString(entry.employerName),
    sickLeave:
      "sickLeave" in entry
        ? {
            startDate: parseString(entry.sickLeave?.startDate),
            endDate: parseString(entry.sickLeave?.endDate),
          }
        : undefined,
  };

  return newEntry;
};

const validateHealthCheckEntry = (entry: HealthCheckEntry): EntryWithoutId => {
  if (!("healthCheckRating" in entry)) {
    throw new Error("health check rating missing from health check entry");
  }

  const newEntry: EntryWithoutId = {
    date: parseString(entry.date),
    description: parseString(entry.description),
    specialist: parseString(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry),
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
  };

  return newEntry;
};

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
