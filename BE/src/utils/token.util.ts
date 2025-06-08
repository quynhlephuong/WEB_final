/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import config from 'src/config/auth.config';
import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

const jwtService = new JwtService({
  secret: process.env.JWT_SECRET,
});

export function generateToken(
  jwtService: JwtService,
  payload: object,
): {
  token: string;
} {
  const token = jwtService.sign(payload, {
    secret: config.jwtSecret,
    expiresIn: config.jwtExpiration,
  });

  return { token };
}

export function embedTokens(res: Response, token: string) {
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 7 * 24 * 3600000, // 30 days
  });
}

export const getTokenFromRequest = (req: Request): string => {
  const cookies = (req as Request & { cookies: Record<string, string> })
    .cookies;
  const token = cookies?.accessToken;
  if (!token) {
    throw new UnauthorizedException('HÃY ĐĂNG NHẬP LẠI ĐỂ TIẾP TỤC SỬ DỤNG');
  }
  return token;
};

export const getPayloadFromToken = async (
  token: string,
): Promise<JwtPayload> => {
  try {
    return await jwtService.verifyAsync<JwtPayload>(token);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedException('HẾT HẠN, HÃY ĐĂNG NHẬP LẠI');
    }
    throw new UnauthorizedException('HÃY ĐĂNG NHẬP LẠI ĐỂ TIẾP TỤC SỬ DỤNG');
  }
};

export const getPayloadFromRequest = async (
  req: Request,
): Promise<JwtPayload> => {
  return await getPayloadFromToken(getTokenFromRequest(req));
};

export const getUserIdAndRoleFromPayload = async (
  req: Request,
): Promise<{ userId: string; role: string }> => {
  try {
    const payload = await getPayloadFromRequest(req);
    return { userId: payload.sub ?? '', role: payload.role ?? '' };
  } catch (error) {
    console.error('Error getting user ID and role from payload:', error);
    return { userId: '', role: '' };
  }
};
