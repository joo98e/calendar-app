import customAxiosInstance from "../common/customAxiosInstance";
import { CoreResponse } from "../common/CustomResponse";
import { User } from "./types";

export default class UserService {

  static readonly FindAllPath = "/users";
  static readonly FindByIdPath = (userId: number) => `/users/${userId}`;

  static async findAll(): Promise<CoreResponse<User[]>> {
    const axiosInstance = await customAxiosInstance();
    return await axiosInstance.get(this.FindAllPath);
  }

  static async findById(userId: number): Promise<CoreResponse<User>> {
    const axiosInstance = await customAxiosInstance();
    return await axiosInstance.get(this.FindByIdPath(userId));
  }
}
