
import React, { useState } from 'react';
import { Users, Activity, Map, User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserData {
  id: string;
  name: string;
  position: string;
  heartRate: number;
  fatigue: number;
  status: 'active' | 'inactive' | 'offline';
}

const UserTracking: React.FC<{ className?: string }> = ({ className }) => {
  const [userData, setUserData] = useState<UserData[]>([
    { id: 'U001', name: 'Capt. Sharma', position: 'A4-B2', heartRate: 72, fatigue: 15, status: 'active' },
    { id: 'U002', name: 'Lt. Verma', position: 'A3-C5', heartRate: 82, fatigue: 25, status: 'active' },
    { id: 'U003', name: 'Maj. Singh', position: 'B1-D3', heartRate: 68, fatigue: 10, status: 'active' },
    { id: 'U004', name: 'Sgt. Yadav', position: 'C2-D1', heartRate: 90, fatigue: 40, status: 'active' },
    { id: 'U005', name: 'Cpl. Kumar', position: 'B4-C2', heartRate: 75, fatigue: 30, status: 'inactive' },
    { id: 'U006', name: 'Lt. Col. Patel', position: 'A1-B1', heartRate: 65, fatigue: 20, status: 'active' },
    { id: 'U007', name: 'Sgt. Mishra', position: 'D4-D5', heartRate: 88, fatigue: 45, status: 'inactive' },
    { id: 'U008', name: 'Cpl. Gupta', position: 'C3-C4', heartRate: 78, fatigue: 35, status: 'active' },
    { id: 'U009', name: 'Pvt. Sharma', position: 'B3-A2', heartRate: 95, fatigue: 55, status: 'offline' },
    { id: 'U010', name: 'Maj. Reddy', position: 'D2-D3', heartRate: 70, fatigue: 25, status: 'active' },
  ]);
  
  const [showHeatmap, setShowHeatmap] = useState(true);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-military-success';
      case 'inactive':
        return 'text-military-warning';
      case 'offline':
        return 'text-military-danger';
      default:
        return 'text-military-text';
    }
  };
  
  const getHeartRateColor = (rate: number) => {
    if (rate < 70) return 'text-military-success';
    if (rate < 85) return 'text-military-info';
    return 'text-military-alert';
  };
  
  const getFatigueColor = (level: number) => {
    if (level < 20) return 'text-military-success';
    if (level < 40) return 'text-military-warning';
    return 'text-military-danger';
  };
  
  return (
    <div className={cn("military-panel p-4", className)}>
      <div className="flex items-center justify-between mb-4 border-b border-military-info/30 pb-2">
        <h3 className="text-lg font-bold flex items-center">
          <Users size={18} className="mr-2 text-military-info" />
          User Tracking Panel
        </h3>
        
        <div className="flex items-center space-x-3">
          <div 
            className={cn(
              "px-2 py-1 text-xs rounded-full border flex items-center cursor-pointer",
              showHeatmap 
                ? "bg-military-info/20 border-military-info/50 text-military-info" 
                : "bg-military-primary/50 border-military-info/20 text-military-text"
            )}
            onClick={() => setShowHeatmap(!showHeatmap)}
          >
            <Map size={12} className="mr-1" />
            Heatmap {showHeatmap ? 'Enabled' : 'Disabled'}
          </div>
          
          <div className="flex items-center text-xs">
            <Activity size={14} className="text-military-info mr-1" />
            <span>{userData.filter(u => u.status === 'active').length} Active</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="max-h-[350px] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 gap-2">
            {userData.map(user => (
              <div 
                key={user.id}
                className="border border-military-info/30 bg-military-primary/60 rounded p-2 flex items-center"
              >
                <div className="w-8 h-8 rounded-full bg-military-info/10 flex items-center justify-center border border-military-info/30 mr-3">
                  <User size={16} className="text-military-info" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{user.name}</span>
                    <span className={cn("text-xs flex items-center", getStatusColor(user.status))}>
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full mr-1",
                        user.status === 'active' ? 'bg-military-success animate-pulse' : 
                        user.status === 'inactive' ? 'bg-military-warning' : 
                        'bg-military-danger'
                      )}></span>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <span className="text-military-text/70 mr-1">ID:</span>
                      <span>{user.id}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-military-text/70 mr-1">Pos:</span>
                      <span>{user.position}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex items-center text-xs">
                      <Heart size={10} className={cn("mr-1", getHeartRateColor(user.heartRate))} />
                      <span className={getHeartRateColor(user.heartRate)}>{user.heartRate} BPM</span>
                    </div>
                    
                    <div className="w-24">
                      <div className="text-xs flex justify-between mb-1">
                        <span>Fatigue</span>
                        <span className={getFatigueColor(user.fatigue)}>{user.fatigue}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-military-primary/80 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            user.fatigue < 20 ? "bg-military-success" :
                            user.fatigue < 40 ? "bg-military-warning" :
                            "bg-military-danger"
                          )}
                          style={{ width: `${user.fatigue}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Heatmap visualization */}
        <div className="border border-military-info/30 rounded-md overflow-hidden bg-military-primary/50 flex items-center justify-center relative aspect-square">
          <div className="absolute inset-0 grid-bg opacity-30"></div>
          
          {showHeatmap && (
            <div className="absolute inset-0">
              {/* Simulated heatmap paths */}
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                <path 
                  d="M10,20 C30,40 50,30 70,50 L90,80" 
                  stroke="rgba(30, 174, 219, 0.7)" 
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4,2"
                />
                <path 
                  d="M20,10 C40,30 60,50 80,60" 
                  stroke="rgba(30, 174, 219, 0.5)" 
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4,2"
                />
                <path 
                  d="M15,50 C25,60 45,70 65,40" 
                  stroke="rgba(249, 115, 22, 0.6)" 
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4,2"
                />
                <path 
                  d="M30,80 C50,60 70,40 90,20" 
                  stroke="rgba(30, 174, 219, 0.6)" 
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4,2"
                />
                
                {/* Active user dots */}
                <circle cx="70" cy="50" r="3" fill="#2E7D32" className="animate-pulse" />
                <circle cx="30" cy="40" r="3" fill="#2E7D32" className="animate-pulse" />
                <circle cx="50" cy="70" r="3" fill="#2E7D32" className="animate-pulse" />
                <circle cx="80" cy="30" r="3" fill="#2E7D32" className="animate-pulse" />
                <circle cx="20" cy="60" r="3" fill="#FFB74D" />
                <circle cx="60" cy="20" r="3" fill="#2E7D32" className="animate-pulse" />
                <circle cx="40" cy="80" r="3" fill="#2E7D32" className="animate-pulse" />
                <circle cx="90" cy="60" r="3" fill="#C62828" />
              </svg>
            </div>
          )}
          
          <div className="scanner-line"></div>
          
          <div className="absolute bottom-2 left-2 text-xs bg-military-primary/80 px-2 py-1 rounded border border-military-info/30">
            {showHeatmap ? 'Heatmap Active' : 'Heatmap Disabled'}
          </div>
          
          <div className="absolute top-2 right-2 text-xs bg-military-primary/80 px-2 py-1 rounded border border-military-info/30">
            Grid: A1-D5
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTracking;
