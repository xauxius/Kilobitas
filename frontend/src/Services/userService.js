import baseClient from "./baseClient";

class UserClient {
  async login() {
    return await baseClient.post("Auth/login");
  }

  async register() {
    return await baseClient.post(`Auth/register`);
  }
}

const userClient = new UserClient();

export default userClient;
