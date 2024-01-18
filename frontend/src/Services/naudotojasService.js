import baseClient from "./baseClient";

class NaudotojasClient {
  path = "/naudotojas";

  async getNaudotojai() {
    const naudotojai = await baseClient.get(this.path);
    return naudotojai;
  }

  async getNaudotojas(id) {
    return await baseClient.get(this.path + "/" + id);
  }

  async updateNaudotojas(id, naudotojas) {
    console.log(naudotojas);
    await baseClient.patch(this.path + "/" + id, naudotojas);
  }

  async deleteNaudotojas(id) {
    await baseClient.delete(this.path + "/" + id);
  }
  async AddNaudotojas(newUser) {
    const response = await baseClient.post(
      this.path + "/AddNaudotojas",
      newUser
    );
    return response.data;
  }
}

const naudotojasClient = new NaudotojasClient();

export default naudotojasClient;
