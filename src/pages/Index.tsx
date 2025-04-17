
import React, { useState } from 'react';
import MilitaryButton from '@/components/ui-military/MilitaryButton';
import { Monitor, Tablet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [loadingInterface, setLoadingInterface] = useState<string | null>(null);
  
  const handleSelectInterface = (type: 'tablet' | 'desktop') => {
    setLoadingInterface(type);
    
    // Simulate loading time
    setTimeout(() => {
      if (type === 'tablet') {
        navigate('/tablet');
      } else {
        navigate('/desktop');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-military-background relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      {/* Background data flow lines */}
      <div className="absolute inset-0">
        <div className="data-flow top-1/4"></div>
        <div className="data-flow top-2/4" style={{ animationDelay: '1s' }}></div>
        <div className="data-flow top-3/4" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="z-10 w-full max-w-3xl px-6 py-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-military-info mb-3 tracking-tighter">
            PROJECT KAAL
          </h1>
          <p className="text-xl text-military-text/80 mb-6">
            Next-Generation Indian Military 3D Terrain Simulation Room
          </p>
          <div className="border-b border-military-info/30 w-32 mx-auto"></div>
        </div>
        
        <div className="military-panel p-8 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Select Interface Type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              className={`military-card p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${loadingInterface === 'tablet' ? 'border-military-info' : ''}`}
              onClick={() => handleSelectInterface('tablet')}
            >
              {loadingInterface === 'tablet' ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <svg className="animate-spin h-8 w-8 text-military-info mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-military-info">Initializing Tablet Interface...</p>
                </div>
              ) : (
                <>
                  <div className="bg-military-info/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-military-info/30">
                    <Tablet size={36} className="text-military-info" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Tactical Command Tablet</h3>
                  <p className="text-sm text-military-text/70 mb-4">
                    Touch-optimized interface for on-ground officers using a rugged tablet.
                  </p>
                  <MilitaryButton variant="info" size="sm">
                    Launch Tablet Interface
                  </MilitaryButton>
                </>
              )}
            </div>
            
            <div 
              className={`military-card p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${loadingInterface === 'desktop' ? 'border-military-info' : ''}`}
              onClick={() => handleSelectInterface('desktop')}
            >
              {loadingInterface === 'desktop' ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <svg className="animate-spin h-8 w-8 text-military-info mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-military-info">Initializing Desktop Interface...</p>
                </div>
              ) : (
                <>
                  <div className="bg-military-info/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-military-info/30">
                    <Monitor size={36} className="text-military-info" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">System Control Desktop</h3>
                  <p className="text-sm text-military-text/70 mb-4">
                    Advanced interface for simulation engineers and mission commanders.
                  </p>
                  <MilitaryButton variant="info" size="sm">
                    Launch Desktop Interface
                  </MilitaryButton>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10 text-xs text-military-text/50">
          <p>Project KAAL Command Nexus - v1.0 - Confidential Training Tool</p>
          <p className="mt-1">iDEX Submission Build - Terrain Simulation Core</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
