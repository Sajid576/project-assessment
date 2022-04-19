const paths = require('path');
const m = require('../models');
const storageLib = require('../driver/storage');

const include = [{ model: m.User, attributes: ['id', 'name'] }];

function index(req, res) {
  const where = {};

  m.Community.findAll({ where, include })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function show(req, res) {
  m.Community.findOne({ where: { id: req.params.id }, include })
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => res.status(500).json({ error }));
}

async function create(req, res) {
  try {
    let image;
    if (req?.files?.length) {
      const type = paths.extname(req.files[0].originalname);
      const path = await storageLib.saveFile(req.files[0], {
        prefix: '',
        sufix: type,
      });
      image = path?.Key ? path.Key : path;
    }
    const data = await m.Community.create({
      ...req.body,
      UserId: req.user.id,
      image,
    });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
}

function update(req, res) {
  m.Community.update(req.body, {
    where: { id: req.params.id },
  })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

function destroy(req, res) {
  m.Community.destroy({ where: { id: req.params.id } })
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
