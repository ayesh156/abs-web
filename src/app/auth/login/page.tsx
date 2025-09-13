import LoginForm from '@/components/auth/LoginForm';
import AuthLayout from '@/components/auth/AuthLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Absterco Admin',
  description: 'Access your Absterco admin dashboard',
};

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Welcome back"
      subtitle="Sign in to your Absterco admin account"
    >
      <LoginForm />
    </AuthLayout>
  );
}
