import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

// Load giá trị từ tệp .env
dotenv.config();

const key: any = process.env.PAYOS_CHECKSUM_KEY || 0;

if (!key) {
    console.error('PAYOS_CHECKSUM_KEY is not defined in the .env file.');
    process.exit(1);
}

interface OrderParams {
    orderCode: number;
    amount: number;
    description: string;
    cancelUrl: string;
    returnUrl: string;
    signature?: string; // Chữ ký có thể được thêm sau
}

function generateHmacSha256(orderParams: OrderParams): string {
    // Chuyển đổi key và message sang dạng Buffer nếu chúng không phải là Buffer
    const keyBuffer = Buffer.from(key, 'utf-8');
    const message = JSON.stringify(orderParams);
    const messageBuffer = Buffer.from(message, 'utf-8');

    // Sử dụng HMAC-SHA256 để tạo chữ ký
    const hmac = crypto.createHmac('sha256', keyBuffer);
    const signatureBuffer = hmac.update(messageBuffer).digest();

    // Chuyển đổi chữ ký sang dạng hex
    const signatureHex = signatureBuffer.toString('hex');

    return signatureHex;
}

// Thử nghiệm
const orderParams: OrderParams = {
    orderCode: 123,
    amount: 56000000,
    description: 'VQRIO123',
    cancelUrl: 'https://your-cancel-url.com',
    returnUrl: 'https://your-success-url.com',
};

// Thêm chữ ký vào orderParams
orderParams.signature = generateHmacSha256(orderParams);

console.log('Order Parameters:', orderParams);
