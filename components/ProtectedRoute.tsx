'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('student' | 'company' | 'admin')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/signin');
      } else if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
        // Redirect based on role
        if (userProfile.role === 'admin') {
          router.push('/admin');
        } else if (userProfile.role === 'company') {
          router.push('/company');
        } else {
          router.push('/dashboard');
        }
      }
    }
  }, [user, userProfile, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-red-600" size={48} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
    return null;
  }

  return <>{children}</>;
}
