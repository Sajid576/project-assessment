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

// Assessment routes
/**
 * @swagger
 * /api/assessment:
 *   get:
 *     tags: [assessment]
 *     summary: get a list of assessments
 *     description: get a list of assessments
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.get("/assessment", c.assessment.index);

/**
 * @swagger
 * /api/assessment:
 *   post:
 *     tags: [assessment]
 *     summary: add a new assessment
 *     description: add a new assessment
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.post("/assessment", m.requireAdmin, c.assessment.create);

/**
 * @swagger
 * /api/assessment/:id:
 *   get:
 *     tags: [assessment]
 *     summary: get a details of a assessment
 *     description: get a details of a assessment
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.get("/assessment/:id", m.requireAdmin, c.assessment.show);

/**
 * @swagger
 * /api/assessment/:id:
 *   post:
 *     tags: [assessment]
 *     summary: update a assessment details
 *     description: update a assessment details
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.post("/assessment/:id", m.requireAdmin, c.assessment.update);

/**
 * @swagger
 * /api/assessment/:id:
 *   delete:
 *     tags: [assessment]
 *     summary: delete a assessment details
 *     description: delete a assessment details
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.delete("/assessment/:id", m.requireAdmin, c.assessment.destroy);

// Assessment Submission routes
/**
 * @swagger
 * /api/assessment-submission:
 *   get:
 *     tags: [assessment-submission]
 *     summary: get a list of assessment-submission
 *     description: get a list of assessment-submission
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.get("/assessment-submission", c.assessmentSubmission.index);

/**
 * @swagger
 * /api/assessment-submission:
 *   post:
 *     tags: [assessment-submission]
 *     summary: add a new assessment-submission
 *     description: add a new assessment-submission
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.post(
  "/assessment-submission",
  m.requireAdmin,
  c.assessmentSubmission.create
);

/**
 * @swagger
 * /api/assessment-submission/:id:
 *   get:
 *     tags: [assessment-submission]
 *     summary: get a details of a assessment-submission
 *     description: get a details of a assessment-submission
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.get(
  "/assessment-submission/:id",
  m.requireAdmin,
  c.assessmentSubmission.show
);

/**
 * @swagger
 * /api/assessment-submission/:id:
 *   post:
 *     tags: [assessment-submission]
 *     summary: update a assessment-submission details
 *     description: update a assessment-submission details
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.post(
  "/assessment-submission/:id",
  m.requireAdmin,
  c.assessmentSubmission.update
);

/**
 * @swagger
 * /api/assessment-submission/:id:
 *   delete:
 *     tags: [assessment-submission]
 *     summary: delete a assessment-submission details
 *     description: delete a assessment-submission details
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.delete(
  "/assessment-submission/:id",
  m.requireAdmin,
  c.assessmentSubmission.destroy
);

// Grade Routes
/**
 * @swagger
 * /api/grade:
 *   get:
 *     tags: [grade]
 *     summary: get a list of grade
 *     description: get a list of grade
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.get("/grade", c.grade.index);

/**
 * @swagger
 * /api/grade:
 *   post:
 *     tags: [grade]
 *     summary: add a new grade
 *     description: add a new grade
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.post("/grade", m.requireAdmin, c.grade.create);

/**
 * @swagger
 * /api/grade/:id:
 *   get:
 *     tags: [grade]
 *     summary: get a details of a grade
 *     description: get a details of a grade
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.get("/grade/:id", m.requireAdmin, c.grade.show);

/**
 * @swagger
 * /api/grade/:id:
 *   post:
 *     tags: [grade]
 *     summary: update a grade details
 *     description: update a grade details
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.post("/grade/:id", m.requireAdmin, c.grade.update);

/**
 * @swagger
 * /api/grade/:id:
 *   delete:
 *     tags: [grade]
 *     summary: delete a grade details
 *     description: delete a grade details
 *     responses:
 *       200:
 *         description: static data.
 *       500:
 *         something when wrong.
 */
router.delete("/grade/:id", m.requireAdmin, c.grade.destroy);

module.exports = router;
