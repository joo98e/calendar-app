import { describe } from "@jest/globals";
import UserService from "../../../api/user/UserService";
import mockAxiosInstance from "../../__mock__/mockAxiosInstance";
import { User } from "../../../api/user/types";

const axios = require("axios");
jest.mock("axios");

describe("일반 텍스트 컴포넌트 테스트", () => {
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
        lng: "string",
      },
    },
    phone: "string",
    website: "string",
    company: {
      name: "string",
      catchPhrase: "string",
      bs: "string",
    },
  };

  it("return User[]", async function () {
    mockAxiosInstance<User[], undefined, undefined>(
      {
        data: { data: [mockUser] },
        success: true,
      },
      undefined,
      undefined
    );

    const {
      data: { data: user },
    } = await UserService.findAll();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(UserService.FindAllPath);
    expect(user).toEqual([mockUser]);
  });

  it("return User", async function () {
    mockAxiosInstance<User>({
      data: { data: mockUser },
      success: true,
    });

    const {
      data: { data: user },
    } = await UserService.findById(1);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(UserService.FindByIdPath(1));
    expect(user).toBe(mockUser);
  });
});
