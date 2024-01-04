import baseClient from "./baseClient";
import imageClient from "./imageService";

class ItemsClient {
    path = "/items";

    async createItem(item, image) {
        const filePath = (await imageClient.postImage(image)).data.filePath;
        item.paveikslelis = filePath;
        return await baseClient.post(this.path, item);
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

    async getRecommended(itemId) {
        return await baseClient.get(`recommended/${itemId}`);
    }
}

const itemsClient = new ItemsClient();

export default itemsClient;