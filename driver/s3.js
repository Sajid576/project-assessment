const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const ENV = {
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  region: process.env.AWS_REGION,
};

const fileParamsSetting = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: uuidv4(),
  ACL: 'public-read',
};

const s3bucket = new AWS.S3(ENV);
function cloudUpload(file, { prefix, sufix }) {
  const fileParams = { Key: `${prefix}${uuidv4()}${sufix}`, Body: file.buffer, ContentType: file.mimetype };
  return s3bucket.upload({ ...fileParamsSetting, ...fileParams }).promise();
}

module.exports = {
  cloudUpload,
};
