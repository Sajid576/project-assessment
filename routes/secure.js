const express = require("express");

const router = express.Router();
const c = require("../controllers");
const m = require("../middleware");

/**
 * @swagger
 * tags:
 *   name: Harmoni
 *   description: API to manage Harmoni.
 */

router.get("/role", c.role.index);
router.get("/activitylog", m.requireAdminOrUser, c.activitylog.index);

router.get("/users", m.requireAdmin, c.user.index);
router.post("/user/:UserId", c.userUpdate.update);

module.exports = router;
