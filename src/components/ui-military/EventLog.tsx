
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

const EventLog: React.FC<{ className?: string }> = ({ className }) => {
  const dummyLogs: LogEntry[] = [
    { timestamp: '07:42', message: 'Shock Feedback Triggered - Sector A3', type: 'warning' },
    { timestamp: '07:45', message: 'Environmental Controls: Rain Simulation Enabled', type: 'info' },
    { timestamp: '07:47', message: 'OPFOR Unit Deployed - Grid B5', type: 'error' },
    { timestamp: '07:50', message: 'Lt. R. Iyer - Moving to Forward Ridge', type: 'success' },
    { timestamp: '07:52', message: 'Drone Recon Feed: Clear Visuals', type: 'info' },
    { timestamp: '07:55', message: 'Smart Suit Sync: All Units Connected', type: 'success' },
    { timestamp: '07:57', message: 'Weather System: Visibility Reduced', type: 'warning' },
    { timestamp: '08:00', message: 'Phase 2 Initiated: Combat Engagement', type: 'info' },
  ];

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'info': return 'text-military-info';
      case 'warning': return 'text-military-warning';
      case 'success': return 'text-military-success';
      case 'error': return 'text-military-danger';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={cn("military-panel h-[300px]", className)}>
      <h3 className="text-lg font-medium mb-4 flex items-center">
        System Event Log
        <span className="ml-2 text-xs bg-military-info/20 text-military-info px-2 py-0.5 rounded">
          LIVE
        </span>
      </h3>
      <ScrollArea className="h-[calc(300px-4rem)]">
        <div className="space-y-2">
          {dummyLogs.map((log, index) => (
            <div 
              key={index}
              className={cn(
                "p-2 border-l-2 bg-military-primary/30",
                "transition-colors duration-200 hover:bg-military-primary/50",
                getLogColor(log.type)
              )}
            >
              <div className="flex items-center">
                <span className="text-xs font-mono mr-2">[{log.timestamp}]</span>
                <span className="text-sm">{log.message}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EventLog;
