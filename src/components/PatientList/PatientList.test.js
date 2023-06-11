import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PatientList from "./PatientList";

// Mocking patient data
const patients = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    vaccineType: "Pfizer",
    nhsNumber: "1234567890",
    vaccineDate: new Date(),
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    vaccineType: "AstraZeneca",
    nhsNumber: "0987654321",
    vaccineDate: new Date(),
  },
  // More patients...
];

describe("PatientList", () => {
  it("renders without crashing", () => {
    render(<PatientList patients={patients} />);
  });

  it("renders the correct number of patient items", () => {
    render(<PatientList patients={patients} />);

    const patientItems = screen.getAllByRole("heading");
    expect(patientItems).toHaveLength(patients.length);
  });

  it("toggles the vaccine type highlighting when a vaccine type button is clicked", () => {
    render(<PatientList patients={patients} />);

    // const pfizerButton = screen.getByText("Pfizer");
    const pfizerButton = screen.queryAllByText("Pfizer")[0];
    fireEvent.click(pfizerButton);
    expect(pfizerButton.className).toContain("is-active");

    fireEvent.click(pfizerButton);
    expect(pfizerButton.className).not.toContain("is-active");
  });
});
