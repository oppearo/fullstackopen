import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("GET to /api/patients");
  res.json(patientService.getPatientData());
});

export default router;
