import { useRef, useMemo, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Dough({ radius = 2.2 }) {
  return (
    <mesh position={[0, -0.15, 0]}>
      <cylinderGeometry args={[radius, radius, 0.2, 64]} />
      <meshStandardMaterial
        color="#d4a853"
        roughness={0.8}
        metalness={0.05}
      />
    </mesh>
  );
}

function Crust({ radius = 2.2 }) {
  return (
    <mesh position={[0, -0.05, 0]}>
      <torusGeometry args={[radius, 0.18, 16, 64]} />
      <meshStandardMaterial
        color="#c89840"
        roughness={0.9}
        metalness={0.0}
      />
    </mesh>
  );
}

function Sauce({ radius = 1.9 }) {
  return (
    <mesh position={[0, -0.04, 0]}>
      <cylinderGeometry args={[radius, radius, 0.04, 64]} />
      <meshStandardMaterial
        color="#c8102e"
        roughness={0.6}
        metalness={0.05}
      />
    </mesh>
  );
}

function Cheese({ radius = 1.85 }) {
  return (
    <mesh position={[0, 0.0, 0]}>
      <cylinderGeometry args={[radius, radius, 0.06, 64]} />
      <meshStandardMaterial
        color="#f5d061"
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

function Toppings() {
  const toppings = useMemo(() => {
    const items = [];
    const rng = (seed) => {
      let s = seed;
      return () => {
        s = (s * 16807 + 0) % 2147483647;
        return s / 2147483647;
      };
    };

    const rand = rng(42);

    // Pepperoni slices
    for (let i = 0; i < 8; i++) {
      const angle = rand() * Math.PI * 2;
      const dist = 0.4 + rand() * 1.2;
      items.push({
        key: `pep-${i}`,
        position: [Math.cos(angle) * dist, 0.06, Math.sin(angle) * dist],
        scale: [0.18 + rand() * 0.06, 0.04, 0.18 + rand() * 0.06],
        color: '#8B1A1A',
        type: 'pepperoni',
      });
    }

    // Basil leaves
    for (let i = 0; i < 5; i++) {
      const angle = rand() * Math.PI * 2;
      const dist = 0.3 + rand() * 1.3;
      items.push({
        key: `basil-${i}`,
        position: [Math.cos(angle) * dist, 0.1, Math.sin(angle) * dist],
        scale: [0.12, 0.03, 0.18],
        color: '#2d5a27',
        type: 'basil',
        rotation: [0, rand() * Math.PI, 0],
      });
    }

    // Mozzarella blobs
    for (let i = 0; i < 6; i++) {
      const angle = rand() * Math.PI * 2;
      const dist = 0.2 + rand() * 1.4;
      items.push({
        key: `moz-${i}`,
        position: [Math.cos(angle) * dist, 0.08, Math.sin(angle) * dist],
        scale: 0.08 + rand() * 0.06,
        color: '#fff5e6',
        type: 'mozzarella',
      });
    }

    return items;
  }, []);

  return (
    <group>
      {toppings.map((t) => (
        <mesh
          key={t.key}
          position={t.position}
          scale={t.scale}
          rotation={t.rotation || [0, 0, 0]}
        >
          {t.type === 'pepperoni' ? (
            <cylinderGeometry args={[1, 1, 1, 16]} />
          ) : t.type === 'basil' ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : (
            <sphereGeometry args={[1, 12, 12]} />
          )}
          <meshStandardMaterial
            color={t.color}
            roughness={t.type === 'mozzarella' ? 0.3 : 0.7}
            metalness={0.0}
          />
        </mesh>
      ))}
    </group>
  );
}

function PizzaModel() {
  const groupRef = useRef();
  const { viewport } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth idle rotation
    groupRef.current.rotation.y = t * 0.15 + mouseRef.current.x * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.08 + mouseRef.current.y * 0.15;
  });

  const handlePointerMove = useCallback((e) => {
    if (e.nativeEvent) {
      mouseRef.current.x = ((e.nativeEvent.clientX / window.innerWidth) - 0.5) * 2;
      mouseRef.current.y = ((e.nativeEvent.clientY / window.innerHeight) - 0.5) * 2;
    }
  }, []);

  return (
    <group ref={groupRef} onPointerMove={handlePointerMove}>
      <Dough />
      <Crust />
      <Sauce />
      <Cheese />
      <Toppings />
    </group>
  );
}

function LoadingSpinner() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <ringGeometry args={[0.8, 1, 32]} />
      <meshBasicMaterial color="#d4a853" />
    </mesh>
  );
}

function StaticFallback() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #1a1408 0%, #0a0a0a 70%)',
      borderRadius: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative pizza SVG fallback */}
      <svg width="280" height="280" viewBox="0 0 280 280" style={{ filter: 'drop-shadow(0 0 30px rgba(200, 16, 46, 0.3))' }}>
        {/* Dough */}
        <circle cx="140" cy="140" r="130" fill="#d4a853" />
        {/* Crust ring */}
        <circle cx="140" cy="140" r="130" fill="none" stroke="#c89840" strokeWidth="18" />
        {/* Sauce */}
        <circle cx="140" cy="140" r="110" fill="#c8102e" opacity="0.9" />
        {/* Cheese */}
        <circle cx="140" cy="140" r="105" fill="#f5d061" opacity="0.7" />
        {/* Pepperoni */}
        {[
          [80, 90], [140, 60], [190, 80], [60, 150],
          [210, 130], [90, 200], [170, 210], [140, 140],
        ].map(([x, y], i) => (
          <circle key={`pep-${i}`} cx={x} cy={y} r="14" fill="#8B1A1A" opacity="0.9" />
        ))}
        {/* Basil */}
        {[
          [100, 120], [170, 110], [120, 180], [185, 175],
        ].map(([x, y], i) => (
          <ellipse key={`basil-${i}`} cx={x} cy={y} rx="10" ry="6" fill="#2d5a27"
            transform={`rotate(${i * 45} ${x} ${y})`} />
        ))}
        {/* Mozzarella */}
        {[
          [110, 100], [175, 100], [90, 170], [160, 190], [140, 160],
        ].map(([x, y], i) => (
          <circle key={`moz-${i}`} cx={x} cy={y} r="8" fill="#fff5e6" opacity="0.85" />
        ))}
      </svg>
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'var(--color-text-dim)',
        fontSize: '12px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
      }}>
        Vista clasica
      </div>
    </div>
  );
}

export default function Pizza3D() {
  const [webglFailed, setWebglFailed] = useState(false);

  const handleCreated = useCallback(({ gl }) => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
  }, []);

  const handleError = useCallback(() => {
    setWebglFailed(true);
  }, []);

  if (webglFailed) {
    return <StaticFallback />;
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      borderRadius: '20px',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, #1a1408 0%, #0a0a0a 70%)',
    }}>
      <Canvas
        camera={{ position: [0, 3.5, 4.5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={handleCreated}
        onError={handleError}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ambientLight intensity={0.4} color="#ffe8cc" />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            color="#fff5e6"
            castShadow
          />
          <directionalLight
            position={[-3, 4, -2]}
            intensity={0.3}
            color="#c8102e"
          />
          <pointLight position={[0, 3, 0]} intensity={0.4} color="#d4a853" />

          <PizzaModel />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={4}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.5}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
