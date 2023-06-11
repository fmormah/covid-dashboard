// Import necessary React and Redux hooks and components
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "../../redux/actions/patientActions";
import SearchBox from "../SearchBox/SearchBox";
import PatientList from "../PatientList/PatientList";
import Pagination from "../Pagination/Pagination";
import { RootState, DispatchType, Patient } from "../../types/index";

// Placeholder component displays a loading message and a set of placeholders for patient list
const Placeholder: React.FC = () => {
  // Local state for the loading message
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  // On component mount, start a timer that will change the loading message if data isn't loaded in 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMessage("Data could not be reached");
    }, 3000);

    // On component unmount, clear the timer
    return () => clearTimeout(timer);
  }, []);

  // Render the loading message and placeholders
  return (
    <div className="patient-list">
      <div style={{ textAlign: "center" }}>{loadingMessage}</div>
      <div className={`even-item patient-item`}>
        <div className="shine" />
        <div className="shine" />
        <div className="shine" />
        <div className="shine" />
      </div>
      <div className={`odd-item patient-item`}>
        <div className="shine" />
        <div className="shine" />
        <div className="shine" />
        <div className="shine" />
      </div>
      <div className={`even-item patient-item`}>
        <div className="shine" />
        <div className="shine" />
        <div className="shine" />
        <div className="shine" />
      </div>
      <div className={`odd-item patient-item`}>
        <div className="shine" />
        <div className="shine" />
        <div className="shine" />
        <div className="shine" />
      </div>
    </div>
  );
};

// Main Dashboard component
const Dashboard: React.FC = () => {
  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch<DispatchType>();

  // Extract relevant pieces of state from the Redux store
  const { data, pagination, currentPage, sortField, sortDirection } =
    useSelector((state: RootState) => state.patients);

  // Calculate the indices for the current page of data
  const start = (currentPage - 1) * pagination;
  const end = start + pagination;

  // Define a function to sort the patient data
  const sortPatients = (
    patients: Patient[],
    field: string,
    direction: string
  ) => {
    const sortedPatients = [...patients];

    sortedPatients.sort((a, b) => {
      if ((a as any)[field] < (b as any)[field]) {
        return direction === "asc" ? -1 : 1;
      }
      if ((a as any)[field] > (b as any)[field]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedPatients;
  };

  // Sort the data
  const sortedData = sortPatients(data ?? [], sortField, sortDirection);

  // On component mount, dispatch an action to fetch the patient data
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  // Render the dashboard
  return (
    <div>
      <SearchBox />
      {/* If the data is loaded, display the Pagination and PatientList components. 
          Otherwise, display the Placeholder component */}
      {data?.length ? (
        <>
          <Pagination />
          <PatientList patients={sortedData.slice(start, end)} />
          <Pagination />
        </>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

// Export the Dashboard component
export default Dashboard;
