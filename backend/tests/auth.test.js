import "dotenv/config";
import request from "supertest";
import app from "../src/app.js";
import connectDB from "../src/config/db.js";
import mongoose from "mongoose";

beforeAll(async () => {
  await connectDB();
});

describe("Health Route", () => {
  test("Health Route Works", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

const email = `test${Date.now()}@gmail.com`;

test("User cann't register without email", async () => {
  const res = await request(app).post("/api/v1/auth/register").send({
    fullname: "Test user",
    password: "123456",
  });

  expect(res.statusCode).toBe(400);
  expect(res.body.success).toBe(false);
});

test("Register user", async () => {
  const res = await request(app).post("/api/v1/auth/register").send({
    fullname: "Test User",
    email,
    password: "123456",
  });

  expect(res.statusCode).toBe(201);
  expect(res.body.success).toBe(true);
});

test("Login without email will fail", async () => {
  const res = await request(app).post("/api/v1/auth/login").send({
    password: "123456",
  });

  expect(res.statusCode).toBe(400);
  expect(res.body.success).toBe(false);
});

test("Login with false email will fail", async () => {
  const res = await request(app).post("/api/v1/auth/login").send({
    email: "wrongemail@gmail.com",
    password: "123456",
  });

  expect(res.statusCode).toBe(404);
  expect(res.body.success).toBe(false);
  expect(res.body.message).toBe("User Not Found!");
});

test("Login user", async () => {
  const res = await request(app).post("/api/v1/auth/login").send({
    email,
    password: "123456",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.message).toBe("User logged in successfully!");
});

afterAll(async () => {
  await mongoose.connection.close();
});
