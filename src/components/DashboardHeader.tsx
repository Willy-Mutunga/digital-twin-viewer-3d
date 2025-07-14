import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { 
  Bell, 
  Settings, 
  User, 
  RefreshCw,
  Wifi,
  WifiOff,
  Sun,
  Moon
} from 'lucide-react';

export default function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate network status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime simulation
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-dashboard-panel border-b border-border shadow-sm h-16 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-muted/50 transition-colors" />
        
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-foreground">Digital Twin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Industrial Control Center</p>
          </div>
          
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-data-success" />
                <Badge className="bg-data-success/10 text-data-success border-data-success/20 text-xs">
                  CONNECTED
                </Badge>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-data-error" />
                <Badge className="bg-data-error/10 text-data-error border-data-error/20 text-xs">
                  OFFLINE
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Center Section - Time */}
      <div className="hidden lg:flex flex-col items-center">
        <div className="text-2xl font-mono font-bold text-foreground">
          {formatTime(currentTime)}
        </div>
        <div className="text-xs text-muted-foreground">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Refresh Button */}
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-muted/50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="hover:bg-muted/50 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-muted/50 transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          {notifications > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-data-error text-destructive-foreground border-0 p-0">
              {notifications}
            </Badge>
          )}
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-muted/50 transition-colors"
        >
          <Settings className="w-4 h-4" />
        </Button>

        {/* User Profile */}
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-muted/50 transition-colors"
        >
          <User className="w-4 h-4" />
        </Button>

        {/* System Status */}
        <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-border">
          <div className="w-2 h-2 bg-data-success rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">All Systems Operational</span>
        </div>
      </div>
    </header>
  );
}