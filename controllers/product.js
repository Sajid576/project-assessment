const m = require('../models');

function index(req, res) {
  const where = {};
  m.Product.findAll({ where })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function show(req, res) {
  m.Product.findOne({ where: { id: req.params.id } })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function create(req, res) {
  m.Product.create(req.body)
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function update(req, res) {
  m.Product.update(req.body, {
    where: { id: req.params.id },
  })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function destroy(req, res) {
  m.Product.destroy({ where: { id: req.params.id } })
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
