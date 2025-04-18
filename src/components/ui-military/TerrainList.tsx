
import React, { useState } from 'react';
import TerrainCard from './TerrainCard';
import { Map, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TerrainListProps {
  onSelectTerrain?: (terrainId: string) => void;
  selectedTerrainId?: string;
  className?: string;
}

interface Terrain {
  id: string;
  name: string;
  location: string;
  type: string;
  image: string;
  isNew?: boolean;
}

const TerrainList: React.FC<TerrainListProps> = ({ 
  onSelectTerrain,
  selectedTerrainId = '',
  className 
}) => {
  const [loadingTerrain, setLoadingTerrain] = useState<string | null>(null);
  const [showHUD, setShowHUD] = useState(false);
  
  const terrains: Terrain[] = [
    { 
      id: 'siachen', 
      name: 'Siachen Glacier', 
      location: 'Eastern Karakoram',
      type: 'Snow', 
      image: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80',
    },
    { 
      id: 'galwan', 
      name: 'Galwan Valley', 
      location: 'Eastern Ladakh LAC',
      type: 'Mountain', 
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80',
    },
    { 
      id: 'thar', 
      name: 'Thar Desert', 
      location: 'Rajasthan Border',
      type: 'Desert', 
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80',
      isNew: true,
    },
    { 
      id: 'kupwara', 
      name: 'Kupwara Forest', 
      location: 'Northern Kashmir',
      type: 'Forest', 
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
    },
  ];
  
  const handleSelectTerrain = (terrainId: string) => {
    if (selectedTerrainId === terrainId) return;
    
    setLoadingTerrain(terrainId);
    setShowHUD(true);
    
    setTimeout(() => {
      if (onSelectTerrain) {
        onSelectTerrain(terrainId);
      }
      
      setTimeout(() => {
        setLoadingTerrain(null);
        
        setTimeout(() => {
          setShowHUD(false);
        }, 1000);
      }, 1500);
    }, 300);
  };

  return (
    <div className={cn("military-panel", className)}>
      <h3 className="military-section-header">
        <Map size={18} className="mr-2 text-military-info" />
        Tactical Terrain Selection
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {terrains.map(terrain => (
          <TooltipProvider key={terrain.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <TerrainCard
                    name={terrain.name}
                    type={terrain.type}
                    location={terrain.location}
                    image={terrain.image}
                    isNew={terrain.isNew}
                    isSelected={selectedTerrainId === terrain.id}
                    isLoading={loadingTerrain === terrain.id}
                    onClick={() => handleSelectTerrain(terrain.id)}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">Location: {terrain.location}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      
      {showHUD && (
        <div className="hud-overlay">
          <div className="hud-loading">
            <div className="flex flex-col items-center">
              <Loader size={24} className="animate-spin mb-2 text-military-info" />
              <div>Loading Terrain Data...</div>
              {loadingTerrain && (
                <div className="text-sm mt-1 text-military-info/70">
                  {terrains.find(t => t.id === loadingTerrain)?.name || ''}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerrainList;
