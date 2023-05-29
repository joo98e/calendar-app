import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PracticePage from "../../../pages/calendar";
import { renderWithProviders } from "../../__mock__/renderWithProvider";

describe("Home", () => {
  it("Calendar Page", () => {
    renderWithProviders(<PracticePage />);

    const CalendarTitle = screen.getByText("2023년 01월");
    const CalendarPrevButton = screen.getByText("이전 달");
    fireEvent.click(CalendarPrevButton);
    expect(CalendarTitle).toHaveTextContent("2022년 12월");
  });
});
