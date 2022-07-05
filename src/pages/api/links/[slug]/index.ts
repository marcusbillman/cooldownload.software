import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../server/db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  if (typeof slug !== 'string')
    return res.status(400).json({ error: 'Slug should be a string' });

  const result = await prisma.link.findFirst({
    where: { slug },
  });

  res.status(200).json(JSON.parse(JSON.stringify(result)));
};
