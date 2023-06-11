import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import Pagination from "./Pagination";

// Mocking redux store
const mockStore = configureStore([]);
const store = mockStore({
  patients: {
    pagination: 10,
    currentPage: 1,
    data: Array(50).fill({}), // 50 patients
  },
});

describe("Pagination", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );
  });

  it("renders the correct number of page buttons", () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(7); // 5 page buttons, 1 previous button, 1 next button
  });

  it("changes the current page when a page button is clicked", () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]); // Click on the second page button

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "SET_CURRENT_PAGE", payload: 2 }); // Check if the correct action was dispatched
  });

  it('current page button has the "is-active" class', () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[1].className).toContain("is-active"); // Check if the first page button has the "is-active" class
  });
});
