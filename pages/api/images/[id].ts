import { NextApiRequest, NextApiResponse } from 'next';

import { getFileStream } from '../../../helpers/s3';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (!Array.isArray(id)) {
      const readStream = getFileStream(id);
      readStream?.pipe(res);
    }
  } else {
    res.statusCode = 405;
    res.end();
  }
};
