import {
  setupApp,
  mockAxiosResponse,
  mockAxiosError,
  expectErrorResponse,
} from "./utils/testUtils.js";
import axios from "axios";

const request = require("supertest");

jest.mock("axios");

describe("Vehicle API", () => {
  const app = setupApp();
  const vehicleId = "1234";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch vehicle information", async () => {
    const vehicleInfoResponse = {
      data: {
        vin: { value: "1HGCM82633A123456" },
        color: { value: "Blue" },
        fourDoorSedan: { value: "True" },
        driveTrain: { value: "AWD" },
      },
    };

    mockAxiosResponse(vehicleInfoResponse);

    const res = await request(app).get(`/vehicles/${vehicleId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      vin: "1HGCM82633A123456",
      color: "Blue",
      doorCount: 4,
      driveTrain: "AWD",
    });
  });

  it("should handle error when fetching vehicle information", async () => {
    mockAxiosError(404, "Vehicle id: 1236 not found.");

    const res = await request(app).get(`/vehicles/1236`);

    expectErrorResponse(res, 404, "Vehicle id: 1236 not found.");
  });

  it("should fetch security status", async () => {
    const securityStatusResponse = {
      data: {
        doors: {
          values: [
            { location: { value: "frontLeft" }, locked: { value: "False" } },
            { location: { value: "frontRight" }, locked: { value: "True" } },
            { location: { value: "backLeft" }, locked: { value: "False" } },
            { location: { value: "backRight" }, locked: { value: "True" } },
          ],
        },
      },
    };

    mockAxiosResponse(securityStatusResponse);

    const res = await request(app).get(`/vehicles/${vehicleId}/doors`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      { location: "frontLeft", locked: false },
      { location: "frontRight", locked: true },
      { location: "backLeft", locked: false },
      { location: "backRight", locked: true },
    ]);
  });

  it("should handle error when fetching security status", async () => {
    mockAxiosError(404, "Vehicle id: 1236 not found.");

    const res = await request(app).get(`/vehicles/1236/doors`);

    expectErrorResponse(res, 404, "Vehicle id: 1236 not found.");
  });

  it("should fetch fuel range", async () => {
    const fuelRangeResponse = {
      data: {
        tankLevel: { value: 30.2 },
      },
    };

    mockAxiosResponse(fuelRangeResponse);

    const res = await request(app).get(`/vehicles/${vehicleId}/fuel`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      percent: 30.2,
    });
  });

  it("should handle error when fetching fuel range", async () => {
    mockAxiosError(404, "Vehicle id: 1236 not found.");

    const res = await request(app).get(`/vehicles/1236/fuel`);

    expectErrorResponse(res, 404, "Vehicle id: 1236 not found.");
  });

  it("should fetch battery range", async () => {
    const batteryRangeResponse = {
      data: {
        batteryLevel: { value: 85.6 },
      },
    };

    mockAxiosResponse(batteryRangeResponse);

    const res = await request(app).get(`/vehicles/${vehicleId}/battery`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      percent: 85.6,
    });
  });

  it("should handle error when fetching battery range", async () => {
    mockAxiosError(404, "Vehicle id: 1236 not found.");

    const res = await request(app).get(`/vehicles/1236/battery`);

    expectErrorResponse(res, 404, "Vehicle id: 1236 not found.");
  });

  it("should start the engine", async () => {
    const engineActionResponse = {
      data: {
        actionResult: {
          status: "EXECUTED",
        },
      },
    };

    mockAxiosResponse(engineActionResponse);

    const res = await request(app)
      .post(`/vehicles/${vehicleId}/engine`)
      .send({ action: "START" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      status: "success",
    });
  });

  it("should handle error when engine action service not found", async () => {
    mockAxiosError(404, "Vehicle id: 1236 not found.");

    const res = await request(app)
      .post(`/vehicles/1236/engine`)
      .send({ action: "START" });

    expectErrorResponse(res, 404, "Vehicle id: 1236 not found.");
  });

  it("should return error for invalid engine action", async () => {
    const res = await request(app)
      .post(`/vehicles/${vehicleId}/engine`)
      .send({ action: "INVALID_ACTION" });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      status: "error",
      statusCode: 400,
      message: "Invalid action",
    });
  });
});
