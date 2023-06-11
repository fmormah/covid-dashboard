import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SortOptions from "./SortOptions";

// Create a mock Redux store
const mockStore = configureStore();
let store;

beforeEach(() => {
  // Initialize the mock Redux store before each test
  store = mockStore({});
});

it("renders the component correctly", () => {
  render(
    <Provider store={store}>
      <SortOptions />
    </Provider>
  );

  const optionButton = screen.queryAllByRole("button")[0];
  expect(optionButton.className).toContain("option-filter-icon");
});
