
import React, { useState } from 'react';
import { Map, Layers, Sliders, Monitor, Wrench } from 'lucide-react';
import MilitaryButton from '../MilitaryButton';
import { cn } from '@/lib/utils';

interface TerrainEngineProps {
  className?: string;
}

const TerrainEngine: React.FC<TerrainEngineProps> = ({ className }) => {
  const [dataSource, setDataSource] = useState('Mapbox');
  const [lodLevel, setLodLevel] = useState(3);
  const [exaggeration, setExaggeration] = useState(true);
  
  return (
    <div className={cn("military-panel p-4", className)}>
      <div className="flex items-center justify-between mb-4 border-b border-military-info/30 pb-2">
        <h3 className="text-lg font-bold flex items-center">
          <Layers size={18} className="mr-2 text-military-info" />
          Terrain Engine Console
        </h3>
        
        <div className="flex items-center text-xs">
          <span className="status-green"></span>
          <span>Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-4">
            <label className="text-sm mb-1 block">DEM Data Source</label>
            <select 
              className="military-select w-full"
              value={dataSource}
              onChange={(e) => setDataSource(e.target.value)}
            >
              <option value="Mapbox">Mapbox</option>
              <option value="Cesium">Cesium</option>
              <option value="QGIS">QGIS</option>
              <option value="Local">Local (Offline)</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="text-sm mb-1 block">LOD Level: {lodLevel}</label>
            <input 
              type="range" 
              min={1} 
              max={5} 
              value={lodLevel}
              onChange={(e) => setLodLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-military-primary rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgba(30, 174, 219, 0.7) 0%, rgba(30, 174, 219, 0.7) ${(lodLevel-1)/4*100}%, rgba(30, 174, 219, 0.2) ${(lodLevel-1)/4*100}%, rgba(30, 174, 219, 0.2) 100%)`
              }}
            />
          </div>
          
          <div className="mb-4 flex items-center">
            <label className="text-sm mr-3">Height Exaggeration</label>
            <div 
              className={cn(
                "w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300",
                exaggeration ? "bg-military-info/70" : "bg-military-primary/70"
              )}
              onClick={() => setExaggeration(!exaggeration)}
            >
              <div 
                className={cn(
                  "absolute w-4 h-4 rounded-full bg-white top-1 transition-all duration-300",
                  exaggeration ? "right-1" : "left-1"
                )}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <MilitaryButton 
              size="sm" 
              className="flex items-center justify-center"
            >
              <Monitor size={14} className="mr-1" />
              Preview
            </MilitaryButton>
            
            <MilitaryButton 
              size="sm" 
              variant="info"
              className="flex items-center justify-center"
            >
              <Wrench size={14} className="mr-1" />
              Optimize
            </MilitaryButton>
          </div>
        </div>
        
        <div className="border border-military-info/30 rounded-md overflow-hidden relative">
          {/* Map preview */}
          <div className="aspect-square bg-military-primary/50 flex items-center justify-center relative">
            <Map size={48} className="text-military-info/50" />
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <div className="scanner-line"></div>
            
            <div className="absolute bottom-2 left-2 text-xs bg-military-primary/80 px-2 py-1 rounded border border-military-info/30">
              Terrain: {dataSource}
            </div>
            
            <div className="absolute top-2 right-2 text-xs bg-military-primary/80 px-2 py-1 rounded border border-military-info/30">
              LOD: {lodLevel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerrainEngine;
