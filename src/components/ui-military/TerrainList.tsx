
import React, { useState } from 'react';
import TerrainCard from './TerrainCard';
import { Map, Loader, Filter, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import MilitaryButton from './MilitaryButton';

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
  environment: 'Day' | 'Night' | 'Storm' | 'Extreme';
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
  const [filter, setFilter] = useState<string | null>(null);
  
  const terrains: Terrain[] = [
    { 
      id: 'siachen', 
      name: 'Siachen Glacier', 
      location: 'Eastern Karakoram',
      type: 'Snow', 
      environment: 'Extreme',
      image: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80',
    },
    { 
      id: 'galwan', 
      name: 'Galwan Valley', 
      location: 'Eastern Ladakh LAC',
      type: 'Mountain', 
      environment: 'Night',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80',
    },
    { 
      id: 'thar', 
      name: 'Thar Desert', 
      location: 'Rajasthan Border',
      type: 'Desert', 
      environment: 'Day',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80',
      isNew: true,
    },
    { 
      id: 'kupwara', 
      name: 'Kupwara Forest', 
      location: 'Northern Kashmir',
      type: 'Forest', 
      environment: 'Storm',
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
    },
  ];
  
  const filteredTerrains = filter ? terrains.filter(terrain => 
    terrain.type === filter || terrain.environment === filter
  ) : terrains;
  
  const handleSelectTerrain = (terrainId: string) => {
    if (selectedTerrainId === terrainId) return;
    
    setLoadingTerrain(terrainId);
    
    setTimeout(() => {
      if (onSelectTerrain) {
        onSelectTerrain(terrainId);
      }
      
      setTimeout(() => {
        setLoadingTerrain(null);
      }, 1500);
    }, 300);
  };

  return (
    <div className={cn("military-panel p-6", className)}>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold flex items-center font-jetbrains">
          <Map size={20} className="mr-2 text-military-info" />
          Tactical Terrain Selection
        </h3>
        
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <MilitaryButton 
                    size="sm" 
                    variant={filter === 'Snow' ? 'info' : 'default'}
                    onClick={() => setFilter(filter === 'Snow' ? null : 'Snow')}
                    className="px-3 py-1"
                  >
                    Snow
                  </MilitaryButton>
                  <MilitaryButton 
                    size="sm" 
                    variant={filter === 'Desert' ? 'info' : 'default'}
                    onClick={() => setFilter(filter === 'Desert' ? null : 'Desert')}
                    className="px-3 py-1 ml-1"
                  >
                    Desert
                  </MilitaryButton>
                  <MilitaryButton 
                    size="sm" 
                    variant={filter === 'Night' ? 'info' : 'default'}
                    onClick={() => setFilter(filter === 'Night' ? null : 'Night')}
                    className="px-3 py-1 ml-1"
                  >
                    Night
                  </MilitaryButton>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">Filter terrains by type</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {filter && (
            <MilitaryButton 
              size="sm"
              variant="alert"
              onClick={() => setFilter(null)}
              className="px-3 py-1 flex items-center"
            >
              <CheckSquare size={14} className="mr-1" />
              Clear Filter
            </MilitaryButton>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {filteredTerrains.map(terrain => (
          <TooltipProvider key={terrain.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <TerrainCard
                    name={terrain.name}
                    type={terrain.type}
                    location={terrain.location}
                    environment={terrain.environment}
                    image={terrain.image}
                    isNew={terrain.isNew}
                    isSelected={selectedTerrainId === terrain.id}
                    isLoading={loadingTerrain === terrain.id}
                    onClick={() => handleSelectTerrain(terrain.id)}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">Location: {terrain.location} ({terrain.environment} conditions)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default TerrainList;
