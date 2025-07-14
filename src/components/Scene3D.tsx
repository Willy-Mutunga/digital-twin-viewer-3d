import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

// City Building Component
function Building({ position, height, color, label, sensorData }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[1, height, 1]}
        position={[0, height / 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={hovered ? "#4FC3F7" : color} />
      </Box>
      
      {/* Sensor Data Visualization */}
      {sensorData && (
        <Sphere position={[0, height + 0.5, 0]} args={[0.1]}>
          <meshStandardMaterial 
            color={sensorData.status === 'good' ? '#4CAF50' : '#FF5722'} 
            emissive={sensorData.status === 'good' ? '#2E7D32' : '#D32F2F'}
            emissiveIntensity={0.3}
          />
        </Sphere>
      )}
      
      {/* Building Label */}
      <Text
        position={[0, height + 1, 0]}
        fontSize={0.3}
        color="#E3F2FD"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Industrial Equipment Component
function Equipment({ position, type, status }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && status === 'active') {
      meshRef.current.rotation.y += 0.02;
    }
  });

  const getColor = () => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'error': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <group position={position}>
      <Cylinder ref={meshRef} args={[0.3, 0.3, 1]}>
        <meshStandardMaterial 
          color={getColor()} 
          emissive={getColor()}
          emissiveIntensity={status === 'active' ? 0.2 : 0.1}
        />
      </Cylinder>
      
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.2}
        color="#E3F2FD"
        anchorX="center"
        anchorY="middle"
      >
        {type}
      </Text>
    </group>
  );
}

// Simplified Data Connection Line
function DataStream({ start, end }: any) {
  const points = useMemo(() => {
    return [
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, Math.max(start[1], end[1]) + 1, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end),
    ];
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: "#00BCD4", transparent: true, opacity: 0.6 }))} />
  );
}

// Main Scene Component
function Scene() {
  const buildings = [
    { position: [-3, 0, -3], height: 2, color: "#2196F3", label: "Factory A", sensorData: { status: 'good', temp: 23 } },
    { position: [0, 0, -3], height: 3, color: "#3F51B5", label: "Office B", sensorData: { status: 'good', temp: 22 } },
    { position: [3, 0, -3], height: 1.5, color: "#9C27B0", label: "Warehouse C", sensorData: { status: 'warning', temp: 28 } },
    { position: [-3, 0, 0], height: 2.5, color: "#673AB7", label: "Plant D", sensorData: { status: 'good', temp: 24 } },
    { position: [3, 0, 0], height: 2, color: "#FF5722", label: "Storage E", sensorData: { status: 'error', temp: 35 } },
  ];

  const equipment = [
    { position: [-1, 0, 1], type: "Generator", status: 'active' },
    { position: [1, 0, 1], type: "Pump", status: 'warning' },
    { position: [0, 0, 3], type: "Reactor", status: 'active' },
  ];

  return (
    <>
      {/* Ground */}
      <Box position={[0, -0.1, 0]} args={[20, 0.2, 20]}>
        <meshStandardMaterial color="#37474F" />
      </Box>

      {/* Grid Lines */}
      <gridHelper args={[20, 20, "#546E7A", "#546E7A"]} position={[0, 0, 0]} />

      {/* Buildings */}
      {buildings.map((building, index) => (
        <Building key={index} {...building} />
      ))}

      {/* Equipment */}
      {equipment.map((equip, index) => (
        <Equipment key={index} {...equip} />
      ))}

      {/* Data Connection Lines */}
      <DataStream start={[-3, 2, -3]} end={[1, 1, 1]} />
      <DataStream start={[3, 1.5, -3]} end={[-1, 1, 1]} />
      <DataStream start={[0, 3, -3]} end={[0, 1, 3]} />

      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#00BCD4" />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [8, 6, 8], fov: 60 }}
        shadows
        className="w-full h-full"
      >
        <Scene />
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={20}
        />
        <Environment preset="night" />
      </Canvas>
      
      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
        <h3 className="text-sm font-medium mb-2">3D Environment Controls</h3>
        <div className="text-xs space-y-1">
          <div>• Click & drag to rotate</div>
          <div>• Scroll to zoom</div>
          <div>• Hover over assets for details</div>
        </div>
      </div>

      {/* Status Legend */}
      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
        <h3 className="text-sm font-medium mb-2">Status Legend</h3>
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-data-success rounded-full"></div>
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-data-warning rounded-full"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-data-error rounded-full"></div>
            <span>Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
}