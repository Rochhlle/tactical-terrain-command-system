
import React from 'react';
import { Play, Clock, CheckCircle, Circle } from 'lucide-react';
import MilitaryButton from './MilitaryButton';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type PhaseStatus = 'complete' | 'current' | 'upcoming';

interface Phase {
  id: string;
  name: string;
  duration: string;
  status: PhaseStatus;
  progress: number; // 0-100
}

const MissionTimeline: React.FC<{ className?: string }> = ({ className }) => {
  const [phases, setPhases] = React.useState<Phase[]>([
    { id: 'phase1', name: 'Insertion', duration: '15:00', status: 'complete', progress: 100 },
    { id: 'phase2', name: 'Engagement', duration: '30:00', status: 'current', progress: 45 },
    { id: 'phase3', name: 'Extraction', duration: '15:00', status: 'upcoming', progress: 0 }
  ]);
  
  const [loadingReplay, setLoadingReplay] = React.useState(false);
  
  const handlePhaseClick = (phaseId: string) => {
    // In a real app, this would navigate to that phase
    setPhases(phases.map(phase => 
      phase.id === phaseId 
        ? { ...phase, status: 'current' }
        : phase.status === 'current' 
          ? { ...phase, status: 'complete', progress: 100 }
          : phase
    ));
  };
  
  const getStatusIcon = (status: PhaseStatus) => {
    switch (status) {
      case 'complete':
        return <CheckCircle size={16} className="text-military-success mr-2" />;
      case 'current':
        return <Circle size={16} className="text-military-info mr-2 animate-pulse" />;
      case 'upcoming':
        return <Circle size={16} className="text-gray-500 mr-2" />;
    }
  };
  
  const handleReplay = () => {
    setLoadingReplay(true);
    setTimeout(() => {
      setLoadingReplay(false);
    }, 2500);
  };
  
  return (
    <div className={cn("military-panel", className)}>
      <h3 className="military-section-header">
        <Clock size={18} className="mr-2 text-military-info" />
        Mission Timeline
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="ml-auto text-xs bg-military-primary px-2 py-1 rounded border border-gray-700">
                Operation Shadow Tiger
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">Current mission designation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      
      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-[500px]">
          {phases.map((phase, index) => (
            <React.Fragment key={phase.id}>
              {/* Phase box */}
              <div 
                className={cn(
                  "flex-1 p-4 border cursor-pointer transition-all duration-300 hover:border-military-info/30",
                  phase.status === 'complete' 
                    ? "border-military-success/30 bg-military-success/5" 
                    : phase.status === 'current'
                      ? "border-military-info/30 bg-military-info/5 ring-1 ring-military-info/15" 
                      : "border-gray-700 bg-military-primary/50"
                )}
                onClick={() => handlePhaseClick(phase.id)}
              >
                <div className="flex items-center mb-2">
                  {getStatusIcon(phase.status)}
                  <span className="font-medium">{phase.name}</span>
                </div>
                
                <div className="text-xs text-gray-400 mb-3">
                  Duration: {phase.duration}
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-military-primary/80 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      phase.status === 'complete' 
                        ? "bg-military-success" 
                        : "bg-military-info"
                    )}
                    style={{ width: `${phase.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center mt-2 text-xs">
                  <span>{phase.status === 'complete' ? 'Completed' : `${phase.progress}% complete`}</span>
                  {phase.status === 'current' && (
                    <span className="text-military-info flex items-center">
                      <Circle size={6} className="animate-pulse mr-1" />
                      In Progress
                    </span>
                  )}
                </div>
              </div>
              
              {/* Connector */}
              {index < phases.length - 1 && (
                <div className="flex items-center px-1">
                  <div className="w-4 h-0.5 bg-gray-700"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <MilitaryButton 
                  size="sm" 
                  variant="info" 
                  onClick={handleReplay}
                  disabled={loadingReplay}
                  className="flex items-center"
                >
                  {loadingReplay ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-military-info" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading Replay...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Play size={14} className="mr-1" />
                      Replay Mission
                    </span>
                  )}
                </MilitaryButton>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">Replay mission events in chronological order</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MissionTimeline;
