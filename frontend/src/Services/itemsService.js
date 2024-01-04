import baseClient from "./baseClient";

class ItemsClient {
    path = "/items";

    async createItem(item, image) {
        const filePath = (await this.postImage(image)).data.filePath;
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

    async getImage(imageId) {
        const response = await baseClient.get("images/"+imageId, { responseType: "blob" });
        const localUrl = URL.createObjectURL(response.data);
        return localUrl;
    }

    async postImage(image) {
        const formData = new FormData();
        formData.append("image", image);

        return await baseClient.post("images/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    async getRecommended(itemId) {
        return await baseClient.get(`recommended/${itemId}`);
    }
}

const itemsClient = new ItemsClient();

export default itemsClient;