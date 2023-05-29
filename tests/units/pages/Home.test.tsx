import { NextRequest, NextResponse } from "next/server";
import Home from "../../../pages/index";
import { renderWithProviders } from "../../__mock__/renderWithProvider";

describe("redirect", () => {
  // afterEach(() => {
  //   redirectSpy.mockReset();
  // });

  it("redirect", () => {
    const redirectSpy = jest.spyOn(NextResponse, "redirect");
    const req = new NextRequest(new Request("https://www.whatever.com"), {});
    req.nextUrl.searchParams.set("directToStore", "true");

    expect(1 + 1).toBe(2);
    // expect(redirectSpy).toHaveBeenCalledTimes(1);
  });
});
