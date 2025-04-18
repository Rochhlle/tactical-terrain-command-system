import React, { useState } from 'react';
import StatusBar from '@/components/ui-military/StatusBar';
import TerrainEngine from '@/components/ui-military/AdminPanels/TerrainEngine';
import UserTracking from '@/components/ui-military/AdminPanels/UserTracking';
import SensoryFX from '@/components/ui-military/AdminPanels/SensoryFX';
import AudioFX from '@/components/ui-military/AdminPanels/AudioFX';
import AIScenario from '@/components/ui-military/AdminPanels/AIScenario';
import CommandView from '@/components/ui-military/AdminPanels/CommandView';
import SessionRecorder from '@/components/ui-military/AdminPanels/SessionRecorder';
import ChatComms from '@/components/ui-military/AdminPanels/ChatComms';
import Footer from '@/components/ui-military/Footer';
import HUDStatusBar from '@/components/ui-military/HUDStatusBar';
import EventLog from '@/components/ui-military/EventLog';
import { AlertTriangle } from 'lucide-react';
import MilitaryButton from '@/components/ui-military/MilitaryButton';
import { useToast } from '@/hooks/use-toast';

const DesktopInterface: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<'green' | 'yellow' | 'red'>('green');
  const [missionPhase, setMissionPhase] = useState('Configuration');
  const [alerts, setAlerts] = useState(0);
  const { toast } = useToast();
  
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
    <div className="min-h-screen grid grid-rows-[auto_auto_1fr_auto] bg-military-background">
      <StatusBar 
        systemStatus={systemStatus}
        missionPhase={missionPhase}
        alerts={alerts}
      />
      
      <HUDStatusBar mode="COMMAND CENTER" />
      
      <div className="p-6 overflow-y-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TerrainEngine />
          <UserTracking />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SensoryFX />
          <AudioFX />
          <AIScenario />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CommandView />
          <div className="space-y-6">
            <SessionRecorder />
            <EventLog />
          </div>
        </div>
        
        <ChatComms />
        
        <div className="flex justify-center my-4">
          <MilitaryButton
            variant="danger"
            glow={true}
            className="px-8 py-3 text-lg hover:bg-military-danger/30 active:scale-95 transition-all duration-200"
            onClick={handleEmergencyShutdown}
          >
            <AlertTriangle size={18} className="mr-2" />
            EMERGENCY PROTOCOL OVERRIDE
          </MilitaryButton>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DesktopInterface;
