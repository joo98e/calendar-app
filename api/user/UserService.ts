import customAxiosInstance from "../common/customAxiosInstance";
import { CoreResponse } from "../common/CustomResponse";
import { User } from "./types";

export default class UserService {
  static async findAll(): Promise<CoreResponse<User>> {
    const axiosInstance = await customAxiosInstance();
    return await axiosInstance.get("/users1");
  }
}
