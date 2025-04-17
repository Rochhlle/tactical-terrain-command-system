
import React, { useState } from 'react';
import StatusBar from '@/components/ui-military/StatusBar';
import TerrainList from '@/components/ui-military/TerrainList';
import EnvironmentToggle from '@/components/ui-military/EnvironmentToggle';
import ShockSuitPanel from '@/components/ui-military/ShockSuitPanel';
import DeploymentPanel from '@/components/ui-military/DeploymentPanel';
import MissionTimeline from '@/components/ui-military/MissionTimeline';
import QuickCommands from '@/components/ui-military/QuickCommands';
import Footer from '@/components/ui-military/Footer';
import { AlertTriangle } from 'lucide-react';
import MilitaryButton from '@/components/ui-military/MilitaryButton';
import { useToast } from '@/hooks/use-toast';

const TabletInterface: React.FC = () => {
  const [selectedTerrainId, setSelectedTerrainId] = useState<string>('siachen');
  const [systemStatus, setSystemStatus] = useState<'green' | 'yellow' | 'red'>('green');
  const [missionPhase, setMissionPhase] = useState('Planning');
  const [alerts, setAlerts] = useState(0);
  const { toast } = useToast();
  
  const handleSelectTerrain = (terrainId: string) => {
    setSelectedTerrainId(terrainId);
    toast({
      title: "Terrain Selected",
      description: `Loading terrain: ${terrainId.toUpperCase()}`,
    });
  };
  
  const handleEmergencyShutdown = () => {
    setSystemStatus('red');
    setAlerts(3);
    toast({
      title: "EMERGENCY SHUTDOWN INITIATED",
      description: "System entering safe mode. Please contact your administrator.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-military-background">
      {/* Header Status Bar */}
      <StatusBar 
        systemStatus={systemStatus}
        missionPhase={missionPhase}
        alerts={alerts}
      />
      
      {/* Main Content Area */}
      <div className="p-4 overflow-y-auto">
        <div className="flex flex-col space-y-6">
          {/* Terrain Selection */}
          <TerrainList 
            onSelectTerrain={handleSelectTerrain}
            selectedTerrainId={selectedTerrainId}
          />
          
          {/* Control Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EnvironmentToggle />
            <ShockSuitPanel />
            <QuickCommands />
          </div>
          
          {/* Timeline and Deployment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MissionTimeline />
            <DeploymentPanel />
          </div>
          
          {/* Emergency Button */}
          <div className="flex justify-center my-4">
            <MilitaryButton
              variant="danger"
              glow={true}
              className="px-8 py-3"
              onClick={handleEmergencyShutdown}
            >
              <AlertTriangle size={18} className="mr-2" />
              SAFE MODE / EMERGENCY SHUTDOWN
            </MilitaryButton>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TabletInterface;
