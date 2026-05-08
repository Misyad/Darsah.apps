import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
// Asumsikan import PrismaClient bila terkoneksi
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

export const generateDonation = async (req: AuthenticatedRequest, res: Response) => {
  const { amount, method } = req.body;
  const userId = req.user?.userId;

  if (!amount || !method) {
    return res.status(400).json({ error: 'amount dan method (e.g., QRIS, VA) wajib diisi' });
  }

  // Potong biaya operasional 5% (Monetisasi Etis)
  const opFee = amount * 0.05;
  const netZis = amount - opFee;

  // Simulasi Simpan ke Database
  /*
  const log = await prisma.donationLog.create({
    data: {
      userId: userId!,
      amount,
      paymentMethod: method,
      status: 'PENDING'
    }
  });
  */
  
  // Simulasi Respon dari Payment Gateway (Midtrans dsb)
  const simulatedPaymentResponse = {
    transaction_id: `ZIS-${Date.now()}`,
    status: 'PENDING',
    payment_method: method,
    gross_amount: amount,
    operational_fee: opFee,
    net_donation: netZis,
    action: method === 'QRIS' ? 'https://example.com/qris-image.png' : '88200300100' // VA
  };

  return res.json({ 
    message: 'Transaksi berhasil diinisiasi',
    data: simulatedPaymentResponse
  });
};

export const handleWebhook = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { transaction_id, status } = req.body;

  // Simulasi menerima callback dari server pihak ketiga (Payment Gateway)
  if (status === 'settlement' || status === 'SUCCESS') {
    // Simulasi Update Database
    /*
    await prisma.donationLog.updateMany({
      where: { id: transaction_id }, // asumsikan ID format
      data: { status: 'SUCCESS' }
    });
    */
    console.log(`Payment Webhook: Transaksi ${transaction_id} LUNAS.`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return res.json({ message: 'Webhook received & DB updated' });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return res.json({ message: 'Status ignoring' });
};
