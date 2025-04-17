
import React from 'react';
import { CloudFog, ZapOff, Pause, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CommandButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'alert';
}

const CommandButton: React.FC<CommandButtonProps> = ({ 
  icon, 
  label, 
  onClick,
  variant = 'default'
}) => {
  return (
    <button
      className={cn(
        "flex flex-col items-center justify-center p-4 border rounded-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]", 
        variant === 'default' 
          ? "bg-military-primary/70 border-military-info/30 hover:border-military-info/60 hover:shadow-[0_0_15px_rgba(30,174,219,0.3)]" 
          : "bg-military-alert/10 border-military-alert/50 hover:border-military-alert/80 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "w-12 h-12 flex items-center justify-center rounded-full mb-2 border",
        variant === 'default' 
          ? "border-military-info/50 bg-military-info/10" 
          : "border-military-alert/50 bg-military-alert/10"
      )}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

const QuickCommands: React.FC<{ className?: string }> = ({ className }) => {
  const [missionPaused, setMissionPaused] = React.useState(false);
  const [fxMuted, setFxMuted] = React.useState(false);
  const { toast } = useToast();
  
  const handleTriggerFog = () => {
    toast({ 
      title: "Deploying Fog", 
      description: "Fog simulation activated in all zones." 
    });
  };
  
  const handleSimulateBlast = () => {
    toast({ 
      title: "Blast Simulation", 
      description: "Initiating blast simulation sequence.", 
      variant: "destructive"
    });
  };
  
  const handlePauseMission = () => {
    setMissionPaused(!missionPaused);
    toast({ 
      title: missionPaused ? "Mission Resumed" : "Mission Paused", 
      description: missionPaused ? "Mission timeline is now active." : "Mission timeline has been paused.",
      variant: missionPaused ? "default" : "destructive" 
    });
  };
  
  const handleMuteFx = () => {
    setFxMuted(!fxMuted);
    toast({ 
      title: fxMuted ? "Effects Unmuted" : "Effects Muted", 
      description: fxMuted ? "All sensory effects are now active." : "All sensory effects have been muted." 
    });
  };
  
  return (
    <div className={cn("military-panel p-4", className)}>
      <h3 className="text-lg font-bold mb-4 border-b border-military-info/30 pb-2">
        Quick Tactical Commands
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CommandButton 
          icon={<CloudFog size={24} className="text-military-info" />} 
          label="Trigger Fog" 
          onClick={handleTriggerFog}
        />
        
        <CommandButton 
          icon={<ZapOff size={24} className="text-military-alert" />} 
          label="Simulate Blast" 
          onClick={handleSimulateBlast}
          variant="alert"
        />
        
        <CommandButton 
          icon={<Pause size={24} className={missionPaused ? "text-military-alert" : "text-military-info"} />} 
          label={missionPaused ? "Resume Mission" : "Pause Mission"} 
          onClick={handlePauseMission}
          variant={missionPaused ? "alert" : "default"}
        />
        
        <CommandButton 
          icon={<VolumeX size={24} className={fxMuted ? "text-military-alert" : "text-military-info"} />} 
          label={fxMuted ? "Unmute FX" : "Mute FX"} 
          onClick={handleMuteFx}
          variant={fxMuted ? "alert" : "default"}
        />
      </div>
    </div>
  );
};

export default QuickCommands;
