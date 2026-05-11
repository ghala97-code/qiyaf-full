import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// ============ Wireframe Platform Block ============
// A semi-transparent block with bright cyan edges (like the reference)
const PlatformBlock = ({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) => {
  const geometry = useMemo(() => new THREE.BoxGeometry(size[0], size[1], size[2]), [size]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group position={position}>
      {/* Faint translucent fill */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#0b3a4a"
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>
      {/* Bright cyan wireframe edges */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#9be9f5" transparent opacity={0.85} />
      </lineSegments>
    </group>
  );
};

// ============ Support Leg (vertical post under platforms) ============
const SupportLeg = ({
  position,
  height,
}: {
  position: [number, number, number];
  height: number;
}) => {
  const points = useMemo(
    () => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -height, 0)],
    [height],
  );
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <group position={position}>
      <line>
        <primitive object={geometry} attach="geometry" />
        <lineBasicMaterial color="#9be9f5" transparent opacity={0.55} />
      </line>
      {/* small base cube */}
      <mesh position={[0, -height, 0]}>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
        <meshBasicMaterial color="#9be9f5" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// ============ Pulsing Inspection Node (glowing dot + ring) ============
const InspectionNode = ({
  position,
  delay = 0,
}: {
  position: [number, number, number];
  delay?: number;
}) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2.2) * 0.2;
      coreRef.current.scale.set(s, s, s);
    }
    if (ringRef.current) {
      const s = 1 + ((t * 0.6) % 1) * 2.5;
      ringRef.current.scale.set(s, s, s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.9 - ((t * 0.6) % 1) * 0.9;
    }
    if (haloRef.current) {
      const mat = haloRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.25 + Math.sin(t * 2.2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* outer halo disc */}
      <mesh ref={haloRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial color="#9be9f5" transparent opacity={0.25} />
      </mesh>
      {/* core sphere */}
      <mesh ref={coreRef} position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshBasicMaterial color="#e6fbff" />
      </mesh>
      {/* expanding ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.18, 0.22, 48]} />
        <meshBasicMaterial color="#9be9f5" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#9be9f5" intensity={1.5} distance={2.5} />
    </group>
  );
};

// ============ Connector Path (dashed-like line between two points) ============
const ConnectorPath = ({
  points,
}: {
  points: [number, number, number][];
}) => {
  const geometry = useMemo(() => {
    const v = points.map((p) => new THREE.Vector3(...p));
    return new THREE.BufferGeometry().setFromPoints(v);
  }, [points]);

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineDashedMaterial
        color="#9be9f5"
        transparent
        opacity={0.7}
        dashSize={0.15}
        gapSize={0.1}
      />
    </line>
  );
};

// ============ Scene ============
const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.04) * 0.04;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <fog attach="fog" args={['#0a1f2a', 18, 42]} />

      <group ref={groupRef}>
        {/* === Composition based on reference image === */}
        {/* Main large platform on the right */}
        <PlatformBlock position={[3.5, 0, 0]} size={[5, 0.15, 4.5]} />
        <SupportLeg position={[1.5, -0.1, 1.8]} height={1.4} />
        <SupportLeg position={[5.2, -0.1, 1.8]} height={1.4} />
        <SupportLeg position={[1.5, -0.1, -1.8]} height={1.4} />

        {/* Smaller raised platform top-right */}
        <PlatformBlock position={[5.5, 1.2, -3]} size={[2.5, 0.15, 1.8]} />

        {/* Mid platform connecting */}
        <PlatformBlock position={[2.8, 0.6, -2.5]} size={[2, 0.12, 1.5]} />

        {/* Lower extension on the right */}
        <PlatformBlock position={[7.2, -0.4, 0.5]} size={[1.5, 0.12, 2]} />

        {/* Bottom-right small platform */}
        <PlatformBlock position={[6, -0.6, 2.8]} size={[2.2, 0.12, 1.5]} />
        <SupportLeg position={[6, -0.7, 2.8]} height={1.2} />

        {/* === Pulsing inspection nodes on platforms === */}
        <InspectionNode position={[2.2, 0.1, -0.5]} delay={0} />
        <InspectionNode position={[3.5, 0.1, 0.8]} delay={0.6} />
        <InspectionNode position={[4.8, 0.1, -0.3]} delay={1.2} />
        <InspectionNode position={[5.5, 1.3, -3]} delay={0.3} />
        <InspectionNode position={[5.5, -0.5, 2.8]} delay={0.9} />
        <InspectionNode position={[6.7, -0.5, 2.5]} delay={1.5} />

        {/* === Dashed connector paths between nodes === */}
        <ConnectorPath
          points={[
            [2.2, 0.15, -0.5],
            [3.5, 0.15, 0.8],
            [4.8, 0.15, -0.3],
          ]}
        />
        <ConnectorPath
          points={[
            [4.8, 0.15, -0.3],
            [5.5, 0.6, -1.5],
            [5.5, 1.3, -3],
          ]}
        />
        <ConnectorPath
          points={[
            [3.5, 0.15, 0.8],
            [5.5, -0.4, 2.8],
            [6.7, -0.4, 2.5],
          ]}
        />
      </group>
    </>
  );
};

const SolarField3D = () => {
  return (
    <Canvas
      camera={{ position: [-6, 4.5, 9], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
      onCreated={({ camera }) => {
        camera.lookAt(2, 0, 0);
      }}
    >
      <Scene />
    </Canvas>
  );
};

export default SolarField3D;
