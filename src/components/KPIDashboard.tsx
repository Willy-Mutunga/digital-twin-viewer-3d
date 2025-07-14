import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Thermometer, 
  Droplets, 
  Wind, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Mock data generation for real-time simulation
const generateMockData = () => ({
  powerUsage: Math.floor(Math.random() * 30) + 70, // 70-100%
  temperature: Math.floor(Math.random() * 10) + 18, // 18-28°C
  humidity: Math.floor(Math.random() * 20) + 40, // 40-60%
  airQuality: Math.floor(Math.random() * 40) + 60, // 60-100
  systemHealth: Math.floor(Math.random() * 15) + 85, // 85-100%
  activeDevices: Math.floor(Math.random() * 5) + 95, // 95-100
  alerts: Math.floor(Math.random() * 3) + 1, // 1-3
  dataFlow: Math.floor(Math.random() * 50) + 150, // 150-200 MB/s
});

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: any;
  trend?: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
  progress?: number;
}

function MetricCard({ title, value, unit, icon: Icon, trend, status, progress }: MetricCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'text-data-success';
      case 'warning': return 'text-data-warning';
      case 'critical': return 'text-data-error';
      default: return 'text-foreground';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'good': return 'bg-data-success text-success-foreground';
      case 'warning': return 'bg-data-warning text-warning-foreground';
      case 'critical': return 'bg-data-error text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-data-success" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-data-error" />;
      default: return null;
    }
  };

  return (
    <Card className="bg-dashboard-panel shadow-panel border-border/50 hover:shadow-glow transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${getStatusColor()}`} />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold text-foreground">
              {value}
              {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
            </div>
            {getTrendIcon()}
          </div>
          <Badge className={`text-xs ${getStatusBadge()}`}>
            {status.toUpperCase()}
          </Badge>
        </div>
        {progress !== undefined && (
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SystemAlert({ message, type, timestamp }: { message: string; type: 'info' | 'warning' | 'error'; timestamp: string }) {
  const getAlertIcon = () => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-data-error" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-data-warning" />;
      default: return <CheckCircle className="w-4 h-4 text-data-success" />;
    }
  };

  const getAlertBg = () => {
    switch (type) {
      case 'error': return 'bg-data-error/10 border-data-error/20';
      case 'warning': return 'bg-data-warning/10 border-data-warning/20';
      default: return 'bg-data-success/10 border-data-success/20';
    }
  };

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${getAlertBg()} transition-all duration-200`}>
      {getAlertIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground font-medium">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
      </div>
    </div>
  );
}

export default function KPIDashboard() {
  const [data, setData] = useState(generateMockData());
  const [alerts] = useState([
    { id: 1, message: "Temperature spike detected in Zone A", type: 'warning' as const, timestamp: "2 minutes ago" },
    { id: 2, message: "Power consumption optimized", type: 'info' as const, timestamp: "5 minutes ago" },
    { id: 3, message: "Sensor network synchronized", type: 'info' as const, timestamp: "8 minutes ago" },
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'good';
    if (value >= thresholds.warning) return 'warning';
    return 'critical';
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          System Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Power Usage"
            value={data.powerUsage}
            unit="%"
            icon={Zap}
            trend="up"
            status={getStatus(100 - data.powerUsage, { good: 20, warning: 10 })}
            progress={data.powerUsage}
          />
          <MetricCard
            title="Temperature"
            value={data.temperature}
            unit="°C"
            icon={Thermometer}
            trend="stable"
            status={getStatus(30 - Math.abs(data.temperature - 22), { good: 5, warning: 3 })}
          />
          <MetricCard
            title="Humidity"
            value={data.humidity}
            unit="%"
            icon={Droplets}
            trend="down"
            status={getStatus(100 - Math.abs(data.humidity - 50), { good: 40, warning: 25 })}
          />
          <MetricCard
            title="Air Quality"
            value={data.airQuality}
            unit="AQI"
            icon={Wind}
            trend="up"
            status={getStatus(data.airQuality, { good: 80, warning: 60 })}
          />
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium text-foreground mb-4">System Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
              title="Overall Health"
              value={data.systemHealth}
              unit="%"
              icon={CheckCircle}
              trend="up"
              status={getStatus(data.systemHealth, { good: 90, warning: 75 })}
              progress={data.systemHealth}
            />
            <MetricCard
              title="Active Devices"
              value={data.activeDevices}
              unit="/100"
              icon={Activity}
              trend="stable"
              status={getStatus(data.activeDevices, { good: 95, warning: 90 })}
            />
          </div>
        </div>

        {/* Real-time Alerts */}
        <Card className="bg-dashboard-panel shadow-panel border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <SystemAlert key={alert.id} {...alert} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Flow Indicator */}
      <Card className="bg-dashboard-panel shadow-panel border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground">Real-time Data Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-data-success rounded-full animate-pulse"></div>
              <span className="text-foreground font-medium">{data.dataFlow} MB/s</span>
            </div>
            <Badge className="bg-data-success text-success-foreground">
              STREAMING
            </Badge>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Data streams from {data.activeDevices} connected devices across the digital twin environment.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}