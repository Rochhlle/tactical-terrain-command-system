
import React from 'react';
import { Info, Shield, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("px-5 py-4 text-xs text-gray-400 text-center border-t border-gray-700 flex flex-col items-center bg-military-primary/70 shadow-md", className)}>
      <div className="flex items-center mb-2">
        <img  
          alt="KAAL Command Nexus Logo" 
          className="h-10 w-10 mr-3 opacity-80" 
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-block px-4 py-1.5 border border-military-info/20 rounded-sm bg-military-primary/70 font-jetbrains">
                KAAL Command Nexus v1.0 – DRDO/ARMY Prototype UI
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">iDEX Submission Build – Terrain Simulation Core</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex justify-center items-center mt-1 space-x-6">
        <span className="text-military-danger flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-military-danger mr-1"></span>
          Emergency Protocol Ready
        </span>
        <span className="text-military-info/70 flex items-center">
          <Shield size={10} className="mr-1" />
          Tactical System Active
        </span>
        <span className="text-gray-500 flex items-center">
          <Database size={10} className="mr-1" />
          <span className="hidden md:inline">Confidential Training Tool</span>
          <span className="inline md:hidden">Confidential</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
