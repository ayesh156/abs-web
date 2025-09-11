'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Plus,
  FileText,
  Users,
  Mail,
  Upload,
  Settings,
  ChevronDown
} from 'lucide-react';

export default function QuickActions() {
  const [showDropdown, setShowDropdown] = useState(false);

  const quickActions = [
    {
      label: 'New Blog Post',
      icon: FileText,
      href: '/admin/blog/new',
      description: 'Create a new blog article',
    },
    {
      label: 'Add User',
      icon: Users,
      href: '/admin/users/new',
      description: 'Invite a new team member',
    },
    {
      label: 'Send Newsletter',
      icon: Mail,
      href: '/admin/newsletter/compose',
      description: 'Compose and send newsletter',
    },
    {
      label: 'Upload Media',
      icon: Upload,
      href: '/admin/media/upload',
      description: 'Upload images or documents',
    },
  ];

  return (
    <div className="relative">
      {/* Primary Action Button */}
      <div className="flex items-center">
        <Button
          variant="primary"
          className="rounded-r-none border-r border-accent-green/30"
          onClick={() => window.location.href = '/admin/blog/new'}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
        
        <Button
          variant="primary"
          className="rounded-l-none px-3"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl overflow-hidden z-50">
          <div className="p-2">
            <div className="px-3 py-2 text-white/60 text-xs font-medium uppercase tracking-wide">
              Quick Actions
            </div>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  window.location.href = action.href;
                  setShowDropdown(false);
                }}
                className="w-full flex items-start gap-3 px-3 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 group"
              >
                <div className="p-2 rounded-lg bg-accent-green/20 text-accent-green group-hover:bg-accent-green/30 transition-colors flex-shrink-0">
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-white group-hover:text-white transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-white/50 group-hover:text-white/60 transition-colors mt-1">
                    {action.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="border-t border-white/10 p-2">
            <button
              onClick={() => {
                window.location.href = '/admin/settings';
                setShowDropdown(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
