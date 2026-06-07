import App from "./App";
import React from "react";
import "@testing-library/jest-dom";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const server = setupServer(
  http.get("*", () => {
    return HttpResponse.json({});
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// TODO: Fix test
test("renders Home page on default route", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );

  expect(await screen.findByTestId("home")).toBeInTheDocument();
});
