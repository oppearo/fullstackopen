import {
  Alert,
  Box,
  Button,
  Chip,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import AddHospitalEntry from "./AddHospitalEntry";
import AddOccupationalHealthcareEntry from "./AddOccupationalHealthcareEntry";
import AddHealthCheckEntry from "./AddHealthCheckEntry";
import {
  BaseEntry,
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
} from "../../types";
import { parseDate, parseString } from "../../utils";
import patientService from "../../services/patients";
import { AxiosError } from "axios";

interface AddEntryFormProps {
  diagnoses: Diagnosis[];
  id: string;
}

const AddEntryForm = (props: AddEntryFormProps): JSX.Element => {
  const ENTRY_TYPES = ["Hospital", "OccupationalHealthcare", "HealthCheck"];
  const [entryType, setEntryType] = useState(ENTRY_TYPES[0]);
  const [specialistName, setSpecialistName] = useState("");
  const [description, setDescription] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [discharged, setDischarged] = useState(false);
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState("");
  const [givenSickLeave, setGivenSickLeave] = useState(false);
  const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTypeChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setEntryType(event.target.value);
  };

  const handleDiagnosisCodeChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const validateBasicInfo = (): BaseEntry | undefined => {
    try {
      const commonInfo: BaseEntry = {
        id: "",
        date: parseDate(entryDate),
        description: parseString(description),
        specialist: parseString(specialistName),
        diagnosisCodes: diagnosisCodes,
      };
      return commonInfo;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setTimeout(() => setErrorMessage(""), 8000);
      }
    }
  };

  const fillEntryWithInformation = (): EntryWithoutId | undefined => {
    const commonInfo: BaseEntry | undefined = validateBasicInfo();
    if (!commonInfo) return undefined;
    // really hate this approach
    switch (entryType) {
      case "Hospital":
        const hospitalEntry: EntryWithoutId = {
          ...commonInfo,
          type: "Hospital",
          discharge: discharged
            ? {
                date: parseDate(dischargeDate),
                criteria: parseString(dischargeCriteria),
              }
            : undefined,
        };
        console.log(hospitalEntry);
        return hospitalEntry;
      case "HealthCheck":
        const healthCheckEntry: EntryWithoutId = {
          ...commonInfo,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating,
        };
        console.log(healthCheckEntry);

        return healthCheckEntry;
      case "OccupationalHealthcare":
        const occupationalEntry: EntryWithoutId = {
          ...commonInfo,
          type: "OccupationalHealthcare",
          employerName: parseString(employerName),
          sickLeave: givenSickLeave
            ? {
                startDate: parseDate(sickLeaveStart),
                endDate: parseDate(sickLeaveEnd),
              }
            : undefined,
        };
        console.log(occupationalEntry);
        return occupationalEntry;
      default:
        throw new Error(
          "something went wrong filling the information, please check."
        );
    }
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const returnedEntry: EntryWithoutId | undefined =
        fillEntryWithInformation();
      if (returnedEntry !== undefined) {
        console.log(returnedEntry);
        await patientService.addEntry(props.id, returnedEntry);
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof (Error || AxiosError)) {
        setErrorMessage(error.message);
        setTimeout(() => setErrorMessage(""), 8000);
      }
    }
  };

  const showErrorMessage = () => {
    if (errorMessage) return <Alert severity="error">{errorMessage}</Alert>;
  };

  const displayEntryTypeSpecificForm = (entry: string): JSX.Element => {
    switch (entry) {
      case "Hospital":
        return (
          <AddHospitalEntry
            setCriteria={setDischargeCriteria}
            setDate={setDischargeDate}
            setDischarged={setDischarged}
          />
        );
      case "OccupationalHealthcare":
        return (
          <AddOccupationalHealthcareEntry
            setEmployer={setEmployerName}
            setGivenSickLeave={setGivenSickLeave}
            setSickLeaveStart={setSickLeaveStart}
            setSickLeaveEnd={setSickLeaveEnd}
          />
        );
      case "HealthCheck":
        return (
          <AddHealthCheckEntry setHealthCheckRating={setHealthCheckRating} />
        );
      // fall through
      default:
        return <p>unknown type: {entry}</p>;
    }
  };

  return (
    <Box
      component={"form"}
      sx={{
        mb: 1,
        border: 1,
        borderRadius: 1,
        borderStyle: "dashed",
        padding: "12px",
      }}
    >
      {showErrorMessage()}
      <Typography sx={{ mb: 1, fontWeight: "bold" }}>Add new entry</Typography>
      <InputLabel id="entry-type" sx={{ mt: 1 }}>
        Entry type
      </InputLabel>
      <Select
        required
        labelId="entry-type"
        onChange={handleTypeChange}
        defaultValue={ENTRY_TYPES[0]}
      >
        {ENTRY_TYPES.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
      <InputLabel id="entry-date-selector" sx={{ mt: 1 }}>
        Date
      </InputLabel>
      <Input
        required={true}
        type="date"
        id="entry-date-selector"
        value={entryDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEntryDate(e.target.value);
        }}
      />
      <InputLabel id="description-box" sx={{ mt: 1 }}>
        Description
      </InputLabel>
      <Input
        required
        id="description-box"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(e.target.value);
        }}
      />
      <InputLabel id="specialist-name" sx={{ mt: 1 }}>
        Specialist
      </InputLabel>
      <Input
        required
        id="specialist-name"
        value={specialistName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSpecialistName(e.target.value);
        }}
      />
      <InputLabel id="diagnosis-codes" sx={{ mt: 1 }}>
        Diagnosis codes
      </InputLabel>
      <Select
        id="diagnosis-code-selector"
        labelId="diagnosis-codes"
        multiple
        value={diagnosisCodes}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        onChange={handleDiagnosisCodeChange}
        renderValue={(selected) => (
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
            key={selected}
          >
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {props.diagnoses.map((diagnosis) => (
          <MenuItem key={diagnosis.code} value={diagnosis.code}>
            {diagnosis.code}
          </MenuItem>
        ))}
      </Select>
      {displayEntryTypeSpecificForm(entryType)}
      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmit}>
        submit
      </Button>
      <Button
        variant="outlined"
        color="error"
        sx={{ mt: 1, ml: 1 }}
        onClick={() => window.location.reload()}
      >
        cancel
      </Button>
    </Box>
  );
};

export default AddEntryForm;
