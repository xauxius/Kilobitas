import baseClient from "./baseClient";

class ItemsClient {
    path = "/items";

    async createItem(item) {

    }

    async getItems() {
        const items = await baseClient.get(this.path);
        return items;
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

    async getItemTypes() {
        return await baseClient.get("enums/item-types");
    }

    async getImage(imageId) {
        const response = await baseClient.get("images/"+imageId, { responseType: "blob" });
        const localUrl = URL.createObjectURL(response.data);
        return localUrl;
    }

    async getRecommended(itemId) {
        return await baseClient.get(`recommended/${itemId}`);
    }
}

const itemsClient = new ItemsClient();

export default itemsClient;