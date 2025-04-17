
import React, { useState, useEffect } from 'react';
import { Clock, Download, File, CheckCircle, Trash } from 'lucide-react';
import MilitaryButton from '../MilitaryButton';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error';
}

const SessionRecorder: React.FC<{ className?: string }> = ({ className }) => {
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '10:15:22', message: 'Session initialized', type: 'info' },
    { id: '2', timestamp: '10:15:45', message: 'User tracking enabled', type: 'info' },
    { id: '3', timestamp: '10:16:12', message: 'Low system memory warning', type: 'warning' }
  ]);
  const [exportingLog, setExportingLog] = useState(false);
  const { toast } = useToast();
  
  // Timer for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (recording) {
      interval = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
        
        // Randomly add a log entry during recording
        if (Math.random() > 0.95) {
          const types = ['info', 'warning', 'error'] as const;
          const randomType = types[Math.floor(Math.random() * types.length)];
          const randomMessages = {
            info: [
              'Environment status updated',
              'User position recorded',
              'Audio zone activated',
              'New terrain chunk loaded'
            ],
            warning: [
              'System resource usage high',
              'Network latency detected',
              'Render pipeline slowdown',
              'Audio sync delay detected'
            ],
            error: [
              'Sensor data lost',
              'Device connection failed',
              'Memory allocation error',
              'Data stream interrupted'
            ]
          };
          
          const newMessage = randomMessages[randomType][Math.floor(Math.random() * randomMessages[randomType].length)];
          const now = new Date();
          const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
          
          setLogs(prevLogs => [
            ...prevLogs,
            { 
              id: Date.now().toString(), 
              timestamp, 
              message: newMessage, 
              type: randomType 
            }
          ]);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [recording]);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleRecording = () => {
    if (!recording) {
      // Start recording
      setRecording(true);
      toast({
        title: "Recording Started",
        description: "Session recording has been initiated."
      });
    } else {
      // Stop recording
      setRecording(false);
      toast({
        title: "Recording Stopped",
        description: `Session recorded for ${formatTime(recordingTime)}.`
      });
    }
  };
  
  const handleExportLog = () => {
    setExportingLog(true);
    
    // Simulate export process
    setTimeout(() => {
      setExportingLog(false);
      toast({
        title: "Log Exported",
        description: "mission_report.log has been generated."
      });
    }, 2000);
  };
  
  const clearLogs = () => {
    setLogs([]);
    toast({
      title: "Logs Cleared",
      description: "All log entries have been cleared."
    });
  };
  
  return (
    <div className={cn("military-panel p-4", className)}>
      <div className="flex items-center justify-between mb-4 border-b border-military-info/30 pb-2">
        <h3 className="text-lg font-bold flex items-center">
          <Clock size={18} className="mr-2 text-military-info" />
          Session Recorder
        </h3>
        
        {recording && (
          <div className="flex items-center text-military-danger animate-pulse">
            <span className="inline-block w-2 h-2 rounded-full bg-military-danger mr-1"></span>
            <span className="text-xs">REC {formatTime(recordingTime)}</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-center">
            <MilitaryButton 
              variant={recording ? "alert" : "info"}
              glow={recording}
              className="w-full py-3 flex items-center justify-center"
              onClick={toggleRecording}
            >
              {recording ? (
                <>
                  <span className="inline-block w-2 h-2 rounded-full bg-military-danger animate-pulse mr-2"></span>
                  Stop Recording
                </>
              ) : (
                <>
                  <span className="inline-block w-2 h-2 rounded-full border border-military-info mr-2"></span>
                  Start Recording
                </>
              )}
            </MilitaryButton>
          </div>
          
          <div className="border border-military-info/30 rounded-md p-3 bg-military-primary/50">
            <div className="flex justify-between text-sm mb-2">
              <span>Session Info</span>
              {recording ? (
                <span className="text-military-success">Active</span>
              ) : (
                <span className="text-military-text/70">Standby</span>
              )}
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-military-text/70">Current Duration:</span>
                <span>{formatTime(recordingTime)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-military-text/70">Log Entries:</span>
                <span>{logs.length}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-military-text/70">Status:</span>
                <span className="text-military-info">
                  {recording ? 'Recording in progress' : 'Ready to record'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <MilitaryButton 
              size="sm" 
              variant="info"
              className="flex-1 flex items-center justify-center"
              onClick={handleExportLog}
              disabled={exportingLog || logs.length === 0}
            >
              {exportingLog ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Exporting...
                </span>
              ) : (
                <>
                  <Download size={14} className="mr-1" />
                  Export Log
                </>
              )}
            </MilitaryButton>
            
            <MilitaryButton 
              size="sm" 
              variant="danger"
              className="flex items-center justify-center"
              onClick={clearLogs}
              disabled={logs.length === 0}
            >
              <Trash size={14} className="mr-1" />
              Clear
            </MilitaryButton>
          </div>
        </div>
        
        <div className="border border-military-info/30 rounded-md overflow-hidden max-h-[200px]">
          <div className="bg-military-primary/70 py-1 px-2 border-b border-military-info/30 flex justify-between items-center">
            <div className="flex items-center text-xs">
              <File size={12} className="mr-1 text-military-info" />
              Session Logs
            </div>
            
            <div className="text-xs text-military-text/70">
              {logs.length} entries
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[164px] bg-military-primary/40 p-2">
            {logs.length > 0 ? (
              <div className="space-y-1">
                {logs.map(log => (
                  <div 
                    key={log.id}
                    className={cn(
                      "text-xs px-2 py-1 rounded border flex items-start",
                      log.type === 'info' 
                        ? "border-military-info/30 bg-military-info/5" 
                        : log.type === 'warning'
                          ? "border-military-warning/30 bg-military-warning/5" 
                          : "border-military-danger/30 bg-military-danger/5"
                    )}
                  >
                    <div className="w-14 text-military-text/70 flex-shrink-0">
                      {log.timestamp}
                    </div>
                    <div className={cn(
                      "mx-1 mt-0.5 w-2 h-2 rounded-full flex-shrink-0",
                      log.type === 'info' 
                        ? "bg-military-info" 
                        : log.type === 'warning'
                          ? "bg-military-warning" 
                          : "bg-military-danger"
                    )}></div>
                    <div className="flex-1">
                      {log.message}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-military-text/50 text-xs">
                <CheckCircle size={14} className="mr-1" />
                No logs available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionRecorder;
