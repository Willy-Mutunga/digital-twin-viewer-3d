import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Layers3,
  MapPin,
  Settings,
  Shield,
  Zap,
  Cpu,
  Globe
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "3D Environment", url: "/environment", icon: Globe },
  { title: "Asset Layers", url: "/layers", icon: Layers3 },
  { title: "System Status", url: "/status", icon: Activity },
  { title: "Alerts", url: "/alerts", icon: Shield },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const systemItems = [
  { title: "IoT Devices", url: "/devices", icon: Cpu },
  { title: "Sensors", url: "/sensors", icon: MapPin },
  { title: "Power Grid", url: "/power", icon: Zap },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 ${
      isActive 
        ? "bg-sidebar-accent text-sidebar-primary font-medium" 
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
    }`;

  return (
    <Sidebar
      className={`${open ? "w-64" : "w-14"} border-r border-sidebar-border bg-sidebar transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-2">
        {/* Header */}
        <div className="flex items-center gap-2 px-2 py-4 border-b border-sidebar-border mb-4">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          {open && (
            <div>
              <h2 className="text-sidebar-foreground font-semibold text-sm">Digital Twin</h2>
              <p className="text-sidebar-foreground/70 text-xs">Control Center</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium mb-2">
            {open && "MAIN"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink to={item.url} end className={getNavCls}>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md w-full">
                        <item.icon className="w-4 h-4 shrink-0" />
                        {open && <span className="text-sm">{item.title}</span>}
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Navigation */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium mb-2">
            {open && "SYSTEM"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink to={item.url} end className={getNavCls}>
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md w-full">
                        <item.icon className="w-4 h-4 shrink-0" />
                        {open && <span className="text-sm">{item.title}</span>}
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {open && (
          <div className="mt-auto p-3 bg-sidebar-accent rounded-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-data-success rounded-full animate-pulse"></div>
              <span className="text-xs text-sidebar-foreground">System Online</span>
            </div>
            <p className="text-xs text-sidebar-foreground/70 mt-1">All systems operational</p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}