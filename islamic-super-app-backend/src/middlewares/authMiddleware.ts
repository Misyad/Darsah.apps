import { Request, Response, NextFunction } from 'express';

// Definisi interface khusus agar ts bisa menerima userId dan isPremium di Request object
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    isPremium: boolean;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Simulasi mengecek Auth Token dari header (Bearer Token)
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: Harap sediakan token' });
  }

  // Jika Bearer dummy premium
  if (authHeader === 'Bearer token-premium-123') {
    req.user = { userId: 1, isPremium: true };
    return next();
  }

  // Jika Bearer dummy gratis
  if (authHeader === 'Bearer token-free-123') {
    req.user = { userId: 2, isPremium: false };
    return next();
  }
  
  return res.status(403).json({ error: 'Forbidden: Token tidak valid' });
};

export const requirePremium = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isPremium) {
    return next();
  }
  return res.status(403).json({ error: 'Akses Ditolak: Fitur ini khusus pengguna Premium' });
};
