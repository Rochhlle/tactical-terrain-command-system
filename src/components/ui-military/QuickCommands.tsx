
import React, { useState } from 'react';
import { Terminal, Send, AlertTriangle, CheckSquare, ChevronDown, ChevronUp } from 'lucide-react';
import MilitaryButton from './MilitaryButton';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CommandOption {
  id: string;
  name: string;
  description: string;
  isAlert?: boolean;
}

const QuickCommands: React.FC<{ className?: string }> = ({ className }) => {
  const [selectedCommandId, setSelectedCommandId] = useState('refresh');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [commandRunning, setCommandRunning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const commandOptions: CommandOption[] = [
    { id: 'refresh', name: 'Refresh Tactical View', description: 'Reload current terrain data' },
    { id: 'reassign', name: 'Reassign Orders', description: 'Change unit orders and behaviors' },
    { id: 'protocol', name: 'Force Protocol', description: 'Override standard operation procedures', isAlert: true },
    { id: 'signal', name: 'Boost Signal', description: 'Enhance team communication in low-signal areas' },
  ];
  
  const selectedCommand = commandOptions.find(cmd => cmd.id === selectedCommandId);
  
  const handleSelectCommand = (commandId: string) => {
    setSelectedCommandId(commandId);
  };
  
  const executeCommand = () => {
    if (commandRunning) return;
    
    setCommandRunning(true);
    setCommandHistory([...commandHistory, selectedCommand?.name || '']);
    
    // Simulate command execution time
    setTimeout(() => {
      setCommandRunning(false);
    }, 1500);
  };
  
  return (
    <div className={cn("military-panel", className)}>
      <h3 className="military-section-header flex justify-between items-center">
        <div className="flex items-center">
          <Terminal size={18} className="mr-2 text-military-info" />
          Field Command Console
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="text-gray-400 hover:text-gray-300"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">{isExpanded ? 'Collapse' : 'Expand'} command console</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      
      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {commandOptions.map(command => (
              <TooltipProvider key={command.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className={cn(
                        "border p-3 cursor-pointer transition-all duration-200 rounded text-sm",
                        selectedCommandId === command.id 
                          ? command.isAlert
                            ? "bg-military-alert/10 border-military-alert/40"
                            : "bg-military-info/10 border-military-info/40"
                          : "bg-military-primary/80 border-gray-700 hover:border-gray-600"
                      )}
                      onClick={() => handleSelectCommand(command.id)}
                    >
                      <div className="flex items-center">
                        {command.isAlert ? (
                          <AlertTriangle size={14} className="text-military-alert mr-2" />
                        ) : (
                          <CheckSquare size={14} className="text-military-info mr-2" />
                        )}
                        {command.name}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-xs">{command.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          
          <div className="flex justify-end">
            <MilitaryButton
              variant={selectedCommand?.isAlert ? "alert" : "info"}
              glow={selectedCommand?.isAlert}
              disabled={commandRunning}
              className="flex items-center"
              onClick={executeCommand}
            >
              {commandRunning ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Executing...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send size={14} className="mr-2" />
                  Execute Command
                </span>
              )}
            </MilitaryButton>
          </div>
          
          {commandHistory.length > 0 && (
            <div className="border border-gray-700 rounded bg-military-primary/40 p-2 mt-2">
              <div className="text-xs text-gray-400 mb-1">Command History:</div>
              <div className="space-y-1 text-xs max-h-16 overflow-y-auto">
                {commandHistory.map((cmd, index) => (
                  <div key={index} className="flex">
                    <span className="text-military-info mr-2">&gt;</span>
                    <span>{cmd}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickCommands;
