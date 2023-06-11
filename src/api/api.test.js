import { fetchFromAPI } from "./api";
import fetchMock from "jest-fetch-mock";

// Globally replace fetch with fetchMock
global.fetch = fetchMock;

describe("fetchFromAPI", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches successfully from API", async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ id: 1, name: "Patient A" }]));
    const data = await fetchFromAPI("Patient A");
    expect(data).toEqual([{ id: 1, name: "Patient A" }]);
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      "https://61ba219448df2f0017e5a929.mockapi.io/api/patients?search=Patient A"
    );
  });

  it("returns null when response is not OK", async () => {
    fetchMock.mockResponseOnce("Not Found", { status: 404 });
    const data = await fetchFromAPI("Patient A");
    expect(data).toBeNull();
  });

  it("times out after 3 seconds", async () => {
    jest.useFakeTimers("modern");
    fetchMock.mockResponseOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ body: "ok" }), 4000)
        )
    );
    const dataPromise = fetchFromAPI("Patient A");
    jest.advanceTimersByTime(3000);
    await expect(dataPromise).rejects.toThrow("Request timed out");
    jest.useRealTimers();
  });
});
