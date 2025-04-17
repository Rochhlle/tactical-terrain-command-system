import React from 'react';
import { Clock, AlertTriangle, Shield, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StatusBarProps {
  systemStatus: 'green' | 'yellow' | 'red';
  missionPhase: string;
  alerts?: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  systemStatus = 'green', 
  missionPhase = 'Planning', 
  alerts = 0 
}) => {
  const [time, setTime] = React.useState(new Date());
  const { toast } = useToast();
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleAlertClick = () => {
    if (alerts > 0) {
      toast({
        title: "System Alerts",
        description: `${alerts} alerts require your attention.`,
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="military-panel flex items-center justify-between px-4 py-2 text-sm">
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/e8bf466e-32fa-4383-8a40-e80668c31ae9.png" 
            alt="KAAL Command Nexus Logo" 
            className="h-8 w-8 mr-3" 
          />
          <span className="font-bold tracking-wider">KAAL COMMAND NEXUS</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">System Status:</span>
          {systemStatus === 'green' && (
            <span className="flex items-center text-military-success">
              <span className="status-green"></span> GREEN
            </span>
          )}
          {systemStatus === 'yellow' && (
            <span className="flex items-center text-military-warning animate-pulse">
              <span className="status-yellow"></span> YELLOW
            </span>
          )}
          {systemStatus === 'red' && (
            <span className="flex items-center text-military-danger animate-pulse">
              <span className="status-red"></span> RED
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <Clock size={16} className="mr-2 text-military-info" />
          <span className="font-mono">{formatTime(time)}</span>
        </div>
        
        <div className="flex items-center">
          <Shield size={16} className="mr-2 text-military-info" />
          <span>Phase: {missionPhase}</span>
        </div>
        
        <div 
          className="flex items-center cursor-pointer hover:text-military-info transition-colors" 
          onClick={handleAlertClick}
        >
          {alerts > 0 ? (
            <>
              <Bell size={16} className="mr-2 text-military-alert animate-pulse" />
              <span className="text-military-alert">{alerts} Alerts</span>
            </>
          ) : (
            <>
              <Bell size={16} className="mr-2" />
              <span>No Alerts</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
