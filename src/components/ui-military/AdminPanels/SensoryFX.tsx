
import React, { useState } from 'react';
import { Wind, Droplets, Zap, AlertCircle } from 'lucide-react';
import MilitaryButton from '../MilitaryButton';
import { cn } from '@/lib/utils';

interface SensoryZone {
  id: string;
  name: string;
  type: 'fog' | 'wind' | 'vibration';
  status: 'active' | 'idle' | 'offline';
  intensity: number;
}

const SensoryFX: React.FC<{ className?: string }> = ({ className }) => {
  const [zones, setZones] = useState<SensoryZone[]>([
    { id: 'fog-01', name: 'Fog Zone Alpha', type: 'fog', status: 'active', intensity: 70 },
    { id: 'fog-02', name: 'Fog Zone Beta', type: 'fog', status: 'idle', intensity: 0 },
    { id: 'wind-01', name: 'Wind Pad North', type: 'wind', status: 'active', intensity: 50 },
    { id: 'wind-02', name: 'Wind Pad South', type: 'wind', status: 'idle', intensity: 0 },
    { id: 'vib-01', name: 'Vibration Zone 1', type: 'vibration', status: 'active', intensity: 40 },
    { id: 'vib-02', name: 'Vibration Zone 2', type: 'vibration', status: 'offline', intensity: 0 },
  ]);
  
  const [arduinoStatus, setArduinoStatus] = useState<'connected' | 'offline'>('connected');
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fog':
        return <Droplets size={16} />;
      case 'wind':
        return <Wind size={16} />;
      case 'vibration':
        return <Zap size={16} />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-military-success border-military-success/50 bg-military-success/10';
      case 'idle':
        return 'text-military-warning border-military-warning/50 bg-military-warning/10';
      case 'offline':
        return 'text-military-danger border-military-danger/50 bg-military-danger/10';
      default:
        return 'text-military-text border-military-text/50 bg-military-text/10';
    }
  };
  
  const toggleZone = (zoneId: string) => {
    setZones(zones.map(zone => {
      if (zone.id === zoneId) {
        const newStatus = zone.status === 'active' ? 'idle' : 'active';
        return {
          ...zone,
          status: newStatus,
          intensity: newStatus === 'active' ? 70 : 0
        };
      }
      return zone;
    }));
  };
  
  const toggleArduinoStatus = () => {
    setArduinoStatus(arduinoStatus === 'connected' ? 'offline' : 'connected');
  };
  
  return (
    <div className={cn("military-panel p-4", className)}>
      <div className="flex items-center justify-between mb-4 border-b border-military-info/30 pb-2">
        <h3 className="text-lg font-bold flex items-center">
          <Wind size={18} className="mr-2 text-military-info" />
          Sensory FX Control
        </h3>
        
        <div 
          className={cn(
            "px-3 py-1 rounded-full text-xs border flex items-center cursor-pointer",
            arduinoStatus === 'connected' 
              ? "bg-military-success/10 border-military-success/50 text-military-success" 
              : "bg-military-danger/10 border-military-danger/50 text-military-danger animate-pulse"
          )}
          onClick={toggleArduinoStatus}
        >
          <span className={cn(
            "w-2 h-2 rounded-full mr-1",
            arduinoStatus === 'connected' ? "bg-military-success" : "bg-military-danger"
          )}></span>
          Arduino {arduinoStatus === 'connected' ? 'Connected' : 'Offline'}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zones.map(zone => (
          <div 
            key={zone.id}
            className={cn(
              "border rounded-md p-3 flex items-center transition-all",
              zone.status === 'offline' 
                ? "border-military-danger/30 bg-military-primary/70 opacity-60 cursor-not-allowed" 
                : "border-military-info/30 bg-military-primary/60 cursor-pointer hover:border-military-info/60"
            )}
            onClick={() => zone.status !== 'offline' && toggleZone(zone.id)}
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mr-3 border",
              zone.status === 'active' 
                ? "border-military-info bg-military-info/20 text-military-info" 
                : "border-military-info/30 bg-military-primary text-military-text/70"
            )}>
              {getTypeIcon(zone.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{zone.name}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full border",
                  getStatusColor(zone.status)
                )}>
                  {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}
                </span>
              </div>
              
              {zone.status !== 'offline' && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Intensity</span>
                    <span>{zone.intensity}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-military-primary/80 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-military-info"
                      style={{ width: `${zone.intensity}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {zone.status === 'offline' && (
                <div className="mt-1 text-xs flex items-center text-military-danger">
                  <AlertCircle size={10} className="mr-1" />
                  Hardware connection error
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <MilitaryButton 
          variant="info" 
          className="flex items-center justify-center"
        >
          <Droplets size={16} className="mr-2" />
          Activate All Fog
        </MilitaryButton>
        
        <MilitaryButton 
          className="flex items-center justify-center"
        >
          <Wind size={16} className="mr-2" />
          Reset All Zones
        </MilitaryButton>
      </div>
    </div>
  );
};

export default SensoryFX;
