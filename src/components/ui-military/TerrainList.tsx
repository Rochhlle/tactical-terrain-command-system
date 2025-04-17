
import React from 'react';
import TerrainCard from './TerrainCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const terrainData = [
  {
    id: 'siachen',
    name: 'Siachen Glacier',
    location: 'Eastern Karakoram',
    weather: 'Snowstorm',
    threatLevel: 'High' as const,
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'galwan',
    name: 'Galwan Valley',
    location: 'Eastern Ladakh',
    weather: 'Clear',
    threatLevel: 'Medium' as const,
    imageUrl: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'drass',
    name: 'Drass Sector',
    location: 'Western Ladakh',
    weather: 'Cold',
    threatLevel: 'Medium' as const,
    imageUrl: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'kupwara',
    name: 'LOC - Kupwara',
    location: 'Kashmir',
    weather: 'Foggy',
    threatLevel: 'High' as const,
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'thar',
    name: 'Thar Desert',
    location: 'Rajasthan',
    weather: 'Hot',
    threatLevel: 'Low' as const,
    imageUrl: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'pangong',
    name: 'Pangong Lake',
    location: 'Ladakh',
    weather: 'Cold',
    threatLevel: 'Medium' as const,
    imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'northeast',
    name: 'North-East Jungle',
    location: 'Arunachal',
    weather: 'Rainy',
    threatLevel: 'Medium' as const,
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'urban',
    name: 'Urban Grid',
    location: 'Delhi/Mumbai',
    weather: 'Overcast',
    threatLevel: 'Low' as const,
    imageUrl: 'https://images.unsplash.com/photo-1573843981713-197784383079?auto=format&fit=crop&w=600&q=80',
  }
];

interface TerrainListProps {
  onSelectTerrain: (terrainId: string) => void;
  selectedTerrainId?: string;
  className?: string;
}

const TerrainList: React.FC<TerrainListProps> = ({ 
  onSelectTerrain, 
  selectedTerrainId,
  className 
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };
  
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Select Strategic Terrain</h2>
      
      <div className="relative">
        {/* Scroll buttons */}
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-military-primary/80 p-2 rounded-full border border-military-info/30 hover:border-military-info/60 transition-all"
          onClick={scrollLeft}
        >
          <ChevronLeft size={20} className="text-military-info" />
        </button>
        
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-military-primary/80 p-2 rounded-full border border-military-info/30 hover:border-military-info/60 transition-all"
          onClick={scrollRight}
        >
          <ChevronRight size={20} className="text-military-info" />
        </button>
        
        {/* Cards container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 -mx-2 px-10 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {terrainData.map((terrain) => (
            <div key={terrain.id} className="px-2">
              <TerrainCard 
                {...terrain}
                selected={terrain.id === selectedTerrainId}
                onClick={() => onSelectTerrain(terrain.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerrainList;
