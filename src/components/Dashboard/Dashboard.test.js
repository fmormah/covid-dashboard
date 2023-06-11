import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Dashboard from "./Dashboard";
import { fetchPatients } from "../../redux/actions/patientActions";

// Mock the fetchPatients action
jest.mock("../../redux/actions/patientActions", () => ({
  fetchPatients: jest.fn().mockReturnValue({ type: "FETCH_PATIENTS" }),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Dashboard", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      patients: {
        data: [],
        pagination: 0,
        currentPage: 0,
        sortField: "",
        sortDirection: "",
      },
    });
    store.dispatch = jest.fn();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument(); // SearchBox should be visible
  });

  it("dispatches the fetchPatients action on mount", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    expect(fetchPatients).toHaveBeenCalled();
  });
});
