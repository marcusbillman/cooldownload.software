import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';
import { unstable_getServerSession as getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let slug = req.query.slug;
  if (Array.isArray(slug)) slug = slug.join('/');

  if (req.method === 'GET') {
    const result = await prisma.link.findFirst({
      where: { slug },
    });
    return res.status(200).json(JSON.parse(JSON.stringify(result)));
  }

  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: 'Not authenticated' });

    const linkToDelete = await prisma.link.findFirst({
      where: { slug },
    });
    if (session.user?.email !== linkToDelete?.userEmail)
      return res.status(401).json({ error: 'Not authenticated' });

    const deletedLink = await prisma.link.delete({
      where: { slug },
    });

    return res.status(200).json(JSON.parse(JSON.stringify(deletedLink)));
  }

  res.status(405).json({ error: 'Method not allowed' });
};
