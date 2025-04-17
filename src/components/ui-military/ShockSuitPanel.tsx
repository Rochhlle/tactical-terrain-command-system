
import React, { useState } from 'react';
import { Shield, Zap } from 'lucide-react';
import MilitaryButton from './MilitaryButton';
import { cn } from '@/lib/utils';

interface ShockZone {
  id: string;
  name: string;
  enabled: boolean;
}

const ShockSuitPanel: React.FC<{ className?: string }> = ({ className }) => {
  const [zones, setZones] = useState<ShockZone[]>([
    { id: 'torso', name: 'Torso', enabled: true },
    { id: 'legs', name: 'Legs', enabled: false },
    { id: 'arms', name: 'Arms', enabled: false }
  ]);
  
  const [intensity, setIntensity] = useState(2);
  
  const toggleZone = (zoneId: string) => {
    setZones(zones.map(zone => 
      zone.id === zoneId ? { ...zone, enabled: !zone.enabled } : zone
    ));
  };

  return (
    <div className={cn("military-panel p-4", className)}>
      <h3 className="text-lg font-bold mb-4 border-b border-military-info/30 pb-2 flex items-center">
        <Shield size={18} className="mr-2 text-military-info" />
        Smart Shock Suit Sync
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h4 className="font-medium mb-2">Impact Zones</h4>
          <div className="space-y-2">
            {zones.map(zone => (
              <div 
                key={zone.id}
                className={cn(
                  "flex items-center justify-between p-2 border rounded cursor-pointer transition-all",
                  zone.enabled 
                    ? "bg-military-info/10 border-military-info/50" 
                    : "bg-military-primary/60 border-military-info/20"
                )}
                onClick={() => toggleZone(zone.id)}
              >
                <span>{zone.name}</span>
                <div className={cn(
                  "w-4 h-4 rounded-full border",
                  zone.enabled 
                    ? "bg-military-info border-military-info" 
                    : "bg-transparent border-military-text/50"
                )}></div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Intensity Level: {intensity}</h4>
          <div className="flex justify-between mb-2">
            <span className="text-xs">Low</span>
            <span className="text-xs">High</span>
          </div>
          <input 
            type="range" 
            min={1} 
            max={5} 
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-2 bg-military-primary rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgba(30, 174, 219, 0.7) 0%, rgba(30, 174, 219, 0.7) ${(intensity-1)/4*100}%, rgba(30, 174, 219, 0.2) ${(intensity-1)/4*100}%, rgba(30, 174, 219, 0.2) 100%)`
            }}
          />
          
          <div className="mt-4">
            <MilitaryButton 
              variant={zones.some(z => z.enabled) ? "alert" : "info"} 
              glow={zones.some(z => z.enabled)}
              className="w-full"
            >
              {zones.some(z => z.enabled) ? "Deactivate All Zones" : "Activate Selected Zones"}
            </MilitaryButton>
          </div>
        </div>
        
        {zones.some(z => z.enabled) && (
          <div className="flex items-center mt-2 bg-military-primary/80 text-military-info text-xs px-2 py-1 rounded border border-military-info/50 w-fit">
            <Zap size={10} className="mr-1" />
            Active Zones: {zones.filter(z => z.enabled).length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShockSuitPanel;
