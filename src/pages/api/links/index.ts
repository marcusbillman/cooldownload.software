import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';
import Randomstring from 'randomstring';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Only POST is allowed' });

  const result = await prisma.link.create({
    data: {
      ...req.body,
      slug: Randomstring.generate(8),
    },
  });

  res.status(201).json(result);
};
