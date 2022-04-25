const m = require('../models');
const { formatDate } = require('../helper/datetime');

function index(req, res) {
  const where = {};
  m.Assessment.findAll({ where })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function show(req, res) {
  m.Assessment.findOne({ where: { id: req.params.id } })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function create(req, res) {
  console.log(req.body);
  req.body = { ...req.body, deadline: formatDate(req.body.deadline) };
  m.Assessment.create(req.body)
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

async function update(req, res) {
  try {
    const data = await m.Assessment.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
}

function destroy(req, res) {
  m.Assessment.destroy({ where: { id: req.params.id } })
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
