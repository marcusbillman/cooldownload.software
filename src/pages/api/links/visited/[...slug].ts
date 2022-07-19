import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../server/db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT')
    return res.status(405).json({ error: 'Only PUT is allowed' });

  let slug = req.query.slug;
  if (Array.isArray(slug)) slug = slug.join('/');

  const result = await prisma.link.update({
    where: { slug },
    data: { visitedCount: { increment: 1 } },
  });

  res.status(200).json(JSON.parse(JSON.stringify(result)));
};
