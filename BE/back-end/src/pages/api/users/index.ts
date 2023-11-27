import { apiHandler } from '../../../helpers/api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default apiHandler(handler);

function handler(req: any, res: any) {
    switch (req.method) {
        case 'GET':
            return getUsers();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getUsers() {
        // return users without passwords in the response
        const response = (await prisma.account.findMany()).map(user => {
            const { Password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        return res.status(200).json(response);
    }
}
