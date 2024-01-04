import recommendedClient from "./recommendedService";

class SessionService {
    async getSessionId() {
        let sessionId = sessionStorage.getItem("sessionId");

        if (!sessionId || sessionId === "undefined") {
            sessionId = (await recommendedClient.startSession()).data.session_id;
            console.log(sessionId);
            sessionStorage.setItem("sessionId", sessionId);
        } else {
            console.log(`Sesija jau egzistuoja jos id: ${sessionId}`);
        }

        return sessionId;
    }
}

const sessionService = new SessionService();

export default sessionService;