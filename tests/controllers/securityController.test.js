import request from 'supertest';
import {
  setupApp,
  mockAxiosResponse,
  mockAxiosError,
  expectErrorResponse,
} from '../utils/testUtils.js';

jest.mock('axios');

describe('Security Controller', () => {
  const app = setupApp();
  const vehicleId = '1234';

  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should fetch security status', async () => {
    const securityStatusResponse = {
      data: {
        doors: {
          values: [
            { location: { value: 'frontLeft' }, locked: { value: 'False' } },
            { location: { value: 'frontRight' }, locked: { value: 'True' } },
            { location: { value: 'backLeft' }, locked: { value: 'False' } },
            { location: { value: 'backRight' }, locked: { value: 'True' } },
          ],
        },
      },
    };

    mockAxiosResponse(securityStatusResponse);

    const res = await request(app).get(`/vehicles/${vehicleId}/doors`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      { location: 'frontLeft', locked: false },
      { location: 'frontRight', locked: true },
      { location: 'backLeft', locked: false },
      { location: 'backRight', locked: true },
    ]);
  });

  it('should handle error when fetching security status', async () => {
    mockAxiosError(404, 'Vehicle id: 1236 not found.');

    const res = await request(app).get(`/vehicles/1236/doors`);

    expectErrorResponse(res, 404, 'Vehicle id: 1236 not found.');
    expect(res.statusCode).toBe(404);
  });
});
