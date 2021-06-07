import { NextApiRequest, NextApiResponse } from 'next';

const webPush = require('web-push');

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { subscription, message } = req.body;

    webPush
      .sendNotification(subscription, JSON.stringify({ title: 'LocNot', message }))
      .then((response: any) => {
        res.writeHead(response.statusCode, response.headers).end(response.body);
      })
      .catch((err: any) => {
        if ('statusCode' in err) {
          res.writeHead(err.statusCode, err.headers).end(err.body);
        } else {
          console.error(err);
          res.statusCode = 500;
          res.end();
        }
      });
  } else {
    res.statusCode = 405;
    res.end();
  }
};
