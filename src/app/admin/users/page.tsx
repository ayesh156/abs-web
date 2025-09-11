'use client';

import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import UserManagement from '@/components/admin/UserManagement';

export default function UserManagementPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <UserManagement />
      </AdminLayout>
    </ProtectedRoute>
  );
}
