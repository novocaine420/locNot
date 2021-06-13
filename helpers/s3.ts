import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import { File } from 'formidable';

export const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: 'http://s3.amazonaws.com'
});

const bucketName = 'reminders-pictures';

export const uploadFileToS3 = (file: File) => {
  const fileStream = fs.createReadStream(file.path);
  fileStream.on('error', (err) => {
    console.log('File Error', err);
  });

  const uploadParams = { Bucket: bucketName, Key: file.name, Body: fileStream };

  return s3.upload(uploadParams).promise();
};

export const deleteFileFromS3 = (key: string) => {
  const params = { Bucket: bucketName, Key: key };

  return s3.deleteObject(params).promise();
};

export const getFileStream = (fileKey: string) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  };

  return s3.getObject(downloadParams).createReadStream();
};
