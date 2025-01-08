
import supertest from "supertest";
import app from "../main";

const api = supertest(app);

test("No body sent", async () => {
    await api.get("/groq").expect(404);
})

test("Empty prompt", async () => {
    const body = { prompt: "" }
    await api.post("/groq").send(body).expect(400);
})