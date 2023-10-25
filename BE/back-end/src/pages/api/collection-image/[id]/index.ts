import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler =  async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const TourTypeId = parseInt(req.query.id as string);

    if (TourTypeId === undefined || TourTypeId === undefined) {
      return res.status(400).json({ error: 'Invalid tour ID' });
    }

    try {
      const tourType = await prisma.collectImg.findMany({
        where: {
          TourTypeId: TourTypeId,
        },
      });

      if (tourType) {
        res.status(200).json(tourType);
      } else {
        res.status(404).json({ error: 'CollectionImg not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;