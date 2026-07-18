import dotenv from "dotenv/config";
import connectDB from "../src/config/db.js";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import User from "../src/models/user.model.js";

beforeAll(async () => {
  await connectDB();
});

describe("Project Routes", () => {
  let agent;

  beforeAll(async () => {
    agent = request.agent(app);
    const email = `test${Date.now()}@gmail.com`;

    await agent.post("/api/v1/auth/register").send({
      fullname: "Test User",
      email,
      password: "123456",
    });

    await User.findOneAndUpdate({ email }, { role: "admin" });

    await agent.post("/api/v1/auth/login").send({
      email,
      password: "123456",
    });
  });

  test("Create Project", async () => {
    const res = await agent.post("/api/v1/projects").send({
      name: "TeamTask",
      description: "Testing Project",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Project created successfully!");
  });

  test("Get Projects", async () => {
    const res = await agent.get("/api/v1/projects");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Projects Find Successfully!");
    expect(res.body.success).toBe(true);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
