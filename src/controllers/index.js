import { makeApiRequest } from "../utils/ApiUtils.js";
import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const handleApiRequest = async (endpoint, params, res, next, transformData) => {
  try {
    logger.info(
      `Request to ${endpoint} with params: ${JSON.stringify(params)}`
    );
    const data = await makeApiRequest(endpoint, params);
    logger.info(`Response from ${endpoint}: ${JSON.stringify(data)}`);

    const transformedData = transformData(data);
    res.status(200).json(transformedData);
  } catch (error) {
    logger.error(`Error in ${endpoint}: ${error.message}`);
    next(error);
  }
};
export const getVehicleInfo = async (req, res, next) => {
  const { id } = req.params;

  handleApiRequest(
    "/getVehicleInfoService",
    { id, responseType: "JSON" },
    res,
    next,
    (data) => ({
      vin: data.data.vin.value,
      color: data.data.color.value,
      doorCount: data.data.fourDoorSedan.value === "True" ? 4 : 2,
      driveTrain: data.data.driveTrain.value,
    })
  );
};

export const getSecurityStatus = async (req, res, next) => {
  const { id } = req.params;

  handleApiRequest(
    "/getSecurityStatusService",
    { id, responseType: "JSON" },
    res,
    next,
    (data) =>
      data.data.doors.values.map((door) => ({
        location: door.location.value,
        locked: door.locked.value === "True",
      }))
  );
};

export const getFuelRange = async (req, res, next) => {
  const { id } = req.params;

  handleApiRequest(
    "/getEnergyService",
    { id, responseType: "JSON" },
    res,
    next,
    (data) => ({
      percent: data.data.tankLevel.value,
    })
  );
};

export const getBatteryRange = async (req, res, next) => {
  const { id } = req.params;

  handleApiRequest(
    "/getEnergyService",
    { id, responseType: "JSON" },
    res,
    next,
    (data) => ({
      percent: data.data.batteryLevel.value,
    })
  );
};
export const actionEngine = async (req, res, next) => {
  const { id } = req.params;
  const { action } = req.body;
  const command =
    action === "START"
      ? "START_VEHICLE"
      : action === "STOP"
      ? "STOP_VEHICLE"
      : null;

  if (!command) {
    return next(new ApiError(400, "Invalid action"));
  }

  handleApiRequest(
    "/actionEngineService",
    { id, command, responseType: "JSON" },
    res,
    next,
    (data) => ({
      status:
        data.data.actionResult.status === "EXECUTED" ? "success" : "error",
    })
  );
};
