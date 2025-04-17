
import React, { useState } from 'react';
import { MessageCircle, Send, Plus, User, UserCheck, Clock } from 'lucide-react';
import MilitaryButton from '../MilitaryButton';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

const ChatComms: React.FC<{ className?: string }> = ({ className }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'System', text: 'Communication channel initialized.', timestamp: '10:15:22', isSystem: true },
    { id: '2', sender: 'Capt. Sharma', text: 'Team Alpha in position, awaiting orders.', timestamp: '10:16:05' },
    { id: '3', sender: 'Lt. Verma', text: 'Confirm visual on primary objective.', timestamp: '10:16:30' },
    { id: '4', sender: 'Maj. Singh', text: 'Proceed with caution, possible hostiles at sector B3.', timestamp: '10:17:15' }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([
    { id: '1', name: 'Capt. Sharma', status: 'online' },
    { id: '2', name: 'Lt. Verma', status: 'online' },
    { id: '3', name: 'Maj. Singh', status: 'online' },
    { id: '4', name: 'Sgt. Yadav', status: 'inactive' },
    { id: '5', name: 'Cpl. Kumar', status: 'offline' }
  ]);
  
  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Commander',
      text: newMessage,
      timestamp
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    <div className={cn("military-panel p-4 h-full flex flex-col", className)}>
      <div className="flex items-center justify-between mb-4 border-b border-military-info/30 pb-2">
        <h3 className="text-lg font-bold flex items-center">
          <MessageCircle size={18} className="mr-2 text-military-info" />
          Comm Channel
        </h3>
        
        <div className="flex items-center space-x-3">
          <span className="text-xs flex items-center">
            <Clock size={12} className="mr-1 text-military-info" />
            {new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
          </span>
          
          <span className="text-xs flex items-center text-military-success">
            <UserCheck size={12} className="mr-1" />
            {onlineUsers.filter(u => u.status === 'online').length} Online
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 flex-1">
        <div className="col-span-2 flex flex-col h-[300px]">
          <div className="flex-1 overflow-y-auto border border-military-info/30 rounded-md bg-military-primary/50 mb-3 p-2">
            {messages.map(message => (
              <div 
                key={message.id}
                className={cn(
                  "mb-2 text-sm",
                  message.isSystem ? "text-military-info" : ""
                )}
              >
                <div className="flex justify-between text-xs mb-0.5">
                  <span className={cn(
                    "font-medium",
                    message.isSystem ? "text-military-info" : "text-military-text"
                  )}>
                    {message.sender}
                  </span>
                  <span className="text-military-text/50">{message.timestamp}</span>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded",
                  message.isSystem 
                    ? "bg-military-info/10 border border-military-info/30" 
                    : message.sender === 'Commander'
                      ? "bg-military-primary/80 border border-military-info/20" 
                      : "bg-military-primary/60 border border-military-info/10"
                )}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex">
            <textarea 
              className="flex-1 military-input h-16 resize-none mr-2 text-sm"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            
            <div className="flex flex-col space-y-1">
              <MilitaryButton 
                variant="info" 
                size="sm"
                className="flex items-center"
                onClick={sendMessage}
                disabled={newMessage.trim() === ''}
              >
                <Send size={14} className="mr-1" />
                Send
              </MilitaryButton>
              
              <MilitaryButton 
                size="sm"
                className="flex items-center"
              >
                <Plus size={14} className="mr-1" />
                Media
              </MilitaryButton>
            </div>
          </div>
        </div>
        
        <div className="border border-military-info/30 rounded-md bg-military-primary/50 p-2 overflow-y-auto h-[300px]">
          <div className="text-xs font-medium mb-2 border-b border-military-info/20 pb-1">
            Personnel Status
          </div>
          
          <div className="space-y-1.5">
            {onlineUsers.map(user => (
              <div 
                key={user.id}
                className="flex items-center border border-military-info/10 rounded px-2 py-1 bg-military-primary/70"
              >
                <div className="w-6 h-6 rounded-full bg-military-info/10 flex items-center justify-center border border-military-info/30 mr-2">
                  <User size={12} className="text-military-info" />
                </div>
                
                <div className="flex-1">
                  <div className="text-xs font-medium">{user.name}</div>
                </div>
                
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  user.status === 'online' 
                    ? "bg-military-success animate-pulse" 
                    : user.status === 'inactive'
                      ? "bg-military-warning" 
                      : "bg-military-danger"
                )}></div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <MilitaryButton 
              size="sm"
              className="w-full flex items-center justify-center text-xs"
            >
              <MessageCircle size={12} className="mr-1" />
              Broadcast Command
            </MilitaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComms;
