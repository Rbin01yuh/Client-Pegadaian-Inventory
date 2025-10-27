import jwt from 'jsonwebtoken';
import db from '../config/database.js';

export function signToken(payload, expiresIn = process.env.JWT_EXPIRES_IN || '1d') {
  return jwt.sign(payload, process.env.JWT_SECRET || 'supersecretjwtkey', { expiresIn });
}

export async function verifyToken(request, h) {
  const authHeader = request.headers.authorization || '';
  const [, token] = authHeader.split(' ');
  if (!token) {
    return h.response({ status: 'error', message: 'Unauthorized' }).code(401).takeover();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey');
    request.auth = { credentials: decoded };
    return h.continue;
  } catch (err) {
    return h.response({ status: 'error', message: 'Invalid token' }).code(401).takeover();
  }
}

export function authorizeRoles(roles = []) {
  return (request, h) => {
    const role = request?.auth?.credentials?.role;
    if (!roles.includes(role)) {
      return h.response({ status: 'error', message: 'Forbidden' }).code(403).takeover();
    }
    return h.continue;
  };
}