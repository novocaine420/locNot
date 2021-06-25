import { NextApiRequest, NextApiResponse } from 'next';

import { docClient } from '../../../helpers/aws-api';
import { deleteFileFromS3 } from '../../../helpers/s3';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  switch (req.method) {
    case 'GET': {
      const params = {
        TableName: 'reminders',
        Key: {
          id
        }
      };

      docClient.get(params, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end();
        } else {
          res.status(200).json(data.Item);
        }
      });
      break;
    }
    case 'DELETE': {
      const params = {
        TableName: 'reminders',
        ReturnValues: 'ALL_OLD',
        Key: {
          id
        }
      };

      docClient.delete(params, async (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end();
        } else {
          const linkArr = data?.Attributes?.picture.split('/');
          const imgKey = linkArr[linkArr.length - 1];
          await deleteFileFromS3(imgKey).catch((error) => {
            console.log('==Error==', error);
          });
          res.status(200).end();
        }
      });
      break;
    }
    default:
      res.statusCode = 405;
      res.end();
  }
};
