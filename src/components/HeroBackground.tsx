import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Node configuration for different types
const NODE_CONFIG = {
  influencer: { color: '#00d4ff', count: 60, sizeRange: [1,1] },
  brand: { color: '#ff8c00', count: 40, sizeRange: [1,1] },
  hub: { color: '#ffffff', count: 10, sizeRange: [1, 1] }
};

const CONNECTION_CONFIG = {
  maxDistance: 2.5,
  maxConnectionsPerNode: 5,
  connectionProbability: 0.3,
  pulseSpeed: 1.5
};

interface NetworkNode {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  type: 'influencer' | 'brand' | 'hub';
  size: number;
  connections: number[];
}

const NetworkNodes = () => {
  const nodesRef = useRef<THREE.Group>(null);
  const connectionsRef = useRef<THREE.Group>(null);
  
  // Generate network nodes with different types
  const { nodes, nodePositions, nodeColors, nodeSizes } = useMemo(() => {
    const allNodes: NetworkNode[] = [];
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    
    // Create nodes for each type
    Object.entries(NODE_CONFIG).forEach(([type, config]) => {
      for (let i = 0; i < config.count; i++) {
        const node: NetworkNode = {
          position: new THREE.Vector3(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
          ),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01,
            (Math.random() - 0.5) * 0.01
          ),
          type: type as 'influencer' | 'brand' | 'hub',
          size: config.sizeRange[0] + Math.random() * (config.sizeRange[1] - config.sizeRange[0]),
          connections: []
        };
        
        allNodes.push(node);
        
        // Add to geometry arrays
        positions.push(node.position.x, node.position.y, node.position.z);
        
        const color = new THREE.Color(config.color);
        colors.push(color.r, color.g, color.b);
        
        sizes.push(node.size);
      }
    });
    
    return {
      nodes: allNodes,
      nodePositions: new Float32Array(positions),
      nodeColors: new Float32Array(colors),
      nodeSizes: new Float32Array(sizes)
    };
  }, []);

  // Generate connections between nearby nodes
  const connectionLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    
    for (let i = 0; i < nodes.length; i++) {
      const nodeA = nodes[i];
      let connectionCount = 0;
      
      for (let j = i + 1; j < nodes.length && connectionCount < CONNECTION_CONFIG.maxConnectionsPerNode; j++) {
        const nodeB = nodes[j];
        const distance = nodeA.position.distanceTo(nodeB.position);
        
        if (distance < CONNECTION_CONFIG.maxDistance && Math.random() < CONNECTION_CONFIG.connectionProbability) {
          const geometry = new THREE.BufferGeometry();
          const positions = new Float32Array([
            nodeA.position.x, nodeA.position.y, nodeA.position.z,
            nodeB.position.x, nodeB.position.y, nodeB.position.z
          ]);
          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          lines.push(geometry);
          
          nodeA.connections.push(j);
          nodeB.connections.push(i);
          connectionCount++;
        }
      }
    }
    
    return lines;
  }, [nodes]);

  // Animation loop
  useFrame((state) => {
    if (nodesRef.current) {
      const time = state.clock.elapsedTime;
      
      // Gentle rotation of the entire network
      nodesRef.current.rotation.y = time * 0.005;
      nodesRef.current.rotation.x = Math.sin(time * 0.003) * 0.1;
      
      // Update node positions with drift
      const positionAttribute = (nodesRef.current.children[0] as THREE.Points)?.geometry?.getAttribute('position');
      if (positionAttribute) {
        for (let i = 0; i < nodes.length; i++) {
          // Add gentle drift movement
          nodes[i].position.add(nodes[i].velocity);
          
          // Boundary constraints (keep nodes in view)
          if (Math.abs(nodes[i].position.x) > 6) nodes[i].velocity.x *= -0.8;
          if (Math.abs(nodes[i].position.y) > 6) nodes[i].velocity.y *= -0.8;
          if (Math.abs(nodes[i].position.z) > 6) nodes[i].velocity.z *= -0.8;
          
          // Update geometry
          positionAttribute.setXYZ(i, nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
        }
        positionAttribute.needsUpdate = true;
      }
    }
    
    // Animate connections with pulsing effect
    if (connectionsRef.current) {
      const time = state.clock.elapsedTime;
      connectionsRef.current.children.forEach((line, index) => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity = 0.2 + 0.3 * Math.sin(time * CONNECTION_CONFIG.pulseSpeed + index * 0.5);
      });
    }
  });

  return (
    <group ref={nodesRef}>
      {/* Render nodes as points */}
      <Points positions={nodePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      
      {/* Render connections as lines */}
      <group ref={connectionsRef}>
        {connectionLines.map((geometry, index) => (
          <primitive
            key={index}
            object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
              color: "#4da6ff",
              transparent: true,
              opacity: 0.6,
              linewidth: 1.5,
            }))}
          />
        ))}
      </group>
    </group>
  );
};

const NetworkParticles = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Sparse background particles for depth
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(500 * 3); // Reduced count for performance
    
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="rgba(255, 255, 255, 0.1)"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const DataFlowLines = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      ref.current.rotation.y = time * 0.008;
      ref.current.position.y = Math.sin(time * 0.3) * 0.1;
      
      // Animate individual lines
      ref.current.children.forEach((line, index) => {
        const mesh = line as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 0.1 + 0.2 * Math.sin(time * 2 + index);
      });
    }
  });

  const dataFlows = useMemo(() => {
    const flows = [];
    for (let i = 0; i < 8; i++) { // Reduced count
      const points = [];
      for (let j = 0; j < 6; j++) {
        points.push(new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 32, 0.003, 6, false);
      flows.push(geometry);
    }
    return flows;
  }, []);

  return (
    <group ref={ref}>
      {dataFlows.map((geometry, index) => (
        <mesh key={index} geometry={geometry}>
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
};

export const FynxNetworkBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'linear-gradient(135deg, #0a0a1e 0%, #000000 100%)' }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#ff8c00" />
        
        {/* Main network visualization */}
        <NetworkNodes />
        
        {/* Background particles for depth */}
        <NetworkParticles />
        
        {/* Subtle data flow lines */}
        <DataFlowLines />
      </Canvas>
    </div>
  );
};

// Export with original name for backward compatibility
export const HeroBackground = FynxNetworkBackground;