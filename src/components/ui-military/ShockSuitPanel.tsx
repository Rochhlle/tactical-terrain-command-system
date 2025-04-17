import React, { useState } from 'react';
import { User, Shield, Zap } from 'lucide-react';
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="aspect-[3/4] bg-military-primary/50 border border-military-info/30 rounded-md flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 100 160" className="w-3/4 h-3/4 stroke-military-info/70 fill-none stroke-[0.8]">
              <path 
                d="M50 20 
                   C60 20, 65 25, 65 35
                   L65 85
                   C65 95, 60 100, 50 100
                   C40 100, 35 95, 35 85
                   L35 35
                   C35 25, 40 20, 50 20Z"
                className="stroke-military-info stroke-[1]"
              />
              
              <path 
                d="M45 40 L55 40 L55 80 L45 80 Z"
                className={zones.find(z => z.id === 'torso')?.enabled 
                  ? "fill-military-info/20 stroke-military-info animate-pulse" 
                  : "fill-transparent"}
              />
              
              <path 
                d="M65 45 C75 45, 85 45, 85 55 C85 65, 75 65, 65 65"
                className={zones.find(z => z.id === 'arms')?.enabled 
                  ? "fill-military-info/20 stroke-military-info animate-pulse" 
                  : "fill-transparent"}
              />
              <path 
                d="M35 45 C25 45, 15 45, 15 55 C15 65, 25 65, 35 65"
                className={zones.find(z => z.id === 'arms')?.enabled 
                  ? "fill-military-info/20 stroke-military-info animate-pulse" 
                  : "fill-transparent"}
              />
              
              <path 
                d="M45 85 L45 135 C45 145, 40 145, 40 135 L40 85"
                className={zones.find(z => z.id === 'legs')?.enabled 
                  ? "fill-military-info/20 stroke-military-info animate-pulse" 
                  : "fill-transparent"}
              />
              <path 
                d="M55 85 L55 135 C55 145, 60 145, 60 135 L60 85"
                className={zones.find(z => z.id === 'legs')?.enabled 
                  ? "fill-military-info/20 stroke-military-info animate-pulse" 
                  : "fill-transparent"}
              />
              
              <path d="M45 30 L55 30" className="stroke-military-info/50" />
              <path d="M42 50 L58 50" className="stroke-military-info/50" />
              <path d="M40 70 L60 70" className="stroke-military-info/50" />
              <circle cx="50" cy="90" r="2" className="fill-military-info/50" />
              
              <circle cx="50" cy="35" r="1" className="fill-military-info" />
              <circle cx="50" cy="55" r="1" className="fill-military-info" />
              <circle cx="50" cy="75" r="1" className="fill-military-info" />
            </svg>
            
            {zones.some(z => z.enabled) && (
              <div className="absolute top-2 right-2 flex items-center bg-military-primary/80 text-military-info text-xs px-2 py-1 rounded-full border border-military-info/50">
                <Zap size={10} className="mr-1" />
                Active
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col justify-between">
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
        </div>
      </div>
    </div>
  );
};

export default ShockSuitPanel;
