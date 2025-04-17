
import React from 'react';
import { Cloud, CloudFog, Moon, Wind, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToggleItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  pulseEffect?: boolean;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ 
  label, 
  icon, 
  isActive, 
  onClick,
  pulseEffect = false
}) => {
  return (
    <div 
      className={cn(
        "flex items-center space-x-3 p-2 rounded cursor-pointer transition-all duration-300",
        isActive ? "bg-military-info/20 border border-military-info/50" : "bg-military-primary/60 border border-military-info/20 hover:bg-military-primary/80"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center border",
        isActive 
          ? "border-military-info bg-military-info/20" + (pulseEffect ? " animate-pulse-glow" : "") 
          : "border-military-info/30 bg-military-primary"
      )}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-military-text/70">{isActive ? "Enabled" : "Disabled"}</p>
      </div>
    </div>
  );
};

interface SliderItemProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const SliderItem: React.FC<SliderItemProps> = ({ 
  label, 
  icon, 
  value, 
  min, 
  max, 
  onChange 
}) => {
  return (
    <div className="p-2 rounded bg-military-primary/60 border border-military-info/20">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center border border-military-info/30 bg-military-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-military-text/70">Level: {value}</p>
        </div>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-military-primary rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, rgba(30, 174, 219, 0.7) 0%, rgba(30, 174, 219, 0.7) ${(value-min)/(max-min)*100}%, rgba(30, 174, 219, 0.2) ${(value-min)/(max-min)*100}%, rgba(30, 174, 219, 0.2) 100%)`
        }}
      />
    </div>
  );
};

interface EnvironmentToggleProps {
  className?: string;
}

const EnvironmentToggle: React.FC<EnvironmentToggleProps> = ({ className }) => {
  const [rainEnabled, setRainEnabled] = React.useState(false);
  const [fogEnabled, setFogEnabled] = React.useState(false);
  const [nightMode, setNightMode] = React.useState(false);
  const [windLevel, setWindLevel] = React.useState(2);
  const [temperatureLevel, setTemperatureLevel] = React.useState(5);
  
  return (
    <div className={cn("military-panel p-4", className)}>
      <h3 className="text-lg font-bold mb-4 border-b border-military-info/30 pb-2">
        Environmental Toggles
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <ToggleItem 
          label="Rain"
          icon={<Cloud size={20} className={rainEnabled ? "text-military-info" : "text-military-text/70"} />}
          isActive={rainEnabled}
          onClick={() => setRainEnabled(!rainEnabled)}
          pulseEffect={rainEnabled}
        />
        
        <ToggleItem 
          label="Fog"
          icon={<CloudFog size={20} className={fogEnabled ? "text-military-info" : "text-military-text/70"} />}
          isActive={fogEnabled}
          onClick={() => setFogEnabled(!fogEnabled)}
          pulseEffect={fogEnabled}
        />
        
        <ToggleItem 
          label="Night Mode"
          icon={<Moon size={20} className={nightMode ? "text-military-info" : "text-military-text/70"} />}
          isActive={nightMode}
          onClick={() => setNightMode(!nightMode)}
          pulseEffect={false}
        />
        
        <div className="col-span-2">
          <SliderItem 
            label="Wind"
            icon={<Wind size={20} className="text-military-text/70" />}
            value={windLevel}
            min={0}
            max={5}
            onChange={setWindLevel}
          />
        </div>
        
        <div className="col-span-2">
          <SliderItem 
            label="Temperature"
            icon={<Thermometer size={20} className="text-military-text/70" />}
            value={temperatureLevel}
            min={0}
            max={10}
            onChange={setTemperatureLevel}
          />
        </div>
      </div>
    </div>
  );
};

export default EnvironmentToggle;
