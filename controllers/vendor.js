const m = require('../models');

function index(req, res) {
  const where = {};
  m.Vendor.findAll({ where })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function show(req, res) {
  m.Vendor.findOne({ where: { id: req.params.id } })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function create(req, res) {
  m.Vendor.create(req.body)
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

async function update(req, res) {
  try {
    const data = await m.Vendor.update(req.body, { where: { id: req.params.id } });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
}

function destroy(req, res) {
  m.Vendor.destroy({ where: { id: req.params.id } })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

module.exports = {
  index, update, destroy, show, create,
};
