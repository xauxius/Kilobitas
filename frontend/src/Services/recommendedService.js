import baseClient from "./baseClient";

class RecommendedClient {
    async updateRecommended() {
        return await baseClient.post("recommended");
    }

    async getRecommended(itemId) {
        return await baseClient.get(`recommended/${itemId}`);
    }

    async startSession() {
        return await baseClient.post("recommended/session/");
    }

    async postSessionView(sessionId, itemId) {
        return await baseClient.post(`recommended/session/${sessionId}/item/${itemId}`);
    }
}

const recommendedClient = new RecommendedClient();

export default recommendedClient;