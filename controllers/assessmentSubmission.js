const m = require("../models");

function index(req, res) {
  const where = {};
  m.AssessmentSubmission.findAll({ where })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function show(req, res) {
  m.AssessmentSubmission.findOne({ where: { id: req.params.id } })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function create(req, res) {
  m.AssessmentSubmission.create(req.body)
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

async function update(req, res) {
  try {
    const data = await m.AssessmentSubmission.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
}

function destroy(req, res) {
  m.AssessmentSubmission.destroy({ where: { id: req.params.id } })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

module.exports = {
  index,
  update,
  destroy,
  show,
  create,
};
