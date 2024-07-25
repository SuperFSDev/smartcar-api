import request from 'supertest';
import {
  setupApp,
  mockAxiosResponse,
  mockAxiosError,
  expectErrorResponse,
} from '../utils/testUtils.js';

jest.mock('axios');

describe('Vehicle Controller', () => {
  const app = setupApp();
  const vehicleId = '1234';

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should return vehicle information', async () => {
    const vehicleInfoResponse = {
      data: {
        vin: { value: '1HGCM82633A123456' },
        color: { value: 'Blue' },
        fourDoorSedan: { value: 'True' },
        driveTrain: { value: 'AWD' },
      },
    };

    mockAxiosResponse(vehicleInfoResponse);

    const res = await request(app).get(`/vehicles/${vehicleId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      vin: '1HGCM82633A123456',
      color: 'Blue',
      doorCount: 4,
      driveTrain: 'AWD',
    });
  });
  it('should handle error when fetching vehicle information', async () => {
    mockAxiosError(404, 'Vehicle id: 1236 not found.');

    const res = await request(app).get(`/vehicles/1236`);

    expectErrorResponse(res, 404, 'Vehicle id: 1236 not found.');
    expect(res.statusCode).toBe(404);
  });
});
