import request from 'supertest';
import {
  setupApp,
  mockAxiosResponse,
  mockAxiosError,
  expectErrorResponse,
} from '../utils/testUtils.js';

jest.mock('axios');

describe('Energy Controller', () => {
  const app = setupApp();
  const vehicleId = '1234';

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should fetch fuel range', async () => {
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

  it('should handle error when fetching fuel range', async () => {
    mockAxiosError(404, 'Vehicle id: 1236 not found.');

    const res = await request(app).get(`/vehicles/1236/fuel`);

    expectErrorResponse(res, 404, 'Vehicle id: 1236 not found.');
    expect(res.statusCode).toBe(404);
  });

  it('should fetch battery range', async () => {
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
    expect(res.body.percent).toEqual(85.6);
  });

  it('should handle error when fetching battery range', async () => {
    mockAxiosError(404, 'Vehicle id: 1236 not found.');

    const res = await request(app).get(`/vehicles/1236/battery`);

    expectErrorResponse(res, 404, 'Vehicle id: 1236 not found.');
    expect(res.statusCode).toBe(404);
  });
});
