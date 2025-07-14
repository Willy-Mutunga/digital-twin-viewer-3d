import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Scene3D from '@/components/Scene3D';
import KPIDashboard from '@/components/KPIDashboard';
import { 
  Layers3, 
  Activity, 
  BarChart3, 
  MapPin, 
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [visibleLayers, setVisibleLayers] = useState({
    buildings: true,
    equipment: true,
    sensors: true,
    dataStreams: true
  });

  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const layerControls = [
    { id: 'buildings', label: 'Buildings', icon: MapPin, color: 'bg-blue-500' },
    { id: 'equipment', label: 'Equipment', icon: Zap, color: 'bg-green-500' },
    { id: 'sensors', label: 'Sensors', icon: Activity, color: 'bg-orange-500' },
    { id: 'dataStreams', label: 'Data Streams', icon: BarChart3, color: 'bg-cyan-500' },
  ];

  return (
    <div className="flex-1 p-6 space-y-6 bg-gradient-dashboard">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Digital Twin Control Center
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage your digital twin environment in real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-data-success/10 text-data-success border-data-success/20">
            Live Monitoring Active
          </Badge>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            {Object.values(visibleLayers).filter(Boolean).length} Layers Visible
          </Badge>
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 bg-dashboard-panel">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="3d-view" className="flex items-center gap-2">
            <Layers3 className="w-4 h-4" />
            3D Environment
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="controls" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Layer Controls
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* KPI Dashboard - Takes 2 columns */}
            <div className="xl:col-span-2">
              <KPIDashboard />
            </div>
            
            {/* Mini 3D View */}
            <Card className="bg-dashboard-panel shadow-panel border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers3 className="w-5 h-5 text-primary" />
                  3D Environment Preview
                </CardTitle>
                <CardDescription>
                  Interactive view of your digital twin
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <div className="h-64 rounded-lg overflow-hidden">
                  <Scene3D />
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="outline"
                  onClick={() => setActiveTab('3d-view')}
                >
                  Open Full 3D View
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 3D View Tab */}
        <TabsContent value="3d-view" className="space-y-4">
          <Card className="bg-dashboard-panel shadow-panel border-border/50">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Layers3 className="w-5 h-5 text-primary" />
                    3D Digital Twin Environment
                  </CardTitle>
                  <CardDescription>
                    Interactive 3D visualization of your physical infrastructure
                  </CardDescription>
                </div>
                
                {/* Quick Layer Toggles */}
                <div className="flex flex-wrap gap-2">
                  {layerControls.map((layer) => (
                    <Button
                      key={layer.id}
                      variant={visibleLayers[layer.id as keyof typeof visibleLayers] ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleLayer(layer.id as keyof typeof visibleLayers)}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full ${layer.color}`}></div>
                      {visibleLayers[layer.id as keyof typeof visibleLayers] ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {layer.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-[600px] rounded-lg overflow-hidden">
                <Scene3D />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-dashboard-panel shadow-panel border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Advanced Analytics
              </CardTitle>
              <CardDescription>
                Detailed system performance and trend analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <KPIDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Layer Controls Tab */}
        <TabsContent value="controls" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {layerControls.map((layer) => (
              <Card key={layer.id} className="bg-dashboard-panel shadow-panel border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <layer.icon className="w-5 h-5 text-primary" />
                      {layer.label}
                    </div>
                    <Button
                      variant={visibleLayers[layer.id as keyof typeof visibleLayers] ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleLayer(layer.id as keyof typeof visibleLayers)}
                      className="flex items-center gap-2"
                    >
                      {visibleLayers[layer.id as keyof typeof visibleLayers] ? (
                        <>
                          <Eye className="w-3 h-3" />
                          Visible
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Hidden
                        </>
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {layer.id === 'buildings' && "Physical infrastructure and building structures"}
                    {layer.id === 'equipment' && "Industrial equipment and machinery status"}
                    {layer.id === 'sensors' && "IoT sensors and monitoring devices"}
                    {layer.id === 'dataStreams' && "Real-time data flow visualization"}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${layer.color}`}></div>
                    <span className="text-sm text-foreground">
                      Layer Color Indicator
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
