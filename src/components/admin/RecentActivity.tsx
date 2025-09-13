'use client';

import { Card } from '@/components/ui/Card';
import { 
  Activity,
  FileText,
  MessageCircle,
  Eye,
  UserPlus,
  Mail,
  Clock,
  ExternalLink
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'blog' | 'user' | 'comment' | 'view' | 'newsletter';
  title: string;
  description: string;
  time: string;
  user: {
    name: string;
    avatar?: string;
  };
  link?: string;
}

export default function RecentActivity() {
  // Mock data - in a real app, this would come from an API
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'blog',
      title: 'New blog post published',
      description: 'Advanced React Patterns for 2024',
      time: '5 minutes ago',
      user: { name: 'Sarah Johnson' },
      link: '/admin/blog/1',
    },
    {
      id: '2',
      type: 'user',
      title: 'New user registered',
      description: 'john.doe@example.com joined the platform',
      time: '12 minutes ago',
      user: { name: 'John Doe' },
      link: '/admin/users/john-doe',
    },
    {
      id: '3',
      type: 'comment',
      title: 'New comment received',
      description: 'Great article! Looking forward to more...',
      time: '1 hour ago',
      user: { name: 'Mike Chen' },
      link: '/admin/blog/comments',
    },
    {
      id: '4',
      type: 'newsletter',
      title: 'Newsletter sent',
      description: 'Monthly Update - December 2024 sent to 1,234 subscribers',
      time: '2 hours ago',
      user: { name: 'Marketing Team' },
      link: '/admin/newsletter/campaigns',
    },
    {
      id: '5',
      type: 'view',
      title: 'High traffic spike',
      description: 'Blog post "Next.js 15 Features" reached 10k views',
      time: '3 hours ago',
      user: { name: 'Analytics System' },
      link: '/admin/analytics',
    },
    {
      id: '6',
      type: 'blog',
      title: 'Blog post updated',
      description: 'TypeScript Best Practices updated with new examples',
      time: '5 hours ago',
      user: { name: 'Alex Thompson' },
      link: '/admin/blog/2',
    },
  ];

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'blog':
        return FileText;
      case 'user':
        return UserPlus;
      case 'comment':
        return MessageCircle;
      case 'view':
        return Eye;
      case 'newsletter':
        return Mail;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'blog':
        return 'text-blue-400';
      case 'user':
        return 'text-emerald-400';
      case 'comment':
        return 'text-purple-400';
      case 'view':
        return 'text-orange-400';
      case 'newsletter':
        return 'text-pink-400';
      default:
        return 'text-white/60';
    }
  };

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent-green/20 text-accent-green">
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-white font-medium">Recent Activity</h3>
          <p className="text-white/60 text-sm">Latest updates from your dashboard</p>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity) => {
          const IconComponent = getActivityIcon(activity.type);
          const iconColor = getActivityColor(activity.type);

          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200 group cursor-pointer"
              onClick={() => activity.link && (window.location.href = activity.link)}
            >
              {/* Icon */}
              <div className={`p-2 rounded-lg bg-white/10 ${iconColor} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <IconComponent className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium group-hover:text-white/90 transition-colors">
                      {activity.title}
                    </p>
                    <p className="text-white/60 text-xs mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-3 w-3 text-white/40" />
                      <span className="text-white/50 text-xs">{activity.time}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white/50 text-xs">{activity.user.name}</span>
                    </div>
                  </div>

                  {activity.link && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4 text-white/40" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <button className="w-full text-center text-accent-green text-sm hover:text-accent-green/80 transition-colors font-medium">
          View all activity
        </button>
      </div>
    </Card>
  );
}
