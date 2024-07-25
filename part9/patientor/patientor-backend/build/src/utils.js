"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = exports.parseGender = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseString = (string) => {
    if (!isString(string))
        throw new Error("incorrect string: " + string);
    return string;
};
const isGender = (text) => {
    return Object.values(types_1.Gender)
        .map((val) => val.toString())
        .includes(text);
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("incorrect gender: " + gender);
    }
    return gender;
};
exports.parseGender = parseGender;
const isDate = (dob) => {
    return Boolean(Date.parse(dob));
};
const parseDateOfBirth = (dob) => {
    if (!isString(dob) || !isDate(dob)) {
        throw new Error("incorrect DOB: " + dob);
    }
    return dob;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
        const newPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: (0, exports.parseGender)(object.gender),
            occupation: parseString(object.occupation),
        };
        return newPatient;
    }
    throw new Error("data field missing");
};
exports.toNewPatient = toNewPatient;
