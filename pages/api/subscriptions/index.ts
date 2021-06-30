import { NextApiRequest, NextApiResponse } from 'next';
import uniqid from 'uniqid';

import { docClient, truncateTable } from '../../../helpers/aws-api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      break;
    }
    case 'POST': {
      const id = uniqid();
      const { subscription } = JSON.parse(req.body);
      const sub = { id, ...subscription };
      try {
        const params = {
          TableName: 'subscriptions',
          Item: sub
        };

        docClient.put(params, (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.end();
          } else {
            res.status(200).end();
          }
        });
      } catch (err) {
        console.log('==ERROR==', err);
        res.statusCode = 500;
        res.end();
      }
      break;
    }
    case 'DELETE': {
      try {
        await truncateTable('subscriptions');
        res.status(200).end();
      } catch (error) {
        console.log('==Error==', error);
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
