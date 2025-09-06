
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import type { Project, ComponentType, ServiceType } from '../types';

interface NodeProps {
  position: [number, number, number];
  color: string;
  label: string;
  nodeType: 'component' | 'service';
}

const Node: React.FC<NodeProps> = ({ position, color, label, nodeType }) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      ref.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
        {nodeType === 'component' && <Box ref={ref} args={[1, 1, 1]}><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} roughness={0.5} metalness={0.1} /></Box>}
        {nodeType === 'service' && <Sphere ref={ref} args={[0.6, 32, 32]}><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.3} metalness={0.3} /></Sphere>}
      <Text
        position={[0, -1, 0]}
        color="white"
        fontSize={0.25}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

const CoreNode: React.FC = () => {
    const ref = useRef<THREE.Mesh>(null!);
     useFrame(() => {
        if(ref.current){
             ref.current.rotation.y += 0.002;
             ref.current.rotation.x += 0.001;
        }
    });
    return (
        <Cylinder ref={ref} args={[0.5, 0.5, 0.2, 32]}>
            <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.5} transparent opacity={0.8} />
        </Cylinder>
    )
}

const Connections: React.FC<{ points: THREE.Vector3[] }> = ({ points }) => {
    const lines = useMemo(() => {
        const center = new THREE.Vector3(0, 0, 0);
        return points.map(point => new THREE.CatmullRomCurve3([center, point]).getPoints(20));
    }, [points]);

    return (
        <group>
            {lines.map((linePoints, i) => (
                <line key={i}>
                    <bufferGeometry attach="geometry" onUpdate={self => self.setFromPoints(linePoints)} />
                    <lineBasicMaterial attach="material" color="#2A2655" linewidth={2} />
                </line>
            ))}
        </group>
    );
};


interface Scene3DProps {
    project: Project;
}

const Scene3D: React.FC<Scene3DProps> = ({ project }) => {
    const allNodes = [...project.components, ...project.services];
    const nodePositions = useMemo(() => {
        const radius = 3;
        const angleStep = (2 * Math.PI) / (allNodes.length || 1);
        return allNodes.map((_, i) => new THREE.Vector3(
            radius * Math.cos(i * angleStep),
            0,
            radius * Math.sin(i * angleStep)
        ));
    }, [allNodes.length]);
    
    const nodeColorMapping: Record<ComponentType | ServiceType, string> = {
        Frontend: '#EC4899',
        Backend: '#F59E0B',
        Database: '#10B981',
        API: '#3B82F6',
        Authentication: '#8B5CF6',
        Supabase: '#3ECF8E',
        GitHub: '#FFFFFF',
        Stripe: '#635BFF',
        Coolify: '#00D8FF'
    };


  return (
    <Canvas camera={{ position: [0, 4, 7], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#7C3AED" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#4F46E5" />
      
      <CoreNode />

      {allNodes.map((node, index) => (
        <Node
          key={`${node.type}-${index}`}
          position={nodePositions[index].toArray() as [number, number, number]}
          color={nodeColorMapping[node.type] || '#cccccc'}
          label={node.type}
          nodeType={project.components.includes(node as any) ? 'component' : 'service'}
        />
      ))}

      <Connections points={nodePositions} />
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        minDistance={5} 
        maxDistance={15} 
        autoRotate 
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default Scene3D;

