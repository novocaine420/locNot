import { NextApiRequest, NextApiResponse } from 'next';
import uniqid from 'uniqid';
import formidable from 'formidable';
import fs from 'fs';
import * as util from 'util';

import { docClient } from '../../../helpers/aws-api';
import { uploadFileToS3 } from '../../../helpers/s3';
import { Reminder } from '@isomorphic/types';

const unlinkFile = util.promisify(fs.unlink);

export const config = {
  api: {
    bodyParser: false
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const params = {
        TableName: 'Reminders',
        ProjectionExpression: '#id, title, message, #loc, #date, picture',
        ExpressionAttributeNames: {
          '#id': 'id',
          '#loc': 'location',
          '#date': 'date'
        }
      };

      docClient.scan(params, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end();
        } else {
          res.status(200).json(data);
        }
      });
      break;
    }
    case 'POST': {
      const id = uniqid();
      try {
        const form = formidable({ multiples: true });
        const newReminder = await new Promise<Reminder>((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) {
              reject(err);
              return;
            }
            const { file } = files;

            if (!Array.isArray(file)) {
              uploadFileToS3(file)
                ?.then((data) => unlinkFile(file.path).then(() => data.Location))
                .then((link) =>
                  resolve({
                    id,
                    title: fields.title,
                    message: fields.message,
                    date: fields.date,
                    location: JSON.parse(fields.location),
                    picture: link
                  })
                );
            }
          });
        });

        const params = {
          TableName: 'Reminders',
          Item: newReminder
        };

        docClient.put(params, (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.end();
          } else {
            res.status(200).json(JSON.stringify(newReminder));
          }
        });
      } catch (err) {
        console.log('==ERROR==', err);
        res.statusCode = 500;
        res.end();
      }
      break;
    }
    default:
      res.statusCode = 405;
      res.end();
  }
};
