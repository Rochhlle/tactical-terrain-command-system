
import React from 'react';
import { Shield, Activity, Map, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface HUDStatusBarProps {
  terrain?: string;
  mode?: string;
  className?: string;
}

const HUDStatusBar: React.FC<HUDStatusBarProps> = ({ 
  terrain = "GALWAN",
  mode = "ASSAULT",
  className 
}) => {
  return (
    <div className={cn(
      "bg-military-primary/90 border-b border-gray-700 px-4 py-2 flex items-center justify-between text-sm",
      "backdrop-blur-sm shadow-md animate-fade-in",
      className
    )}>
      <div className="flex items-center space-x-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Activity className="w-4 h-4 text-military-success mr-2" />
                <span className="text-military-success font-medium">SYSTEM ONLINE</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">All systems operational</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Map className="w-4 h-4 text-military-info mr-2" />
                <span>TERRAIN: <span className="text-military-info">{terrain}</span></span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Current tactical terrain</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-military-warning mr-2" />
                <span>SIMULATION MODE: <span className="text-military-warning">{mode}</span></span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Active simulation protocol</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-military-alert/90">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>VERSION: 0.9 ALPHA</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Development build - not for deployment</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default HUDStatusBar;
