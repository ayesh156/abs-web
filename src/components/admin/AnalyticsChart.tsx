'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Filter,
  ChevronDown
} from 'lucide-react';

type TimeRange = '7d' | '30d' | '90d' | '1y';

interface ChartDataPoint {
  date: string;
  visitors: number;
  pageViews: number;
}

export default function AnalyticsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Mock data - in a real app, this would come from an API
  const chartData: ChartDataPoint[] = [
    { date: 'Jan 1', visitors: 420, pageViews: 1240 },
    { date: 'Jan 2', visitors: 380, pageViews: 1180 },
    { date: 'Jan 3', visitors: 520, pageViews: 1560 },
    { date: 'Jan 4', visitors: 640, pageViews: 1920 },
    { date: 'Jan 5', visitors: 580, pageViews: 1740 },
    { date: 'Jan 6', visitors: 720, pageViews: 2160 },
    { date: 'Jan 7', visitors: 680, pageViews: 2040 },
    { date: 'Jan 8', visitors: 560, pageViews: 1680 },
    { date: 'Jan 9', visitors: 480, pageViews: 1440 },
    { date: 'Jan 10', visitors: 620, pageViews: 1860 },
    { date: 'Jan 11', visitors: 740, pageViews: 2220 },
    { date: 'Jan 12', visitors: 820, pageViews: 2460 },
  ];

  const maxVisitors = Math.max(...chartData.map(d => d.visitors));
  const maxPageViews = Math.max(...chartData.map(d => d.pageViews));

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
  ];

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent-green/20 text-accent-green">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-white font-medium">Analytics Overview</h3>
            <p className="text-white/60 text-sm">Traffic and engagement metrics</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm"
            >
              <Calendar className="h-4 w-4" />
              {timeRangeOptions.find(opt => opt.value === timeRange)?.label}
              <ChevronDown className="h-4 w-4" />
            </button>

            {showTimeDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl overflow-hidden z-10">
                {timeRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTimeRange(option.value as TimeRange);
                      setShowTimeDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      timeRange === option.value
                        ? 'bg-accent-green/20 text-accent-green'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-green"></div>
          <span className="text-white/70 text-sm">Visitors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/40"></div>
          <span className="text-white/70 text-sm">Page Views</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between gap-2">
          {chartData.map((dataPoint, index) => {
            const visitorHeight = (dataPoint.visitors / maxVisitors) * 100;
            const pageViewHeight = (dataPoint.pageViews / maxPageViews) * 100;

            return (
              <div key={index} className="flex-1 flex items-end gap-1 group">
                {/* Visitors Bar */}
                <div
                  className="flex-1 bg-gradient-to-t from-accent-green to-accent-green/70 rounded-t-sm transition-all duration-300 hover:from-accent-green hover:to-accent-green relative group-hover:scale-105"
                  style={{ height: `${visitorHeight}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {dataPoint.visitors} visitors
                  </div>
                </div>

                {/* Page Views Bar */}
                <div
                  className="flex-1 bg-gradient-to-t from-white/40 to-white/20 rounded-t-sm transition-all duration-300 hover:from-white/50 hover:to-white/30 relative group-hover:scale-105"
                  style={{ height: `${pageViewHeight}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {dataPoint.pageViews} views
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-white/50 text-xs">
          {chartData.map((dataPoint, index) => (
            <span key={index} className="flex-1 text-center">
              {index % 2 === 0 ? dataPoint.date : ''}
            </span>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center gap-2 text-emerald-400">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm">+12.5% increase</span>
        </div>
        <div className="text-white/60 text-sm">
          Compared to previous period
        </div>
      </div>

      {/* Backdrop for dropdown */}
      {showTimeDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowTimeDropdown(false)}
        />
      )}
    </Card>
  );
}
