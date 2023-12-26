import baseClient from "./baseClient";

class ItemsClient {
    path = "/items";
    async getItems() {
        const res = await baseClient.get(this.path);
        return res.data; 
    }

    async getItem(id) {
        return await baseClient.get(this.path+"/"+id);
    }

    async updateItem(id, item) {
        await baseClient.patch(this.path+"/"+id, item);
    }

    async deleteItem(id) {
        await baseClient.delete(this.path+"/"+id);
    }
}

const itemsClient = new ItemsClient();

export default itemsClient;