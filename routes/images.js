const router = require('express').Router();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY
});

module.exports = (db) => {
  router.post('/image', (req, res) => {
    const image = req.image;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${image.filename}.jpg`,
      Body: fileContent
    }

    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.Location);
    });
  });

  return router;
}
