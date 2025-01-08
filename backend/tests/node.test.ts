
import supertest from "supertest";
import app from "../main";

const api = supertest(app);

test("Message is recieved as JSON", async () => {
    await api.get("/").expect("Content-Type", /json/);
})