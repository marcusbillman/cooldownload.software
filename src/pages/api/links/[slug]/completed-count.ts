import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../server/db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ error: 'Only PUT is allowed' });

  const { slug } = req.query;
  if (typeof slug !== 'string')
    return res.status(400).json({ error: 'Slug should be a string' });

  const result = await prisma.link.update({
    where: { slug },
    data: { completedCount: { increment: 1 } },
  });

  res.status(200).json(JSON.parse(JSON.stringify(result)));
};
