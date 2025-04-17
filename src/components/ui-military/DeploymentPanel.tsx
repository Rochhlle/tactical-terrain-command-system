
import React, { useState, useRef } from 'react';
import { Crosshair, Map, Send, Truck, User, Drone, Shield } from 'lucide-react';
import MilitaryButton from './MilitaryButton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface AssetItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

const DeploymentPanel: React.FC<{ className?: string }> = ({ className }) => {
  const [assets, setAssets] = useState<AssetItem[]>([
    { id: 'soldiers', name: 'Soldiers', icon: <User size={18} />, count: 0 },
    { id: 'tanks', name: 'Tanks', icon: <Truck size={18} />, count: 0 },
    { id: 'drones', name: 'Drones', icon: <Drone size={18} />, count: 0 },
    { id: 'bunkers', name: 'Bunkers', icon: <Shield size={18} />, count: 0 }
  ]);
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Drag and drop functionality
  const [draggedAsset, setDraggedAsset] = useState<string | null>(null);
  const terrainGridRef = useRef<HTMLDivElement>(null);
  
  const handleDragStart = (assetId: string) => {
    setDraggedAsset(assetId);
  };
  
  const handleDragEnd = () => {
    setDraggedAsset(null);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedAsset || !terrainGridRef.current) return;
    
    // Get the relative position in the grid
    const rect = terrainGridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update asset count
    setAssets(assets.map(asset => 
      asset.id === draggedAsset 
        ? { ...asset, count: asset.count + 1 } 
        : asset
    ));
    
    toast({
      title: "Asset Added",
      description: `Placed ${draggedAsset} at coordinates X:${Math.round(x)}, Y:${Math.round(y)}`,
    });
    
    setDraggedAsset(null);
  };
  
  const handleDeployToScene = () => {
    if (assets.every(asset => asset.count === 0)) {
      toast({
        title: "Deployment Failed",
        description: "Please add at least one asset to deploy.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      toast({
        title: "Deployment Successful",
        description: `Deployed ${assets.reduce((acc, asset) => acc + asset.count, 0)} assets to scene.`,
        variant: "default"
      });
      setLoading(false);
    }, 2500);
  };
  
  return (
    <div className={cn("military-panel p-4", className)}>
      <h3 className="text-lg font-bold mb-4 border-b border-military-info/30 pb-2 flex items-center">
        <Map size={18} className="mr-2 text-military-info" />
        3D Hologram Deployment
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-3">
          <p className="text-sm">Drag and drop assets to deploy:</p>
          
          <div className="grid grid-cols-2 gap-3">
            {assets.map(asset => (
              <div 
                key={asset.id}
                className="flex flex-col items-center p-3 border border-military-info/30 rounded-md bg-military-primary/70 cursor-move"
                draggable
                onDragStart={() => handleDragStart(asset.id)}
                onDragEnd={handleDragEnd}
              >
                <div className="w-10 h-10 rounded-full bg-military-info/10 border border-military-info/30 flex items-center justify-center mb-2">
                  {asset.icon}
                </div>
                <div className="text-sm font-medium">{asset.name}</div>
                <div className="text-xs text-military-info mt-1">Deployed: {asset.count}</div>
              </div>
            ))}
          </div>
          
          <MilitaryButton 
            onClick={handleDeployToScene}
            className="mt-4"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deploying to Scene...
              </span>
            ) : (
              <span className="flex items-center">
                <Send size={16} className="mr-2" />
                Deploy to Scene
              </span>
            )}
          </MilitaryButton>
        </div>
        
        <div 
          ref={terrainGridRef}
          className="relative aspect-square border border-military-info/30 rounded-md overflow-hidden bg-military-primary/50 flex items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-bg opacity-40"></div>
          
          {/* Terrain preview representation */}
          <div className="relative w-4/5 h-4/5 bg-military-primary/80 rounded-md overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(30,174,219,0.1)_0%,rgba(19,26,42,0.2)_70%)]"></div>
            
            {/* Coordinates */}
            <div className="absolute bottom-2 right-2 text-xs bg-military-primary/80 px-2 py-1 rounded border border-military-info/30">
              <Crosshair size={10} className="inline mr-1" />
              Grid Ready
            </div>
            
            {/* Scanner effect */}
            <div className="scanner-line"></div>
          </div>
          
          {draggedAsset && (
            <div className="absolute inset-0 border-2 border-military-info animate-pulse rounded-md pointer-events-none"></div>
          )}
          
          {/* Drop indicator text */}
          {draggedAsset ? (
            <div className="absolute bottom-2 left-2 text-xs bg-military-info/20 border border-military-info/50 px-2 py-1 rounded">
              Drop to place asset
            </div>
          ) : (
            <div className="absolute bottom-2 left-2 text-xs bg-military-primary/80 px-2 py-1 rounded border border-military-info/30">
              Drag assets here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeploymentPanel;
