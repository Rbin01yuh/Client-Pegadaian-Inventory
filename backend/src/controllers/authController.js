import bcrypt from 'bcrypt';
import { findByEmail, createUser } from '../models/users.js';
import { success, fail } from '../utils/response.js';
import { signToken } from '../utils/auth.js';

export async function register(request, h) {
  try {
    const { name, email, password, role } = request.payload;
    const exists = await findByEmail(email);
    if (exists) {
      return h.response({ status: 'error', message: 'Email already exists' }).code(400);
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hash, role });
    const token = signToken({ id: user.id, email: user.email ?? email, role: user.role, name: user.name ?? name });
    const res = success({ token, user: { id: user.id, email: user.email ?? email, role: user.role, name: user.name ?? name } }, 'Account created', 201);
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}

export async function login(request, h) {
  try {
    const { email, password } = request.payload;
    const user = await findByEmail(email);
    if (!user) {
      return h.response({ status: 'error', message: 'Invalid credentials' }).code(401);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return h.response({ status: 'error', message: 'Invalid credentials' }).code(401);
    }
    const token = signToken({ id: user.id, email: user.email ?? email, role: user.role, name: user.name });
    const res = success({ token, user: { id: user.id, email: user.email ?? email, role: user.role, name: user.name } }, 'Login success');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}