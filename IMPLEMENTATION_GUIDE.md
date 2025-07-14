# Digital Twin Dashboard - Implementation Guide

## Required Dependencies

Make sure you have these packages installed:

```bash
npm install @react-three/fiber@^8.18.0 @react-three/drei@^9.122.0 three@latest
```

## File Structure

```
src/
├── components/
│   ├── AppSidebar.tsx          # Navigation sidebar
│   ├── DashboardHeader.tsx     # Top header with time and controls
│   ├── KPIDashboard.tsx        # Real-time metrics dashboard
│   ├── Scene3D.tsx             # 3D environment viewer
│   └── ui/                     # Shadcn UI components (already provided)
├── pages/
│   └── Index.tsx               # Main dashboard page
├── App.tsx                     # Main application component
├── index.css                   # Global styles and design system
└── main.tsx                    # Application entry point
```

## Key Features

- **3D Interactive Environment**: Built with React Three Fiber and Three.js
- **Real-time Data Simulation**: KPI metrics update every 3 seconds
- **Industrial Design System**: Dark/light theme with blue accent colors
- **Responsive Layout**: Works on desktop and tablet
- **Interactive Elements**: Hover effects, animations, and status indicators

## Implementation Steps

1. Copy all the component files to your `src/components/` directory
2. Update your `src/index.css` with the design system
3. Update your `tailwind.config.ts` with the extended configuration
4. Replace your `src/App.tsx` and `src/pages/Index.tsx` files
5. Install the required Three.js dependencies
6. Run your development server

## Design System

The project uses a comprehensive design system with semantic color tokens:
- `--primary`: Main blue accent color
- `--dashboard-*`: Dashboard-specific colors
- `--data-*`: Status indicator colors (success, warning, error)
- `--sidebar-*`: Sidebar color scheme

All colors are defined in HSL format for consistent theming.