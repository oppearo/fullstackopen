"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const getPatientData = () => {
    return patients_1.default.map((obj) => {
        const object = (0, utils_1.toNewPatient)(obj);
        object.id = (0, uuid_1.v1)();
        return object;
    });
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id: id }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = { getPatientData, addPatient };
