import React, { useState } from "react";
import { Patient } from "../../types/index";

const PatientList: React.FC<{ patients: Patient[] }> = ({ patients }) => {
  const [vaccineType, setVaccineType] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleHighlight = (value: string) => {
    if (value === vaccineType) {
      setVaccineType("");
    } else {
      setVaccineType(value);
    }
  };

  const handleHighlightClass = (patient: Patient) => {
    if (patient.vaccineType === vaccineType) {
      return "highlighted";
    }
    if (vaccineType !== "" && patient.vaccineType !== vaccineType) {
      return "faded";
    }
    return "";
  };

  return (
    <div className="patient-list">
      <div className="vaccine-highlight-panel">
        Highlight:
        <button
          onClick={() => {
            handleHighlight("Pfizer");
          }}
          className={vaccineType === "Pfizer" ? "is-active" : ""}
        >
          Pfizer
        </button>
        <button
          onClick={() => {
            handleHighlight("AstraZeneca");
          }}
          className={vaccineType === "AstraZeneca" ? "is-active" : ""}
        >
          AstraZeneca
        </button>
      </div>

      {patients.map(
        (patient, index) =>
          patient.id && (
            <div
              onClick={() => {
                setSelectedPatient(patient);
              }}
              className={`${handleHighlightClass(patient)} ${
                index % 2 === 0 ? "even-item" : "odd-item"
              } patient-item`}
              key={patient.id}
            >
              <h3>{`${patient.firstName} ${patient.lastName}`}</h3>
              <p>
                Vaccination:
                <span
                  className={`${patient?.vaccineType?.toLocaleLowerCase()}-text`}
                >{`${patient.vaccineType}`}</span>
              </p>

              <p>{`NHS Number: ${patient.nhsNumber}`}</p>
              <p>{`${new Date(patient.vaccineDate).toLocaleDateString()}`}</p>

              <button
                onClick={() => {
                  setSelectedPatient(patient);
                }}
                className="item-cta"
              >
                <span>{">"}</span>
              </button>
            </div>
          )
      )}

      {selectedPatient && (
        <div className="patient-lightbox">
          <div className="selected-patient">
            <button
              onClick={() => {
                setSelectedPatient(null);
              }}
              className="close-btn"
            >
              x
            </button>
            <h3>
              Name:{" "}
              {`${selectedPatient?.firstName} ${selectedPatient?.lastName}`}
            </h3>
            <p>API ID: {selectedPatient?.id}</p>
            <p>Vaccine type: {selectedPatient?.vaccineType}</p>
            <p>Vaccine date: {selectedPatient?.vaccineDate}</p>
            <p>NHS Number: {selectedPatient?.nhsNumber}</p>
            <br />
            **Implement contact info links or even
            <br />
            patient portait and any other information**
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;
