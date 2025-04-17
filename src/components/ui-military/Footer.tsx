
import React from 'react';
import { cn } from '@/lib/utils';

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("px-4 py-2 text-xs text-military-text/70 text-center border-t border-military-info/20 flex flex-col items-center", className)}>
      <img 
        src="/lovable-uploads/e8bf466e-32fa-4383-8a40-e80668c31ae9.png" 
        alt="KAAL Command Nexus Logo" 
        className="h-10 w-10 mb-2 opacity-70" 
      />
      <div className="inline-block px-3 py-1 border border-military-info/20 rounded-sm bg-military-primary/30">
        Project KAAL Command Tablet – v1.0 – Confidential Training Tool (iDEX Submission Build)
      </div>
      <div className="flex justify-center items-center mt-2 space-x-4">
        <span className="text-military-danger flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-military-danger mr-1"></span>
          Safe Mode Available
        </span>
      </div>
    </div>
  );
};

export default Footer;
