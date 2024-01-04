import baseClient from "./baseClient";

class CartClient {
    path = "/krepselis";

    async createCart(item) {
        return await baseClient.post(this.path, item)
    }

    async getCart(id) {
        return await baseClient.get(this.path+"/"+id);
    }

    async updateCart(id, item) {
        await baseClient.patch(this.path+"/"+id, item);
    }

    async deleteCart(id) {
        await baseClient.delete(this.path+"/"+id);
    }
    async deleteAllCart(id) {
        await baseClient.delete(this.path + "/deleteAll/"+id);
    }

    async insertMokejimas(items) {
        return await baseClient.post(this.path + "/insertmokejimas", items);
    }
    async getMokejimas(id) {
        return await baseClient.get(this.path+"/mokejimas/"+id);
    }
}

const cartClient = new CartClient();

export default cartClient;