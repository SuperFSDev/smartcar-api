import request from 'supertest';
import {
  setupApp,
  mockAxiosResponse,
  mockAxiosError,
  expectErrorResponse,
} from '../utils/testUtils.js';

jest.mock('axios');

describe('Engine Controller', () => {
  const app = setupApp();
  const vehicleId = '1234';

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should start the engine', async () => {
    const engineActionResponse = {
      data: {
        actionResult: {
          status: 'EXECUTED',
        },
      },
    };

    mockAxiosResponse(engineActionResponse);

    const res = await request(app)
      .post(`/vehicles/${vehicleId}/engine`)
      .send({ action: 'START' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      status: 'success',
    });
  });

  it('should handle error when engine action service not found', async () => {
    mockAxiosError(404, 'Vehicle id: 1236 not found.');

    const res = await request(app)
      .post(`/vehicles/1236/engine`)
      .send({ action: 'START' });

    expectErrorResponse(res, 404, 'Vehicle id: 1236 not found.');
    expect(res.statusCode).toBe(404);
  });

  it('should return error for invalid engine action', async () => {
    const res = await request(app)
      .post(`/vehicles/${vehicleId}/engine`)
      .send({ action: 'INVALID_ACTION' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      status: 'error',
      statusCode: 400,
      message: 'Invalid action',
    });
  });
});
