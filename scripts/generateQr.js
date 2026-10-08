import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetUrl = 'https://lumingya.github.io/seven-segment-display/';
const outPng = path.resolve(__dirname, '../qrcode.png');

async function main() {
  await QRCode.toFile(outPng, targetUrl, {
    width: 400,
    margin: 2,
    color: {
      dark: '#111827',
      light: '#FFFFFF'
    },
    errorCorrectionLevel: 'H'
  });
  console.log('二维码已成功生成：' + outPng);
}

main().catch(console.error);
