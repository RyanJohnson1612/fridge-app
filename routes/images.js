const router = require('express').Router();
const path = require('path');
const AWS = require('aws-sdk');
const { DetectLabelsCommand, RekognitionClient } = require('@aws-sdk/client-rekognition');
const multer = require('multer');
const { createReadStream, unlink } = require('fs');
const {ClarifaiStub, grpc} = require('clarifai-nodejs-grpc');

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set('authorization', `Key ${process.env.CLARIFAI_API_KEY}`);

const config = {
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY
  }
};

// const rekogClient = new RekognitionClient(config)
const s3 = new AWS.S3(config);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './tmp/images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})


// const detect_label = async (bucket, photo) => {
//   const params = {
//     Image: {
//       S3Object: {
//         Bucket: bucket,
//         Name: photo
//       },
//     },
//   }

//   try {
//     const response = await rekogClient.send(new DetectLabelsCommand(params));
//     console.log(response.Labels);
//   } catch (err) {
//     console.log(err);
//   }
// }

const detectFood = (image) => {
  stub.PostModelOutputs(
    {
        model_id: 'bd367be194cf45149e75f01d59f77ba7',
        inputs: [
            {data: {image: {url: image}}}
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        return response.outputs[0];
    }
  );
}

module.exports = (db) => {
  router.post('/', upload.single('file'), (req, res) => {
    const image = req.file;
    const fileContent = createReadStream(image.path);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${image.filename}`,
      Body: fileContent
    }

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      }

      const output = detectFood(data.Location);

      res.json({image: data.Location, predicted: output}).status(201).end();
    });


  });

  return router;
}
