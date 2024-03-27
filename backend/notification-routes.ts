///<reference path="types.ts" />

import express from "express";
import {
  createNotifications,
  updateNotificationById,
  getUnreadNotificationsByUserId,
} from "./database";
import { checkAuth0Jwt, ensureAuthenticated, validateMiddleware } from "./helpers";
import {
  isNotificationsBodyValidator,
  shortIdValidation,
  isNotificationPatchValidator,
} from "./validators";
const router = express.Router();

// Routes

//GET /notifications/
//router.get("/", ensureAuthenticated, (req, res) => {
router.get("/", checkAuth0Jwt, (req, res) => {
  /* istanbul ignore next */
  //const notifications = getUnreadNotificationsByUserId(req.user?.id!);
  const notifications = getUnreadNotificationsByUserId("uBmeaz5pX");

  res.status(200);
  res.json({ results: notifications });
});

//POST /notifications/bulk
router.post(
  "/bulk",
  checkAuth0Jwt,
  //ensureAuthenticated,
  validateMiddleware([...isNotificationsBodyValidator]),
  (req, res) => {
    const { items } = req.body;
    /* istanbul ignore next */
    const notifications = createNotifications(req.user?.id!, items);

    res.status(200);
    // @ts-ignore
    res.json({ results: notifications });
  }
);

//PATCH /notifications/:notificationId - scoped-user
router.patch(
  "/:notificationId",
  checkAuth0Jwt,
  //ensureAuthenticated,
  validateMiddleware([shortIdValidation("notificationId"), ...isNotificationPatchValidator]),
  (req, res) => {
    const { notificationId } = req.params;
    /* istanbul ignore next */
    updateNotificationById(req.user?.id!, notificationId, req.body);

    res.sendStatus(204);
  }
);

export default router;
