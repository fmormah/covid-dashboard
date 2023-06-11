import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setSortField,
  setSortDirection,
  setPagination,
} from "../../redux/actions/patientActions";
import { DispatchType } from "../../types/index";

// Interface for options
interface Option {
  label: string;
  onClick: () => void;
}

// Props interface for OptionsToggler component
interface OptionsProps {
  options: Option[];
  className?: string;
}

// OptionsToggler component to handle the display and functionality of selectable options
const OptionsToggler: React.FC<OptionsProps> = ({ options, className }) => {
  // State variables for current active state and current option
  const [isActive, setIsActive] = useState(false);
  const [currentOption, setCurrentOption] = useState(options[0].label);

  // Helper function to convert camelCase to Capitalized Words
  const camelCaseToCapitalized = (camelCase: string): string => {
    // Replace capital letters with a space and that letter, then trim any leading spaces
    let result = camelCase.replace(/([A-Z])/g, " $1").trim();

    // Capitalize every word's first letter and convert the rest to lower case
    result = result.replace(/\b(\w)/g, (s) => s.toUpperCase());

    return result;
  };

  // Component return
  return (
    <div
      className={`option-toggle`}
      onMouseLeave={() => {
        setIsActive(false);
      }}
    >
      <button
        className={`${className} toggle-cta`}
        onClick={() => {
          setIsActive(!isActive);
        }}
      />
      {isActive && (
        <ul>
          {options.map((option) => (
            <li key={option.label}>
              <button
                data-testid={`${option.label}-filter-btn`}
                className={currentOption === option.label ? "is-active" : ""}
                onClick={() => {
                  option.onClick();
                  setCurrentOption(option.label);
                }}
              >
                {camelCaseToCapitalized(option.label)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// SortOptions component to manage sort options of the patient list
const SortOptions: React.FC = () => {
  const dispatch = useDispatch<DispatchType>(); // Hook to dispatch actions
  const [ascDirection, setAscDirection] = useState(true); // State for sort direction

  // Function to create pagination options
  const createPaginationOptions = (
    numbers: number[]
  ): { label: string; onClick: () => void }[] => {
    return numbers.map((number) => ({
      label: number.toString(),
      onClick: () => dispatch(setPagination(number)),
    }));
  };

  // Function to create sort options
  const createSortOptions = (
    fields: string[]
  ): { label: string; onClick: () => void }[] => {
    return fields.map((field) => ({
      label: field,
      onClick: () => dispatch(setSortField(field)),
    }));
  };

  // UseEffect to handle sort direction changes and dispatch corresponding action
  useEffect(() => {
    if (ascDirection) {
      if (setSortDirection) dispatch(setSortDirection("asc"));
    } else {
      if (setSortDirection) dispatch(setSortDirection("desc"));
    }
  }, [ascDirection, dispatch]);

  // Component return
  return (
    <div className="sort-option">
      <OptionsToggler
        className={"option-filter-icon"}
        options={createSortOptions(["firstName", "lastName", "vaccineDate"])}
      />
      <button
        className={`option-direction-icon toggle-cta ${
          !ascDirection ? "btn-flipped" : ""
        }`}
        onClick={() => {
          setAscDirection(!ascDirection);
        }}
      />
      <OptionsToggler
        className={"option-pagination-icon"}
        options={createPaginationOptions([5, 10, 15, 20, 25])}
      />
    </div>
  );
};

export default SortOptions;
