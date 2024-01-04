import baseClient from "./baseClient";

class ImageClient {
    async getImage(imageId) {
        let image;
        try {
            const response = await baseClient.get("images/"+imageId, { responseType: "blob" });
            image = URL.createObjectURL(response.data);
            
        } catch {
            image = "/Images/blank.jpg";
        }
        return image;
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