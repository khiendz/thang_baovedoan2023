import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler =  async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const tourId = parseInt(req.query.id as string);

    if (!tourId) {
      return res.status(400).json({ error: 'Invalid tour ID' });
    }

    try {
      const tour = await prisma.tour.findUnique({
        where: {
          TourID: tourId,
        },
      });

      if (tour) {
        res.status(200).json(tour);
      } else {
        res.status(404).json({ error: 'Tour not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default apiHandler(handler);