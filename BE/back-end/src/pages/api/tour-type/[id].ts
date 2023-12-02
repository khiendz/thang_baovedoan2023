import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler =  async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "OPTIONS") {
    res.setHeader("Allow", "POST");
    return res.status(202).json({});
  }
  
  if (req.method === 'GET') {
    const tourTypeId = parseInt(req.query.id as string);

    if (!tourTypeId) {
      return res.status(400).json({ error: 'Invalid tour ID' });
    }

    try {
      const tourType = await prisma.tourType.findUnique({
        where: {
          TourTypeId: tourTypeId,
        },
        include: {
          Promotion: true
        }
      });

      if (tourType) {
        res.status(200).json(tourType);
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