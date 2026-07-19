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
  const email = `test${Date.now()}@gmail.com`;

  beforeAll(async () => {
    agent = request.agent(app);

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

  test("Create project with missing fields will fail", async () => {
    const res = await agent.post("/api/v1/projects/").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("All fields required!");
  });

  test("Only Admin Can Create Project", async () => {
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

  test("Member cann't create project", async () => {
    await User.findOneAndUpdate({ email }, { role: "member" });

    const res = await agent.post("/api/v1/projects").send({
      name: "TeamTask",
      description: "Test TeamTask",
    });

    expect(res.statusCode).toBe(403);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe(
      "You don't hava permission to perform this action!",
    );
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
