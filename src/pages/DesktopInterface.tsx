
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
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TerrainEngine />
            <UserTracking />
          </div>
          
          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SensoryFX />
            <AudioFX />
            <AIScenario />
          </div>
          
          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CommandView />
            <SessionRecorder />
          </div>
          
          {/* Chat Communications */}
          <ChatComms />
          
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

export default DesktopInterface;
