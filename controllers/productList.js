const paths = require('path');
const m = require('../models');
const storageLib = require('../driver/storage');

function index(req, res) {
  const where = {};
  const include = [
    { model: m.Vendor, attributes: ['id', 'name', 'address'] },
    { model: m.Product, attributes: ['id', 'name', 'types'] },
  ];
  m.ProductList.findAll({ where, include })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function show(req, res) {
  const include = [
    { model: m.Vendor, attributes: ['id', 'name', 'address'] },
    { model: m.Product, attributes: ['id', 'name', 'types'] },
  ];
  m.ProductList.findOne({ where: { id: req.params.id }, include })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

async function create(req, res) {
  try {
    let image;
    if (req?.files?.length) {
      const type = paths.extname(req.files[0].originalname);
      const path = await storageLib.saveFile(req.files[0], { prefix: '', sufix: type });
      image = path?.Key ? path.Key : path;
    }
    const data = await m.ProductList.create({ ...req.body, UserId: req.user.id, image });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
}

function update(req, res) {
  m.ProductList.update(req.body, {
    where: { id: req.params.id },
  })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function destroy(req, res) {
  m.ProductList.destroy({ where: { id: req.params.id } })
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
