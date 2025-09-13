'use client';

import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import QuickActions from '@/components/admin/QuickActions';
import AnalyticsChart from '@/components/admin/AnalyticsChart';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminLayout>
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-light tracking-tight text-white">
                Dashboard
              </h1>
              <p className="text-white/60 mt-2">
                Welcome back, {user?.name || user?.email}! Here&apos;s what&apos;s happening with your digital presence.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <QuickActions />
            </div>
          </div>

          {/* Stats Overview */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Analytics Chart */}
            <div className="lg:col-span-2">
              <AnalyticsChart />
            </div>
            
            {/* Recent Activity */}
            <div className="lg:col-span-1">
              <RecentActivity />
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
