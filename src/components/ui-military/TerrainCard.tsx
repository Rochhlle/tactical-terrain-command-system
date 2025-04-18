
import React from 'react';
import { MapPin, Check, Moon, Sun, Wind, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TerrainCardProps {
  name: string;
  type: string;
  location: string;
  environment?: 'Day' | 'Night' | 'Storm' | 'Extreme';
  image?: string;
  isNew?: boolean;
  isSelected?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}

const TerrainCard: React.FC<TerrainCardProps> = ({ 
  name, 
  type,
  location,
  environment = 'Day',
  image, 
  isNew = false, 
  isSelected = false,
  isLoading = false,
  onClick 
}) => {
  // Environment icon mapping
  const environmentIcon = {
    'Day': <Sun size={14} className="mr-1 text-yellow-400" />,
    'Night': <Moon size={14} className="mr-1 text-indigo-300" />,
    'Storm': <Wind size={14} className="mr-1 text-blue-400" />,
    'Extreme': <Thermometer size={14} className="mr-1 text-red-400" />
  };

  return (
    <div 
      className={cn(
        "military-card relative cursor-pointer transition-all duration-300 h-52 flex flex-col justify-end overflow-hidden group shadow-md",
        isSelected ? "border-military-info/50 ring-1 ring-military-info/30" : "hover:border-gray-600 hover:scale-[1.02]",
      )}
      onClick={onClick}
    >
      {image && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-military-primary via-military-primary/80 to-transparent z-10"></div>
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      
      <div className="z-10 p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-bold text-lg leading-tight font-jetbrains">{name}</h4>
          {isSelected && (
            <div className="bg-military-info/20 border border-military-info/40 rounded-full h-5 w-5 flex items-center justify-center">
              <Check size={12} className="text-military-info" />
            </div>
          )}
        </div>
        
        <div className="flex items-center mb-2 text-sm text-gray-300">
          <MapPin size={14} className="mr-1 text-military-info/70" />
          {location}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="text-xs px-2 py-0.5 bg-military-primary/80 border border-gray-700 rounded">
              {type}
            </span>
            
            <span className="text-xs px-2 py-0.5 bg-military-primary/80 border border-gray-700 rounded flex items-center">
              {environmentIcon[environment]}
              {environment}
            </span>
          </div>
          
          {isLoading && (
            <span className="text-xs text-military-info flex items-center animate-pulse">
              <svg className="animate-spin mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          )}
        </div>
      </div>
      
      {isNew && (
        <div className="absolute top-2 right-2 bg-military-alert/90 text-white text-xs px-2 py-0.5 rounded">
          NEW
        </div>
      )}
    </div>
  );
};

export default TerrainCard;
