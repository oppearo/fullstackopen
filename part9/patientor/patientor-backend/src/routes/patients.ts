import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("GET to /api/patients");
  res.json(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  console.log(`GET to patient id ${req.params.id}`);
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.status(200).json(patient);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "An error occurred.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  console.log(`sending POST to ${req.params.id}`);
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntryToPatient(
      req.params.id,
      newEntry
    );
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "An error occurred.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
