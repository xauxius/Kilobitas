import baseClient from "./baseClient";
import imageClient from "./imageService";

class ItemsClient {
    path = "/items";

    async createItem(item, image) {
        let filePath;
        if (image) {
            filePath = (await imageClient.postImage(image)).data.filePath;
        } else {
            filePath = "default.jpg"
        }
        item.paveikslelis = filePath;
        return await baseClient.post(this.path, item);
    }

    async getItems() {
        const items = await baseClient.get(this.path);
        return items;
    }

    async getAllItems() {
        const items = await baseClient.get(this.path+"/all/");
        return items;
    }

    async getItem(id) {
        return await baseClient.get(this.path+"/"+id);
    }

    async updateItem(id, item, image) {
        if (image) {
            let filePath = (await imageClient.postImage(image)).data.filePath;
            item.paveikslelis = filePath;
        }
        console.log(item);
        await baseClient.patch(this.path+"/"+id, item);
    }

    async deleteItem(id) {
        await baseClient.delete(this.path+"/"+id);
    }

    async softDeleteItem(id) {
        await baseClient.delete(this.path+"/softdelete/"+id);
    }

    async restoreItem(id) {
        await baseClient.post(this.path+"/restore/"+id);
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