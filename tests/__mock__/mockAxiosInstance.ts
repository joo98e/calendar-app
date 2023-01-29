import { CoreResponse } from "../../api/common/CustomResponse";

const axios = require("axios");
jest.mock("axios");

export default function mockAxiosInstance() {
  axios.create = jest.fn().mockReturnThis();
  axios.get.mockResolvedValue((): CoreResponse<any> => {
    return {
      data: null,
      success: true
    };
  });

  axios.post.mockResolvedValue((data): CoreResponse<any> => {
    return {
      data: null,
      success: true
    };
  });

}