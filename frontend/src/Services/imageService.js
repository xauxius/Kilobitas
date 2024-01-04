import baseClient from "./baseClient";

class ImageClient {
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
}

const imageClient = new ImageClient();

export default imageClient;