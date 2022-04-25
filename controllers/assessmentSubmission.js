const paths = require('path');
const m = require('../models');
const storageLib = require('../driver/storage');
const { formatDate, getCurrentDatetime } = require('../helper/datetime');

function index(req, res) {
  const where = {};
  m.AssessmentSubmission.findAll({ where })
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

async function show(req, res) {
  try {
    const data = await m.AssessmentSubmission.findOne({ where: { id: req.params.id } });
    if (req.user.RoleId === 3) {
      if (req.user.id !== data.UserId) {
        res.status(401).json({ error: 'You are only allowed to see your own submissions' });
      } else {
        res.json({ data });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function create(req, res) {
  const filePaths = [];
  if (req?.files?.length) {
    console.log('LOL', req?.files);
    for (let i = 0; i < req.files?.length; i++) {
      const type = paths.extname(req.files[i].originalname);
      const path = storageLib.saveFile(req.files[i], {
        prefix: `${req.files[i].originalname}`,
        sufix: type,
      });

      filePaths.push(path);
    }
  }

  // eslint-disable-next-line max-len
  const payload = { ...req.body, submissionDate: getCurrentDatetime(), files: JSON.stringify(filePaths) };
  console.log('payload', payload);
  m.AssessmentSubmission.create(payload)
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ error }));
}

async function update(req, res) {
  const filePaths = [];
  if (req?.files?.length) {
    for (let i = 0; i < req.files?.length; i++) {
      const type = paths.extname(req.files[i].originalname);
      const path = storageLib.saveFile(req.files[i], {
        prefix: `${req.files[i].originalname}`,
        sufix: type,
      });

      filePaths.push(path);
    }
  }

  // eslint-disable-next-line max-len
  const payload = { ...req.body, submissionDate: getCurrentDatetime(), files: JSON.stringify(filePaths) };

  try {
    const data = await m.AssessmentSubmission.update(payload, {
      where: { id: req.params.id },
    });
    console.log('update', data);
    res.json({ message:"Submission successfully updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

function destroy(req, res) {
  m.AssessmentSubmission.destroy({ where: { id: req.params.id } })
    .then((data) => res.json({ message:"Submission successfully deleted" }) )
    .catch((error) => res.status(500).json({ error }));
}

module.exports = {
  index,
  update,
  destroy,
  show,
  create,
};
