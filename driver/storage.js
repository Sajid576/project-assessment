require('dotenv').config();
const storageLib = require('./s3');
const storageLocal = require('./local');

module.exports = {
  saveFile:
    process.env.STORAGE_DRIVER === 's3'
      ? storageLib.cloudUpload
      : storageLocal.cloudUpload,
};
