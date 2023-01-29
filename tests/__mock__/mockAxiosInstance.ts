import { CoreResponse } from "../../api/common/CustomResponse";

const axios = require("axios");
jest.mock("axios");

type GetResponse<T> = CoreResponse<T>;
type PostResponse<T> = CoreResponse<T>;
type PutResponse<T> = CoreResponse<T>;


export default function mockAxiosInstance<T = {}, S = {}, R = {}>(getResponse?: GetResponse<T>, postResponse?: PostResponse<S>, putResponse?: PutResponse<R>) {
  axios.create = jest.fn().mockReturnThis();

  axios.get.mockResolvedValue(getResponse);
  axios.post.mockResolvedValue(postResponse);
  axios.put.mockResolvedValue(putResponse);
}