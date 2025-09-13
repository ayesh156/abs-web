'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogManagement from '@/components/admin/BlogManagement';

export default function AdminBlogPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <BlogManagement />
      </AdminLayout>
    </ProtectedRoute>
  );
}