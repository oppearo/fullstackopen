import express from "express";
import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("GET to /api/diagnoses");
  res.json(diagnosisService.getDiagnoses());
});

export default router;
