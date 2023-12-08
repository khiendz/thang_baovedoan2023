import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { apiHandler } from 'helpers/api';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "OPTIONS") {
    res.setHeader("Allow", "POST");
    return res.status(202).json({});
  }

  if (req.method === 'GET') {
    try {
      const id = parseInt(req.query.id as string);
      const tours = await prisma.tourType.findMany({
        orderBy: {
          OrderSlot: 'desc',
        },
        take: 3,
        where: {
          IsLocal: id || 0
        }
      });

      if (tours.length > 0) {
        res.status(200).json(tours);
      } else {
        res.status(404).json({ error: 'No tours found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default apiHandler(handler, ["GET"]);
