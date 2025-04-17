
import React, { useState } from 'react';
import { Bot, Brain, Flag, Target, AlertTriangle } from 'lucide-react';
import MilitaryButton from '../MilitaryButton';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AIUnit {
  id: string;
  type: string;
  aggression: number; // 1-5
  pathMode: 'ambush' | 'patrol' | 'charge';
  active: boolean;
  position: { x: number; y: number };
}

const AIScenario: React.FC<{ className?: string }> = ({ className }) => {
  const [units, setUnits] = useState<AIUnit[]>([
    { 
      id: 'ai-inf-1', 
      type: 'Infantry Squad', 
      aggression: 3, 
      pathMode: 'patrol', 
      active: true,
      position: { x: 75, y: 25 }
    },
    { 
      id: 'ai-inf-2', 
      type: 'Sniper Team', 
      aggression: 2, 
      pathMode: 'ambush', 
      active: true,
      position: { x: 80, y: 40 }
    },
    { 
      id: 'ai-veh-1', 
      type: 'Armored Vehicle', 
      aggression: 4, 
      pathMode: 'charge', 
      active: false,
      position: { x: 60, y: 70 }
    }
  ]);
  
  const [terrainAware, setTerrainAware] = useState(true);
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(true);
  const { toast } = useToast();
  
  const toggleUnitActive = (unitId: string) => {
    setUnits(units.map(unit => 
      unit.id === unitId ? { ...unit, active: !unit.active } : unit
    ));
  };
  
  const changeAggression = (unitId: string, value: number) => {
    setUnits(units.map(unit => 
      unit.id === unitId ? { ...unit, aggression: value } : unit
    ));
  };
  
  const changePathMode = (unitId: string, mode: 'ambush' | 'patrol' | 'charge') => {
    setUnits(units.map(unit => 
      unit.id === unitId ? { ...unit, pathMode: mode } : unit
    ));
  };
  
  const handleDeployAI = () => {
    const activeUnits = units.filter(unit => unit.active);
    if (activeUnits.length === 0) {
      toast({
        title: "No Active Units",
        description: "Please activate at least one AI unit before deployment.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "AI Units Deployed",
      description: `${activeUnits.length} units have been deployed to the simulation.`
    });
  };
  
  return (
    <div className={cn("military-panel p-4", className)}>
      <div className="flex items-center justify-between mb-4 border-b border-military-info/30 pb-2">
        <h3 className="text-lg font-bold flex items-center">
          <Bot size={18} className="mr-2 text-military-info" />
          AI Scenario Manager
        </h3>
        
        <div className="flex items-center space-x-3">
          <div 
            className={cn(
              "flex items-center space-x-1 cursor-pointer",
              terrainAware ? "text-military-success" : "text-military-text/50"
            )}
            onClick={() => setTerrainAware(!terrainAware)}
          >
            <Flag size={14} />
            <span className="text-xs">Terrain-Aware</span>
          </div>
          
          <div 
            className={cn(
              "flex items-center space-x-1 cursor-pointer",
              adaptiveDifficulty ? "text-military-info" : "text-military-text/50"
            )}
            onClick={() => setAdaptiveDifficulty(!adaptiveDifficulty)}
          >
            <Brain size={14} />
            <span className="text-xs">Adaptive</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {units.map(unit => (
          <div 
            key={unit.id}
            className={cn(
              "border rounded-md p-3",
              unit.active 
                ? "bg-military-primary/70 border-military-info/30" 
                : "bg-military-primary/50 border-military-info/20 opacity-70"
            )}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full border flex items-center justify-center mr-2",
                    unit.active 
                      ? "border-military-info bg-military-info/10 text-military-info" 
                      : "border-military-text/30 bg-military-primary text-military-text/50"
                  )}
                >
                  {unit.type.includes('Infantry') || unit.type.includes('Sniper') ? (
                    <Target size={14} />
                  ) : (
                    <AlertTriangle size={14} />
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm">{unit.type}</div>
                  <div className="text-xs text-military-text/70">
                    Position: {unit.position.x},{unit.position.y}
                  </div>
                </div>
              </div>
              
              <div>
                <button
                  className={cn(
                    "px-2 py-1 rounded-full border text-xs",
                    unit.active 
                      ? "bg-military-success/10 border-military-success/50 text-military-success" 
                      : "bg-military-danger/10 border-military-danger/50 text-military-danger"
                  )}
                  onClick={() => toggleUnitActive(unit.id)}
                >
                  {unit.active ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs">Aggression Level: {unit.aggression}</label>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={5} 
                  value={unit.aggression}
                  onChange={(e) => changeAggression(unit.id, parseInt(e.target.value))}
                  disabled={!unit.active}
                  className="w-full h-1.5 bg-military-primary/80 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: !unit.active 
                      ? 'rgba(224, 224, 224, 0.1)' 
                      : `linear-gradient(to right, rgba(30, 174, 219, 0.3) 0%, rgba(249, 115, 22, 0.7) 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-military-text/70 mt-1">
                  <span>Defensive</span>
                  <span>Aggressive</span>
                </div>
              </div>
              
              <div>
                <label className="text-xs block mb-1">Path Mode</label>
                <div className="flex space-x-1">
                  <button
                    className={cn(
                      "flex-1 px-2 py-1 rounded text-xs border",
                      unit.pathMode === 'ambush' && unit.active
                        ? "bg-military-info/10 border-military-info/50 text-military-info" 
                        : "bg-military-primary/70 border-military-info/20 text-military-text/70"
                    )}
                    onClick={() => unit.active && changePathMode(unit.id, 'ambush')}
                    disabled={!unit.active}
                  >
                    Ambush
                  </button>
                  
                  <button
                    className={cn(
                      "flex-1 px-2 py-1 rounded text-xs border",
                      unit.pathMode === 'patrol' && unit.active
                        ? "bg-military-info/10 border-military-info/50 text-military-info" 
                        : "bg-military-primary/70 border-military-info/20 text-military-text/70"
                    )}
                    onClick={() => unit.active && changePathMode(unit.id, 'patrol')}
                    disabled={!unit.active}
                  >
                    Patrol
                  </button>
                  
                  <button
                    className={cn(
                      "flex-1 px-2 py-1 rounded text-xs border",
                      unit.pathMode === 'charge' && unit.active
                        ? "bg-military-info/10 border-military-info/50 text-military-info" 
                        : "bg-military-primary/70 border-military-info/20 text-military-text/70"
                    )}
                    onClick={() => unit.active && changePathMode(unit.id, 'charge')}
                    disabled={!unit.active}
                  >
                    Charge
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between">
        <MilitaryButton 
          variant="info" 
          className="flex items-center"
          onClick={handleDeployAI}
        >
          <Bot size={16} className="mr-2" />
          Deploy AI Units
        </MilitaryButton>
        
        <MilitaryButton 
          size="sm" 
          className="flex items-center"
        >
          <Flag size={14} className="mr-1" />
          Add New Unit
        </MilitaryButton>
      </div>
    </div>
  );
};

export default AIScenario;
