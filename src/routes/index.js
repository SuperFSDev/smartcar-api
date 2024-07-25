import express from "express";

import {
  getVehicleInfo,
  getSecurityStatus,
  getFuelRange,
  getBatteryRange,
  actionEngine,
} from "../controllers";

const router = express.Router();

router.get("/:id", getVehicleInfo);
router.get("/:id/doors", getSecurityStatus);
router.get("/:id/fuel", getFuelRange);
router.get("/:id/battery", getBatteryRange);
router.post("/:id/engine", actionEngine);

export default router;
