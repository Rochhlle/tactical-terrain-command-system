import React, { useState } from 'react';
import { Volume2, Play, Pause, Volume, VolumeX, Layers } from 'lucide-react';
import MilitaryButton from '../MilitaryButton';
import { cn } from '@/lib/utils';

interface AudioZone {
  id: string;
  name: string;
  active: boolean;
  volume: number;
}

interface SoundEffect {
  id: string;
  name: string;
  duration: string;
  isPlaying: boolean;
}

const AudioFX: React.FC<{ className?: string }> = ({ className }) => {
  const [audioZones, setAudioZones] = useState<AudioZone[]>([
    { id: 'zone-1', name: 'Ambient Combat', active: true, volume: 60 },
    { id: 'zone-2', name: 'Weather Effects', active: true, volume: 80 },
    { id: 'zone-3', name: 'Command Channel', active: true, volume: 100 },
    { id: 'zone-4', name: 'Terrain Acoustics', active: false, volume: 0 },
  ]);
  
  const [soundEffects, setSoundEffects] = useState<SoundEffect[]>([
    { id: 'sfx-1', name: 'Jet Flyover', duration: '0:08', isPlaying: false },
    { id: 'sfx-2', name: 'Explosion', duration: '0:03', isPlaying: false },
    { id: 'sfx-3', name: 'Helicopter', duration: '0:12', isPlaying: false },
    { id: 'sfx-4', name: 'Radio Chatter', duration: '0:15', isPlaying: false },
  ]);
  
  const [masterVolume, setMasterVolume] = useState(80);
  const [masterMuted, setMasterMuted] = useState(false);
  
  const toggleAudioZone = (zoneId: string) => {
    setAudioZones(audioZones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, active: !zone.active, volume: !zone.active ? 70 : 0 } 
        : zone
    ));
  };
  
  const toggleSoundEffect = (effectId: string) => {
    setSoundEffects(soundEffects.map(effect => 
      effect.id === effectId 
        ? { ...effect, isPlaying: !effect.isPlaying } 
        : effect
    ));
    
    if (soundEffects.find(e => e.id === effectId)?.isPlaying === false) {
      setTimeout(() => {
        setSoundEffects(prev => prev.map(effect => 
          effect.id === effectId ? { ...effect, isPlaying: false } : effect
        ));
      }, 3000);
    }
  };
  
  const handleVolumeChange = (zoneId: string, value: number) => {
    setAudioZones(audioZones.map(zone => 
      zone.id === zoneId ? { ...zone, volume: value } : zone
    ));
  };
  
  const toggleMasterMute = () => {
    setMasterMuted(!masterMuted);
  };
  
  return (
    <div className={cn("military-panel p-4", className)}>
      <div className="flex items-center justify-between mb-4 border-b border-military-info/30 pb-2">
        <h3 className="text-lg font-bold flex items-center">
          <Volume2 size={18} className="mr-2 text-military-info" />
          Audio FX Control
        </h3>
        
        <div className="flex items-center">
          <button 
            className={cn(
              "p-1 rounded-full border mr-2",
              masterMuted 
                ? "border-military-danger/50 bg-military-danger/10 text-military-danger" 
                : "border-military-info/50 bg-military-info/10 text-military-info"
            )}
            onClick={toggleMasterMute}
          >
            {masterMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          <div className="w-24 flex items-center">
            <span className="text-xs mr-2">Vol</span>
            <input 
              type="range" 
              min={0} 
              max={100} 
              value={masterMuted ? 0 : masterVolume}
              onChange={(e) => setMasterVolume(parseInt(e.target.value))}
              disabled={masterMuted}
              className="w-full h-1.5 bg-military-primary rounded-lg appearance-none cursor-pointer"
              style={{
                background: masterMuted 
                  ? 'rgba(198, 40, 40, 0.3)' 
                  : `linear-gradient(to right, rgba(30, 174, 219, 0.7) 0%, rgba(30, 174, 219, 0.7) ${masterVolume}%, rgba(30, 174, 219, 0.2) ${masterVolume}%, rgba(30, 174, 219, 0.2) 100%)`
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-3 border-b border-military-info/20 pb-1">
            <Layers size={14} className="inline mr-1 text-military-info" />
            Spatial Audio Zones
          </h4>
          
          <div className="space-y-3">
            {audioZones.map(zone => (
              <div key={zone.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleAudioZone(zone.id)}
                  >
                    <div className={cn(
                      "w-3 h-3 rounded-full mr-2",
                      zone.active 
                        ? "bg-military-info animate-pulse" 
                        : "bg-military-text/30"
                    )}></div>
                    <span className="text-sm">{zone.name}</span>
                  </div>
                  
                  <div className="text-xs">
                    {zone.active ? `${zone.volume}%` : 'Off'}
                  </div>
                </div>
                
                <input 
                  type="range" 
                  min={0} 
                  max={100} 
                  value={zone.volume}
                  onChange={(e) => handleVolumeChange(zone.id, parseInt(e.target.value))}
                  disabled={!zone.active}
                  className="w-full h-1.5 bg-military-primary/80 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: !zone.active 
                      ? 'rgba(224, 224, 224, 0.1)' 
                      : `linear-gradient(to right, rgba(30, 174, 219, 0.7) 0%, rgba(30, 174, 219, 0.7) ${zone.volume}%, rgba(30, 174, 219, 0.2) ${zone.volume}%, rgba(30, 174, 219, 0.2) 100%)`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3 border-b border-military-info/20 pb-1">
            <Play size={14} className="inline mr-1 text-military-info" />
            Sound Test Triggers
          </h4>
          
          <div className="space-y-2">
            {soundEffects.map(effect => (
              <div 
                key={effect.id}
                className={cn(
                  "flex justify-between items-center p-2 border rounded",
                  effect.isPlaying 
                    ? "bg-military-info/10 border-military-info/50" 
                    : "bg-military-primary/50 border-military-info/20"
                )}
              >
                <div className="flex items-center">
                  <button
                    className={cn(
                      "w-8 h-8 rounded-full border flex items-center justify-center mr-2",
                      effect.isPlaying 
                        ? "border-military-info bg-military-info/20" 
                        : "border-military-info/30 bg-military-primary/70"
                    )}
                    onClick={() => toggleSoundEffect(effect.id)}
                  >
                    {effect.isPlaying ? 
                      <Pause size={14} className="text-military-info" /> : 
                      <Play size={14} className="text-military-text" />
                    }
                  </button>
                  <span className="text-sm">{effect.name}</span>
                </div>
                
                <div className="flex items-center text-xs">
                  {effect.isPlaying ? (
                    <span className="text-military-info flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-military-info animate-pulse mr-1"></span>
                      Playing
                    </span>
                  ) : (
                    <span>{effect.duration}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioFX;
