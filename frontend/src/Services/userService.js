import baseClient from "./baseClient";

class UserClient {
  async login() {
    return await baseClient.post("Auth/login");
  }

  async register() {
    return await baseClient.post(`Auth/register`);
  }
  async post(url, data) {
    return await baseClient.post(url, data);
  }
}

const userClient = new UserClient();

export default userClient;
