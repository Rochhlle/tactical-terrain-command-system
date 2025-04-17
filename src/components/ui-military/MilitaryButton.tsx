
import React from 'react';
import { cn } from '@/lib/utils';

interface MilitaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'info' | 'alert' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children: React.ReactNode;
}

const MilitaryButton: React.FC<MilitaryButtonProps> = ({ 
  variant = 'default', 
  size = 'md', 
  glow = false,
  className, 
  children,
  ...props 
}) => {
  const baseClasses = "relative font-medium border transition-all duration-300 flex items-center justify-center";
  
  const variantClasses = {
    default: "bg-military-primary border-military-info/30 text-military-text hover:border-military-info/60",
    info: "bg-military-info/10 border-military-info/60 text-military-info hover:bg-military-info/20",
    alert: "bg-military-alert/10 border-military-alert/60 text-military-alert hover:bg-military-alert/20",
    success: "bg-military-success/10 border-military-success/60 text-military-success hover:bg-military-success/20",
    danger: "bg-military-danger/10 border-military-danger/60 text-military-danger hover:bg-military-danger/20"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1 text-sm rounded",
    md: "px-4 py-2 rounded",
    lg: "px-6 py-3 text-lg rounded-md"
  };
  
  const glowClasses = {
    default: glow ? "shadow-[0_0_10px_rgba(30,174,219,0.3)] hover:shadow-[0_0_15px_rgba(30,174,219,0.5)]" : "",
    info: glow ? "shadow-[0_0_10px_rgba(30,174,219,0.3)] hover:shadow-[0_0_15px_rgba(30,174,219,0.5)]" : "",
    alert: glow ? "shadow-[0_0_10px_rgba(249,115,22,0.3)] hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]" : "",
    success: glow ? "shadow-[0_0_10px_rgba(46,125,50,0.3)] hover:shadow-[0_0_15px_rgba(46,125,50,0.5)]" : "",
    danger: glow ? "shadow-[0_0_10px_rgba(198,40,40,0.3)] hover:shadow-[0_0_15px_rgba(198,40,40,0.5)]" : ""
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowClasses[variant],
        "hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {children}
      
      {/* Subtle border flash effect on focus */}
      <span className="absolute inset-0 rounded border border-transparent focus-visible:border-military-info/70"></span>
    </button>
  );
};

export default MilitaryButton;
