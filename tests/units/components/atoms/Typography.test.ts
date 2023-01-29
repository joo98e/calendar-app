import { describe } from "@jest/globals";
import UserService from "../../../../api/user/UserService";
import mockAxiosInstance from "../../../__mock__/mockAxiosInstance";
import { User } from "../../../../api/user/types";

const axios = require("axios");
jest.mock("axios");

describe("일반 텍스트 컴포넌트 테스트", () => {
  beforeAll(() => {
    const mockUser = {
      id: 1,
      name: "beok",
      username: "everybeok",
      email: "jtbeok@gmail.com",
      address: {
        street: "street",
        suite: "string",
        city: "string",
        zipcode: "string",
        geo: {
          lat: "string",
          lng: "string"
        }
      },
      phone: "string",
      website: "string",
      company: {
        name: "string",
        catchPhrase: "string",
        bs: "string"
      }
    };

    mockAxiosInstance<User, {}, undefined>({ data: { data: mockUser }, success: true }, undefined, undefined);
  });

  it("should return mock value", async function() {
    const res = await UserService.findAll();

    console.log(res.data.data);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
