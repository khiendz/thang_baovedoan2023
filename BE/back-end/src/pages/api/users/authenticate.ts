const jwt = require('jsonwebtoken');
import getConfig from 'next/config';

import { apiHandler } from '../../../helpers/api';
import { PrismaClient } from '@prisma/client';

const { serverRuntimeConfig } = getConfig();

const prisma = new PrismaClient();

export default apiHandler(handler);

function handler(req: any, res: any) {
    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function authenticate() {
        const { username, password } = req.body;
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
    
        const token = jwt.sign({ sub: user.AccountId }, serverRuntimeConfig.secret, { expiresIn: '7d' });
    
        return res.status(200).json({
            ...user,
            token
        });
    }
}
