import express from "express";
import router from "../../src/routes/index.js";
import errorHandler from "../../src/middleware/errorHandler";
import axios from "axios";
import request from "supertest";

export const setupApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/vehicles", router);
  app.use(errorHandler);
  return app;
};

export const mockAxiosResponse = (response) => {
  axios.post.mockResolvedValue({ data: response });
};

export const mockAxiosError = (status, message) => {
  axios.post.mockRejectedValue({
    response: { status, data: { message } },
  });
};

export const expectErrorResponse = (res, statusCode, message) => {
  expect(res.statusCode).toEqual(statusCode);
  expect(res.body).toEqual({
    status: "error",
    statusCode,
    message,
  });
};
