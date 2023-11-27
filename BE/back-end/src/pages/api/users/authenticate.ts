import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import getConfig from 'next/config';
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const { serverRuntimeConfig } = getConfig();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method == "OPTIONS") {
        res.setHeader("Allow", "POST");
        return res.status(202).json({});
    }

    if (req.method === 'POST') {
        const { username, password } = req.body;

        const result = await authenticate(username,password);

        if (!result) {
            return res.status(500).json({ error: 'Failed to create a new book' });
        }

        return res.json({ ...result });
    }
   
}

async function authenticate(username: string, password: string) {
    const account = await prisma.account.findFirst({
        where: {
          UserName: username,
          Password: password
        },include: {
            RoleAccount: true
        }
      });;

      const user = await prisma.user.findFirst({
        where: {
          AccountId: account?.AccountId,
        },
        include: {
          Account: {
            select: {
                AccountId: true,
                UserName: true,
                RoleId: true,
                Password: false,
                RoleAccount: true
            }
          },
        }
      });

    if (!user) throw 'Username or password is incorrect';

    const token = jwt.sign({ sub: user.UserId }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    return {
        data: {user,token},
        message: "Success",
        status: "200"
    };
}

export default handler;
