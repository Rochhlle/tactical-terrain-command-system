
import React from 'react';
import { Activity, Bell, Shield, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatusBarProps {
  systemStatus?: 'green' | 'yellow' | 'red';
  missionPhase?: string;
  alerts?: number;
  className?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  systemStatus = 'green',
  missionPhase = 'Planning',
  alerts = 0,
  className 
}) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
  const dateString = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const getStatusClass = () => {
    switch (systemStatus) {
      case 'green': return 'text-military-success';
      case 'yellow': return 'text-military-warning';
      case 'red': return 'text-military-danger';
      default: return 'text-military-success';
    }
  };
  
  const getStatusLabel = () => {
    switch (systemStatus) {
      case 'green': return 'OPERATIONAL';
      case 'yellow': return 'DEGRADED';
      case 'red': return 'CRITICAL';
      default: return 'OPERATIONAL';
    }
  };

  return (
    <div className={cn(
      "bg-military-primary/90 border-b border-gray-700 px-4 py-2 flex justify-between items-center shadow-md",
      className
    )}>
      <div className="flex items-center space-x-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Activity size={16} className={cn("mr-2", getStatusClass())} />
                <span className={cn("font-medium", getStatusClass())}>
                  System Status: {getStatusLabel()}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">All systems {systemStatus === 'green' ? 'nominal' : systemStatus === 'yellow' ? 'with warnings' : 'in alert state'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Shield size={16} className="mr-2 text-military-info" />
                <span>Mission Phase: <span className="font-medium text-military-info">{missionPhase}</span></span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Current operation stage</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center space-x-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">{dateString}</span>
                  <span className="font-medium">{timeString} HRS</span>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Mission clock</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Bell size={16} className={cn(alerts > 0 ? "text-military-alert" : "text-gray-400")} />
                {alerts > 0 && (
                  <span className="absolute -top-1 -right-1 bg-military-alert text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {alerts}
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">{alerts > 0 ? `${alerts} system alerts` : 'No active alerts'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default StatusBar;
