import { Patient } from "../types/index";

// Define an asynchronous function that fetches Patient data from an API
export const fetchFromAPI = async (
  searchTerm: string
): Promise<Patient[] | null> => {

  // URL of the API endpoint
  const apiURL = "https://61ba219448df2f0017e5a929.mockapi.io/api/patients";

  // Determine the fetch query based on the presence of a search term
  // If there is no search term, fetch all patients. If a search term is provided, fetch patients that match the search term.
  const fetchQuery =
    searchTerm === "" ? apiURL : `${apiURL}?search=${searchTerm}`;

  // Create a new Promise that rejects with an error message if the request takes longer than 3 seconds
  const timeout = new Promise<null>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, 3000);
  });

  // Send the fetch request to the API
  const request = fetch(fetchQuery).then((response) => {

    // If the response is not ok (e.g., the request failed or the server responded with an error), return null
    if (!response.ok) {
      return null;
    }

    // If the response is ok, parse the JSON data in the response body and return it as an array of Patients
    return response.json() as Promise<Patient[]>;
  });

  // Use Promise.race to return the result of the fetch request if it completes before the timeout, or the timeout error if the request takes longer than 3 seconds
  return Promise.race([request, timeout]);
};
