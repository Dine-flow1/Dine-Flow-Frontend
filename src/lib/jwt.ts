import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-at-least-32-characters-long';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: unknown; // Add index signature to fix the error
}

export class JwtService {
  // Generate JWT token
  static async generateToken(payload: JwtPayload): Promise<string> {
    const secret = new TextEncoder().encode(JWT_SECRET);
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(JWT_EXPIRES_IN)
      .sign(secret);
  }

  // Verify JWT token
  static async verifyToken(token: string): Promise<JwtPayload> {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JwtPayload; // Fix the type conversion
  }

  // Decode token without verification
  static decodeToken(token: string): JwtPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }
      const payload = parts[1];
      const decoded = Buffer.from(payload, 'base64').toString('utf8');
      return JSON.parse(decoded) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}