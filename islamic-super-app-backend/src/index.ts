import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';

// Rangkaian 3 Imports
import { authMiddleware, requirePremium, AuthenticatedRequest } from './middlewares/authMiddleware';
import { generateDonation, handleWebhook } from './controllers/paymentController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

const rootPath = process.cwd();
const dataPath = path.join(rootPath, 'data');
const publicPath = path.join(rootPath, 'public');

app.use(express.static(publicPath));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// ==========================================
// RUTE RANGKAIAN 1 (Data Statis / Freemium)
// ==========================================

app.get('/api/quran', (req: Request, res: Response) => {
  res.sendFile(path.join(dataPath, 'quran.json'));
});

app.get('/api/yasin', (req: Request, res: Response) => {
  res.sendFile(path.join(dataPath, 'yasin.json'));
});

app.get('/api/duas', (req: Request, res: Response) => {
  res.sendFile(path.join(dataPath, 'daily_duas.json'));
});

app.get('/api/kanuz-prayers', (req: Request, res: Response) => {
  res.sendFile(path.join(dataPath, 'kanuz_prayers.json'));
});

// ==========================================
// RUTE RANGKAIAN 3 (Model Bisnis & Monetisasi)
// ==========================================

// 1. ZIS Gateway (Membutuhkan Auth, misal "Bearer token-free-123")
app.post('/api/donate', authMiddleware, generateDonation);

// 2. Webhook Callback dari Payment Gateway (misal Midtrans mengirim request)
app.post('/api/webhook/payment', handleWebhook);

// 3. Fitur Premium Audio (Memerlukan Auth Premium)
app.get('/api/premium/audio', authMiddleware, requirePremium, (req: AuthenticatedRequest, res: Response) => {
  res.sendFile(path.join(dataPath, 'premium_audio.json'));
});

// 4. Iklan Terkurasi / Marketplace 
app.get('/api/ads', (req: Request, res: Response) => {
  res.sendFile(path.join(dataPath, 'ads.json'));
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Islamic Super App Backend (Rangkaian 3) is running!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
