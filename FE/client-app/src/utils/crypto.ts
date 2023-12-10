import { OrderParams } from 'Models/OrderParams';
import axios from 'axios';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

// Load giá trị từ tệp .env
dotenv.config();

const key: any = process.env.PAYOS_CHECKSUM_KEY || `c52401561779ca9ebb6f26d84cddf7042fd43440d9421c7055318bf319fe18e0`;
const clientId = process.env.PAYOS_CLIENT_ID || `0a4616bd-19bc-49f1-8b0a-a6fea36a9ce3`;
const apiKey = process.env.PAYOS_API_KEY || `eab5062b-d1b1-4c77-8997-ef7711bd9c30`;

if (!key || !clientId || !apiKey) {
    console.error('One or more required environment variables are not defined in the .env file.');
}

export function generateHmacSha256(orderParams: any): string {
    const keyBuffer = Buffer.from(key, 'utf-8');
    const sortedParams = Object.keys(orderParams)
        .sort()
        .map((key) => `${key}=${orderParams[key]}`)
        .join('&');
    const messageBuffer = Buffer.from(sortedParams, 'utf-8');
    const hmac = crypto.createHmac('sha256', keyBuffer);
    const signatureBuffer = hmac.update(messageBuffer).digest();
    const signatureHex = signatureBuffer.toString('hex');
    return signatureHex;
}


export async function sendOrder(orderParams: OrderParams) {
    orderParams.signature = generateHmacSha256(orderParams);
    orderParams.buyerPhone = "0382033517";
    try {
        const response = await axios.post('https://api-merchant.payos.vn/v2/payment-requests', orderParams, {
            headers: {
                'x-client-id': clientId,
                'x-api-key': apiKey,
            },
        });
        console.log('Order request successful. Response:', response.data);
        return response;
    } catch (error: any) {
        console.error('Error sending order request:', error.message);
    }
}

export async function checkPayment(id: string) {
    try {
        const response = await axios.get(`https://api-merchant.payos.vn/v2/payment-requests/${id}`, {
            headers: {
                'x-client-id': clientId,
                'x-api-key': apiKey,
            },
        });
        return response;
    } catch (error: any) {
        console.error('Error sending order request:', error.message);
    }
}

