
import React, { useState } from 'react';
import { Map, Target, Crosshair, Video, Pencil, Trash } from 'lucide-react';
import MilitaryButton from '../MilitaryButton';
import { cn } from '@/lib/utils';

interface UnitMarker {
  id: string;
  type: 'infantry' | 'drone' | 'command';
  position: { x: number; y: number };
}

interface ThreatZone {
  id: string;
  points: { x: number; y: number }[];
}

const CommandView: React.FC<{ className?: string }> = ({ className }) => {
  const [units, setUnits] = useState<UnitMarker[]>([
    { id: 'inf-1', type: 'infantry', position: { x: 30, y: 40 } },
    { id: 'inf-2', type: 'infantry', position: { x: 35, y: 45 } },
    { id: 'inf-3', type: 'infantry', position: { x: 40, y: 50 } },
    { id: 'drone-1', type: 'drone', position: { x: 60, y: 30 } },
    { id: 'cmd-1', type: 'command', position: { x: 20, y: 20 } },
  ]);
  
  const [threatZones, setThreatZones] = useState<ThreatZone[]>([
    { 
      id: 'threat-1', 
      points: [
        { x: 70, y: 50 },
        { x: 80, y: 60 },
        { x: 70, y: 70 },
        { x: 60, y: 60 }
      ] 
    }
  ]);
  
  const [droneFeedActive, setDroneFeedActive] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);
  
  const toggleDroneFeed = () => {
    setDroneFeedActive(!droneFeedActive);
  };
  
  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
  };
  
  const clearThreatZones = () => {
    setThreatZones([]);
  };

  return (
    <div className={cn("military-panel p-4", className)}>
      <div className="flex items-center justify-between mb-4 border-b border-military-info/30 pb-2">
        <h3 className="text-lg font-bold flex items-center">
          <Map size={18} className="mr-2 text-military-info" />
          Commander View Map
        </h3>
        
        <div className="flex space-x-2">
          <div className={cn(
            "px-2 py-1 rounded-full text-xs border flex items-center cursor-pointer",
            drawingMode 
              ? "bg-military-info/20 border-military-info/60 text-military-info" 
              : "bg-military-primary/60 border-military-info/30 text-military-text"
          )}
          onClick={toggleDrawingMode}
          >
            <Pencil size={12} className="mr-1" />
            {drawingMode ? 'Drawing Active' : 'Draw Zone'}
          </div>
          
          <div 
            className="px-2 py-1 rounded-full text-xs border border-military-danger/30 text-military-danger flex items-center cursor-pointer hover:bg-military-danger/10 hover:border-military-danger/60"
            onClick={clearThreatZones}
          >
            <Trash size={12} className="mr-1" />
            Clear
          </div>
        </div>
      </div>
      
      <div className="relative aspect-square border border-military-info/30 bg-military-primary/50 rounded-md overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-40"></div>
        
        {/* Threat zones */}
        <svg className="absolute inset-0 w-full h-full">
          {threatZones.map(zone => (
            <polygon 
              key={zone.id}
              points={zone.points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="rgba(249, 115, 22, 0.2)"
              stroke="rgba(249, 115, 22, 0.7)"
              strokeWidth="1"
              strokeDasharray="4,2"
            />
          ))}
        </svg>
        
        {/* Unit markers */}
        {units.map(unit => (
          <div 
            key={unit.id}
            className="absolute"
            style={{ 
              left: `${unit.position.x}%`, 
              top: `${unit.position.y}%`, 
              transform: 'translate(-50%, -50%)' 
            }}
          >
            {unit.type === 'infantry' && (
              <div className="w-4 h-4 rounded-full border border-military-success bg-military-success/30"></div>
            )}
            {unit.type === 'drone' && (
              <div className="w-5 h-5 rounded-full border border-military-info bg-military-info/30 animate-pulse"></div>
            )}
            {unit.type === 'command' && (
              <div className="w-6 h-6 rounded-full border-2 border-military-info bg-military-info/50 flex items-center justify-center">
                <Target size={12} className="text-white" />
              </div>
            )}
          </div>
        ))}
        
        {/* Scanner effect */}
        <div className="scanner-line"></div>
        
        {/* Drone feed overlay */}
        {droneFeedActive && (
          <div className="absolute top-0 right-0 w-1/3 h-1/3 border border-military-info/70 bg-military-primary/80 rounded overflow-hidden m-2">
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Video size={24} className="text-military-info/70" />
            </div>
            <div className="absolute top-1 left-1 text-[10px] bg-military-primary/80 px-1 py-0.5 rounded border border-military-info/50">
              DRONE FEED
            </div>
            <div className="absolute inset-0 border border-military-info/30 animate-pulse"></div>
          </div>
        )}
        
        {/* Crosshair overlay for drawing mode */}
        {drawingMode && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Crosshair size={24} className="text-military-info/70" />
          </div>
        )}
        
        {/* Coordinates */}
        <div className="absolute bottom-2 left-2 text-xs bg-military-primary/80 px-2 py-1 rounded border border-military-info/30">
          <Crosshair size={10} className="inline mr-1" />
          Grid Active
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <MilitaryButton 
          size="sm" 
          variant={droneFeedActive ? "info" : "default"}
          className="flex items-center"
          onClick={toggleDroneFeed}
        >
          <Video size={14} className="mr-1" />
          {droneFeedActive ? 'Disable Drone Feed' : 'Enable Drone Feed'}
        </MilitaryButton>
        
        <MilitaryButton 
          size="sm" 
          className="flex items-center"
        >
          <Map size={14} className="mr-1" />
          Save Map
        </MilitaryButton>
      </div>
    </div>
  );
};

export default CommandView;
