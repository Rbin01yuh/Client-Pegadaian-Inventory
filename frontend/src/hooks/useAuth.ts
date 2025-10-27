import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { useLocation, useNavigate } from 'react-router-dom';

export function useAuthGuard() {
  const { token } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isPublic = ['/login', '/register'].includes(location.pathname);
    if (!isPublic && !token) {
      navigate('/login');
    }
  }, [token, location.pathname, navigate]);
}

export function useRoleRedirect() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.role === 'admin') navigate('/dashboard', { replace: true });
    else navigate('/transactions', { replace: true });
  }, [user, navigate]);
}