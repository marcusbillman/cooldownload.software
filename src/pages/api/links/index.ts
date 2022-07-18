import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';
import Randomstring from 'randomstring';
import generateReallySketchySlug from 'src/util/generateReallySketchySlug';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Only POST is allowed' });

  const slug =
    req.body.slugType === 'really-sketchy'
      ? generateReallySketchySlug()
      : Randomstring.generate(8);

  const result = await prisma.link.create({
    data: {
      targetUrl: req.body.targetUrl,
      challenge: req.body.challenge,
      theme: req.body.theme,
      userEmail: req.body.userEmail,
      slug,
    },
  });

  res.status(201).json(result);
};
