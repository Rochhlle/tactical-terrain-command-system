import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '@/components/ui-military/StatusBar';
import TerrainList from '@/components/ui-military/TerrainList';
import EnvironmentToggle from '@/components/ui-military/EnvironmentToggle';
import ShockSuitPanel from '@/components/ui-military/ShockSuitPanel';
import DeploymentPanel from '@/components/ui-military/DeploymentPanel';
import MissionTimeline from '@/components/ui-military/MissionTimeline';
import QuickCommands from '@/components/ui-military/QuickCommands';
import Footer from '@/components/ui-military/Footer';
import HUDStatusBar from '@/components/ui-military/HUDStatusBar';
import EventLog from '@/components/ui-military/EventLog';
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
    
    toast({
      title: "INITIATING TERRAIN PROTOCOL",
      description: `Loading tactical environment: ${terrainId.toUpperCase()}`,
    });
    
    setTimeout(() => {
      toast({
        title: "TERRAIN SYNC IN PROGRESS",
        description: "Establishing environmental parameters...",
      });
      
      setTimeout(() => {
        setLoadingTerrain(null);
        toast({
          title: "TERRAIN LOADED SUCCESSFULLY",
          description: "Tactical view ready for operation.",
          variant: "success",
        });
        
        setTimeout(() => {
          setShowHUD(false);
        }, 1000);
      }, 2000);
    }, 1500);
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
    <div className="min-h-screen grid grid-rows-[auto_auto_1fr_auto] bg-military-background">
      <StatusBar 
        systemStatus={systemStatus}
        missionPhase={missionPhase}
        alerts={alerts}
      />
      
      <HUDStatusBar 
        terrain={selectedTerrainId.toUpperCase()}
        mode="TACTICAL SIMULATION"
      />
      
      <TopControlBar />
      
      <div className="p-6 overflow-y-auto space-y-6">
        <TerrainList 
          onSelectTerrain={handleSelectTerrain}
          selectedTerrainId={selectedTerrainId}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <EnvironmentToggle />
          <ShockSuitPanel />
          <QuickCommands />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CommandView />
          <div className="space-y-6">
            <TerrainEngine />
            <EventLog />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MissionTimeline />
          <DeploymentPanel />
        </div>
        
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
      
      {safeMode && (
        <div className="fixed inset-x-0 top-16 z-50 bg-military-danger/20 border-y border-military-danger/50 py-2 text-center animate-pulse">
          <div className="flex items-center justify-center text-military-danger">
            <AlertTriangle size={16} className="mr-2" />
            <span className="font-bold">SAFE MODE ENABLED - SIMULATION HALTED</span>
          </div>
        </div>
      )}
      
      {showHUD && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="text-military-info font-jetbrains border-2 border-military-info/50 p-8 rounded-md bg-military-primary/90 shadow-lg max-w-md w-full">
            <div className="flex flex-col items-center">
              <Loader size={40} className="animate-spin mb-6 text-military-info" />
              <div className="text-xl mb-3 text-center">Initializing Operation Protocol</div>
              {loadingTerrain && (
                <div className="space-y-4 w-full">
                  <div className="text-md text-military-info/90 text-center">
                    <div className="font-bold mb-2">{terrainNames[loadingTerrain as keyof typeof terrainNames]}</div>
                    <div className="text-sm text-gray-400">Tactical Simulation Environment</div>
                  </div>
                  <div className="w-full bg-military-primary/50 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-military-info/50 animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  <div className="text-xs text-center text-gray-400">
                    Loading environmental parameters...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default TabletInterface;
