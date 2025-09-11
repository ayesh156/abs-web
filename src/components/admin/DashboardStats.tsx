'use client';

import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  Eye,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  trend: 'up' | 'down';
}

function StatCard({ title, value, change, changeLabel, icon: Icon, trend }: StatCardProps) {
  const isPositive = trend === 'up';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const ArrowIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/[0.08] transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent-green/20 text-accent-green group-hover:bg-accent-green/30 transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-white/90 font-light">{title}</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-3xl font-light tracking-tight text-white">
              {value}
            </p>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                isPositive 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                <TrendIcon className="h-3 w-3" />
                <span>{Math.abs(change)}%</span>
              </div>
              <span className="text-white/60 text-sm">{changeLabel}</span>
            </div>
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowIcon className={`h-5 w-5 ${
            isPositive ? 'text-emerald-400' : 'text-red-400'
          }`} />
        </div>
      </div>
    </Card>
  );
}

export default function DashboardStats() {
  const stats = [
    {
      title: 'Total Visitors',
      value: '12,543',
      change: 12.5,
      changeLabel: 'vs last month',
      icon: Users,
      trend: 'up' as const,
    },
    {
      title: 'Blog Posts',
      value: '48',
      change: 8.2,
      changeLabel: 'vs last month',
      icon: FileText,
      trend: 'up' as const,
    },
    {
      title: 'Page Views',
      value: '45,291',
      change: 15.3,
      changeLabel: 'vs last month',
      icon: Eye,
      trend: 'up' as const,
    },
    {
      title: 'Engagement',
      value: '3.4m',
      change: 4.1,
      changeLabel: 'vs last month',
      icon: MessageCircle,
      trend: 'down' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
