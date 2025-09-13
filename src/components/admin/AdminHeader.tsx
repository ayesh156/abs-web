'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  Menu, 
  Search, 
  Bell, 
  Settings,
  User,
  LogOut,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsSigningOut(false);
      setShowUserMenu(false);
    }
  };

  const notifications = [
    { id: 1, title: 'New blog post published', time: '5 minutes ago', unread: true },
    { id: 2, title: 'User registration pending', time: '1 hour ago', unread: true },
    { id: 3, title: 'System backup completed', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search Bar */}
          <div className="hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Search Button (Mobile) */}
          <button className="sm:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <Search className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-white font-medium">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                        notification.unread ? 'bg-accent-green/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-accent-green rounded-full mt-2 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm">{notification.title}</p>
                          <p className="text-white/60 text-xs mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-white/10">
                  <button className="w-full text-center text-accent-green text-sm hover:text-accent-green/80 transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="h-5 w-5" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-accent-green to-accent-green/70 rounded-full flex items-center justify-center">
                <span className="text-black font-medium text-sm">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 border-b border-white/10">
                  <p className="text-white font-medium">{user?.name || 'Admin'}</p>
                  <p className="text-white/60 text-sm">{user?.email}</p>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                    <HelpCircle className="h-4 w-4" />
                    Help & Support
                  </button>
                  <div className="border-t border-white/10 my-2"></div>
                  <button 
                    onClick={handleLogout}
                    disabled={isSigningOut}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSigningOut ? (
                      <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4" />
                    )}
                    {isSigningOut ? 'Signing out...' : 'Sign out'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
}
