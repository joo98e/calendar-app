import { describe } from "@jest/globals";
import UserService from "../../../../api/user/UserService";
import mockAxiosInstance from "../../../__mock__/mockAxiosInstance";

const axios = require("axios");
jest.mock("axios");

describe("일반 텍스트 컴포넌트 테스트", () => {
  beforeAll(() => {
    mockAxiosInstance();
  });

  it("should ", async function() {
    const users = await UserService.findAll();
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
