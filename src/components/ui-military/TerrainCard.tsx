
import React from 'react';
import { MapPin, CloudRain, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ThreatLevel = 'Low' | 'Medium' | 'High';

interface TerrainCardProps {
  id: string;
  name: string;
  location: string;
  weather: string;
  threatLevel: ThreatLevel;
  imageUrl: string;
  onClick: (id: string) => void;
  selected?: boolean;
}

const TerrainCard: React.FC<TerrainCardProps> = ({
  id,
  name,
  location,
  weather,
  threatLevel,
  imageUrl,
  onClick,
  selected = false
}) => {
  const getThreatBadgeClass = (level: ThreatLevel): string => {
    switch (level) {
      case 'Low':
        return 'bg-military-success/20 text-military-success border-military-success/50';
      case 'Medium':
        return 'bg-military-warning/20 text-military-warning border-military-warning/50';
      case 'High':
        return 'bg-military-danger/20 text-military-danger border-military-danger/50';
      default:
        return 'bg-military-success/20 text-military-success border-military-success/50';
    }
  };

  return (
    <div 
      className={cn(
        "military-card cursor-pointer w-[300px] h-[220px] flex-shrink-0",
        selected && "border-military-info border-2"
      )}
      onClick={() => onClick(id)}
    >
      <div className="h-[70%] relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-military-background/90 to-transparent"></div>
        
        {/* Location tag */}
        <div className="absolute top-2 left-2 flex items-center bg-military-primary/80 backdrop-blur-sm rounded px-2 py-1 text-xs border border-military-info/30">
          <MapPin size={12} className="mr-1 text-military-info" />
          <span>{location}</span>
        </div>
        
        {/* Weather tag */}
        <div className="absolute top-2 right-2 flex items-center bg-military-primary/80 backdrop-blur-sm rounded px-2 py-1 text-xs border border-military-info/30">
          <CloudRain size={12} className="mr-1 text-military-info" />
          <span>{weather}</span>
        </div>
        
        {/* Threat level badge */}
        <div className={cn(
          "absolute bottom-2 right-2 flex items-center rounded px-2 py-1 text-xs border",
          getThreatBadgeClass(threatLevel)
        )}>
          <AlertTriangle size={12} className="mr-1" />
          <span>{threatLevel} Threat</span>
        </div>
      </div>
      
      <div className="h-[30%] p-2 flex flex-col justify-between">
        <h3 className="font-bold text-military-text">{name}</h3>
        
        {/* Interactive indicator */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-military-info">ID: {id.toUpperCase()}</span>
          <span className="text-xs flex items-center">
            <span className="w-2 h-2 rounded-full bg-military-info mr-1 animate-pulse"></span>
            Ready
          </span>
        </div>
      </div>
    </div>
  );
};

export default TerrainCard;
