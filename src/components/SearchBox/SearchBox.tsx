import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPatients } from "../../redux/actions/patientActions";
import { DispatchType } from "../../types/index";
import SortOptions from "../../components/SortOptions/SortOptions";

const SearchBox: React.FC = () => {
  const dispatch = useDispatch<DispatchType>();
  const [searchTerm, setSearchTerm] = useState("");

  const logoURL =
    "https://global-uploads.webflow.com/5f6986b75721064d3306c76a/627d85f54709d64d4ee066e7_Frame%20323.svg";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check if the value is a letter using a regex
    if (/^[a-zA-Z\s]*$/.test(event.target.value)) {
      setSearchTerm(event.target.value);
      if (event.target.value.length >= 2 || event.target.value.length === 0) {
        dispatch(fetchPatients(event.target.value));
      }
    }
  };

  return (
    <header className="search-box">
      <h1>
        <img alt="logo" src={logoURL} />
        <span className="h1-text">Patient Search</span>
      </h1>
      <div className="serach-panel">
        <input
          placeholder="First / Last Name or Vaccine Type"
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={handleChange}
        />
        <SortOptions />
      </div>
    </header>
  );
};

export default SearchBox;
