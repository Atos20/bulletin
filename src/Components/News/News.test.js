import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { News } from "./News";

describe("News", () => {
  it("User should see home page by default", () => {
    render(
    //   <MemoryRouter>
    //     <News />
    //   </MemoryRouter>
    );
    // expect(screen.getByText("Indecision")).toBeInTheDocument();
  });

});