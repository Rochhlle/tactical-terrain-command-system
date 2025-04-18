import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '@/components/ui-military/StatusBar';
import TerrainList from '@/components/ui-military/TerrainList';
import EnvironmentToggle from '@/components/ui-military/EnvironmentToggle';
import ShockSuitPanel from '@/components/ui-military/ShockSuitPanel';
import DeploymentPanel from '@/components/ui-military/DeploymentPanel';
import MissionTimeline from '@/components/ui-military/MissionTimeline';
import QuickCommands from '@/components/ui-military/QuickCommands';
import Footer from '@/components/ui-military/Footer';
import { AlertTriangle, ArrowLeft, Settings, Moon, Loader } from 'lucide-react';
import MilitaryButton from '@/components/ui-military/MilitaryButton';
import { useToast } from '@/hooks/use-toast';
import CommandView from '@/components/ui-military/AdminPanels/CommandView';
import TerrainEngine from '@/components/ui-military/AdminPanels/TerrainEngine';

const TabletInterface: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTerrainId, setSelectedTerrainId] = useState<string>('siachen');
  const [systemStatus, setSystemStatus] = useState<'green' | 'yellow' | 'red'>('green');
  const [missionPhase, setMissionPhase] = useState('Planning');
  const [alerts, setAlerts] = useState(0);
  const [safeMode, setSafeMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHUD, setShowHUD] = useState(false);
  const [loadingTerrain, setLoadingTerrain] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleSelectTerrain = (terrainId: string) => {
    setSelectedTerrainId(terrainId);
    setLoadingTerrain(terrainId);
    setShowHUD(true);
    
    // Simulate loading
    setTimeout(() => {
      toast({
        title: "Terrain Selected",
        description: `Loading terrain: ${terrainId.toUpperCase()}`,
      });
      
      setTimeout(() => {
        setLoadingTerrain(null);
        
        setTimeout(() => {
          setShowHUD(false);
        }, 1000);
      }, 2000);
    }, 500);
  };
  
  const handleEmergencyShutdown = () => {
    setSafeMode(true);
    setSystemStatus('red');
    setAlerts(3);
    toast({
      title: "EMERGENCY SHUTDOWN INITIATED",
      description: "System entering safe mode. Please contact your administrator.",
      variant: "destructive",
    });
    
    // Reset after 5 seconds
    setTimeout(() => {
      setSafeMode(false);
      setSystemStatus('green');
      setAlerts(0);
    }, 5000);
  };

  const terrainNames = {
    'siachen': 'Siachen Glacier',
    'galwan': 'Galwan Valley',
    'thar': 'Thar Desert',
    'kupwara': 'Kupwara Forest'
  };

  // Sticky top bar component
  const TopControlBar = () => (
    <div className="sticky top-0 z-30 bg-military-primary/90 border-b border-gray-700 py-3 px-4 flex justify-between items-center shadow-md backdrop-blur-sm">
      <div className="flex items-center">
        <MilitaryButton 
          size="sm" 
          variant="default" 
          className="mr-3"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} />
          Back
        </MilitaryButton>
        <h2 className="text-lg font-jetbrains text-military-info/90">
          {selectedTerrainId ? terrainNames[selectedTerrainId as keyof typeof terrainNames] : 'Tactical View'} 
          <span className="ml-2 text-xs bg-military-primary px-2 py-0.5 rounded border border-gray-700">
            ACTIVE
          </span>
        </h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <MilitaryButton
          size="sm"
          variant="info"
          className="flex items-center px-3"
        >
          <Settings size={14} className="mr-1" />
          Controls
        </MilitaryButton>
        
        <MilitaryButton
          size="sm"
          variant="default"
          className="flex items-center px-3"
        >
          <Moon size={14} className="mr-1" />
          Night Mode
        </MilitaryButton>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-military-background">
      {/* Header Status Bar */}
      <StatusBar 
        systemStatus={systemStatus}
        missionPhase={missionPhase}
        alerts={alerts}
      />
      
      {/* Sticky top control bar */}
      <TopControlBar />
      
      {/* Main Content Area */}
      <div className="p-6 overflow-y-auto">
        <div className="flex flex-col space-y-6">
          {/* Terrain Selection */}
          <TerrainList 
            onSelectTerrain={handleSelectTerrain}
            selectedTerrainId={selectedTerrainId}
          />
          
          {/* Control Panels - 3 column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EnvironmentToggle />
            <ShockSuitPanel />
            <QuickCommands />
          </div>
          
          {/* Two column layout for command view and tactical details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CommandView />
            <TerrainEngine />
          </div>
          
          {/* Timeline and Deployment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MissionTimeline />
            <DeploymentPanel />
          </div>
          
          {/* Emergency Button */}
          <div className="flex justify-center my-6">
            <MilitaryButton
              variant="danger"
              glow={true}
              className="px-8 py-3 text-lg hover:bg-military-danger/30 active:scale-95 transition-all duration-200"
              onClick={handleEmergencyShutdown}
            >
              <AlertTriangle size={18} className="mr-2" />
              SAFE MODE / EMERGENCY SHUTDOWN
            </MilitaryButton>
          </div>
        </div>
      </div>
      
      {/* Safe Mode Warning Banner */}
      {safeMode && (
        <div className="fixed inset-x-0 top-16 z-50 bg-military-danger/20 border-y border-military-danger/50 py-2 text-center animate-pulse">
          <div className="flex items-center justify-center text-military-danger">
            <AlertTriangle size={16} className="mr-2" />
            <span className="font-bold">SAFE MODE ENABLED - SIMULATION HALTED</span>
          </div>
        </div>
      )}
      
      {/* HUD Overlay for Loading */}
      {showHUD && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="text-military-info text-lg font-jetbrains border-2 border-military-info/50 px-8 py-6 rounded-md bg-military-primary/90 shadow-lg">
            <div className="flex flex-col items-center">
              <Loader size={32} className="animate-spin mb-4 text-military-info" />
              <div className="text-xl mb-1">Loading Terrain Data...</div>
              {loadingTerrain && (
                <div className="text-md mt-2 text-military-info/90 flex flex-col items-center">
                  <span>{terrainNames[loadingTerrain as keyof typeof terrainNames]}</span>
                  <span className="text-xs mt-2 text-gray-400">Tactical Simulation Environment</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TabletInterface;
