'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { BRAND } from '@/constants/brand';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart3,
  Mail,
  Briefcase,
  MessageSquare,
  Image as ImageIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Media', href: '/admin/media', icon: ImageIcon },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    try {
      // Call the logout API endpoint
      await fetch('/api/auth/logout', { method: 'POST' });
      // Redirect to login page
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback redirect
      window.location.href = '/admin/login';
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-black border-r border-white/10 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-72'
      } hidden lg:block`}>
        <div className="flex h-full flex-col">
          {/* Logo Area */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
            {!collapsed && (
              <Link href="/">
                <Image
                  src="/images/logo-lg.png"
                  alt={BRAND.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                             (item.href !== '/admin' && pathname.startsWith(item.href + '/')) ||
                             (item.href === '/admin' && pathname === '/admin');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-green/20 to-accent-green/10 text-accent-green border-l-4 border-accent-green shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent hover:border-white/10'
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className={`h-5 w-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-accent-green' : 'text-white/60 group-hover:text-white/80'
                  }`} />
                  {!collapsed && (
                    <>
                      <span className="ml-3 truncate">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 bg-accent-green rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Area */}
          <div className="border-t border-white/10 p-4">
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
              {!collapsed && (
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent-green to-accent-green/70 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-black font-semibold text-sm">A</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">Admin</p>
                    <p className="text-xs text-white/60 truncate">admin@absterco.com</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleSignOut}
                className={`p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 ${
                  collapsed ? 'w-10 h-10' : ''
                }`}
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-black border-r border-white/10 transform transition-transform duration-300 lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
            <Link href="/">
              <Image
                src="/images/logo-lg.png"
                alt={BRAND.name}
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                             (item.href !== '/admin' && pathname.startsWith(item.href + '/')) ||
                             (item.href === '/admin' && pathname === '/admin');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-green/20 to-accent-green/10 text-accent-green border-l-4 border-accent-green shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent hover:border-white/10'
                  }`}
                >
                  <item.icon className={`h-5 w-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-accent-green' : 'text-white/60 group-hover:text-white/80'
                  }`} />
                  <span className="ml-3 truncate">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveIndicator"
                      className="ml-auto w-2 h-2 bg-accent-green rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Area */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-green to-accent-green/70 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-black font-semibold text-sm">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Admin</p>
                  <p className="text-xs text-white/60 truncate">admin@absterco.com</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
