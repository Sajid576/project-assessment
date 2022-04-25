const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function cloudUpload(file, { prefix, sufix }) {
  const destination = `${prefix}${uuidv4()}${sufix}`;
  fs.writeFile(`${process.env.STORAGE_ABSOLUTE_PATH.replace(/\/+$/, '')}/${destination}`, file.buffer, (err) => {
    if (err) {
      console.log('ERROR:', err);
      return;
    }
  });

  return destination;
}

module.exports = {
  cloudUpload,
};
