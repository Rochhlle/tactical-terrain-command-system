
import React, { useState } from 'react';
import { Shield, Zap, Info } from 'lucide-react';
import MilitaryButton from './MilitaryButton';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const [loading, setLoading] = useState(false);
  
  const toggleZone = (zoneId: string) => {
    setZones(zones.map(zone => 
      zone.id === zoneId ? { ...zone, enabled: !zone.enabled } : zone
    ));
  };
  
  const handleActivateAll = () => {
    if (zones.some(z => z.enabled)) {
      // Deactivate all zones
      setLoading(true);
      setTimeout(() => {
        setZones(zones.map(zone => ({ ...zone, enabled: false })));
        setLoading(false);
      }, 800);
    } else {
      // Activate all zones
      setLoading(true);
      setTimeout(() => {
        setZones(zones.map(zone => ({ ...zone, enabled: true })));
        setLoading(false);
      }, 800);
    }
  };

  return (
    <div className={cn("military-panel", className)}>
      <h3 className="military-section-header">
        <Shield size={18} className="mr-2 text-military-info" />
        Smart Shock Suit Sync
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="ml-2 text-military-info/70 hover:text-military-info">
                <Info size={14} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">Tactical feedback system for squad training</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3 text-sm text-gray-300">Impact Zones</h4>
          <div className="space-y-3">
            {zones.map(zone => (
              <div 
                key={zone.id}
                className={cn(
                  "flex items-center justify-between p-3 border rounded cursor-pointer transition-all duration-300 hover:border-military-info/30",
                  zone.enabled 
                    ? "bg-military-info/10 border-military-info/40 shadow-sm" 
                    : "bg-military-primary/80 border-gray-700"
                )}
                onClick={() => toggleZone(zone.id)}
              >
                <span className="font-medium">{zone.name}</span>
                <div className={cn(
                  "w-4 h-4 rounded-full border",
                  zone.enabled 
                    ? "bg-military-info border-military-info" 
                    : "bg-transparent border-gray-500"
                )}></div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2 text-sm text-gray-300">Intensity Level: {intensity}</h4>
          <div className="flex justify-between mb-2 text-xs text-gray-400">
            <span>Minimal</span>
            <span>Maximum</span>
          </div>
          <input 
            type="range" 
            min={1} 
            max={5} 
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-2 bg-military-primary rounded-lg appearance-none cursor-pointer mb-6"
            style={{
              background: `linear-gradient(to right, rgba(30, 174, 219, 0.6) 0%, rgba(30, 174, 219, 0.6) ${(intensity-1)/4*100}%, rgba(30, 174, 219, 0.1) ${(intensity-1)/4*100}%, rgba(30, 174, 219, 0.1) 100%)`
            }}
          />
          
          <MilitaryButton 
            variant={zones.some(z => z.enabled) ? "alert" : "info"} 
            glow={zones.some(z => z.enabled)}
            className="w-full"
            onClick={handleActivateAll}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Command...
              </span>
            ) : zones.some(z => z.enabled) ? (
              "Deactivate All Feedback Zones"
            ) : (
              "Activate Selected Feedback Zones"
            )}
          </MilitaryButton>
        </div>
      </div>
      
      {zones.some(z => z.enabled) && (
        <div className="flex items-center mt-4 bg-military-primary/80 text-military-info text-xs px-3 py-2 rounded border border-military-info/30 w-fit">
          <Zap size={12} className="mr-2" />
          Active Zones: {zones.filter(z => z.enabled).length} | Intensity: {intensity}/5
        </div>
      )}
    </div>
  );
};

export default ShockSuitPanel;
