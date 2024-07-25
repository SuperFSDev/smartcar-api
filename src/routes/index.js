import express from 'express';
import getVehicleInfo from '../controllers/vehicleController.js';
import getSecurityStatus from '../controllers/securityController.js';
import {
  getBatteryRange,
  getFuelRange,
} from '../controllers/energyController.js';
import actionEngine from '../controllers/engineController.js';

const router = express.Router();

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Retrieve vehicle information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle information retrieved successfully
 *       404:
 *         description: Vehicle not found
 */
router.get('/:id', getVehicleInfo);

/**
 * @swagger
 * /vehicles/{id}/doors:
 *   get:
 *     summary: Retrieve security status of the vehicle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Security status retrieved successfully
 *       404:
 *         description: Vehicle not found
 */
router.get('/:id/doors', getSecurityStatus);

/**
 * @swagger
 * /vehicles/{id}/fuel:
 *   get:
 *     summary: Retrieve fuel range of the vehicle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Fuel range retrieved successfully
 *       404:
 *         description: Vehicle not found
 */
router.get('/:id/fuel', getFuelRange);

/**
 * @swagger
 * /vehicles/{id}/battery:
 *   get:
 *     summary: Retrieve battery range of the vehicle
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Battery range retrieved successfully
 *       404:
 *         description: Vehicle not found
 */
router.get('/:id/battery', getBatteryRange);

/**
 * @swagger
 * /vehicles/{id}/engine:
 *   post:
 *     summary: Start or stop the vehicle engine
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 description: Action to perform (START or STOP)
 *                 example: START
 *     responses:
 *       200:
 *         description: Engine action executed successfully
 *       400:
 *         description: Invalid action
 *       404:
 *         description: Vehicle not found
 */
router.post('/:id/engine', actionEngine);

export default router;
