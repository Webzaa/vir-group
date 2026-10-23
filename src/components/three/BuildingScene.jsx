import { Canvas, useThree } from '@react-three/fiber';
import { CameraControls, Center, Html, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
const FLOORS = 18,
  FH = 1.1,
  TW = 9,
  TD = 7,
  PH = 3.2,
  ROOF_Y = PH + FLOORS * FH;
const CHAMPAGNE = new THREE.Color('#c9aa7e');
const VIEWS = [
  { pos: [34, 14, 40], target: [0, 9, 0] }, // overview
  { pos: [24, 4.5, 26], target: [0, 2.5, 0] }, // arrival
  { pos: [-28, 17, 30], target: [0, 12, 0] }, // residences
  { pos: [-16, 33, 20], target: [0, ROOF_Y, 0] }, // rooftop
];
const LABELS = [
  { stage: 1, text: 'Arrival', at: [8.5, PH * 0.6, 6] },
  { stage: 2, text: 'Residences', at: [TW / 2 + 0.3, PH + FLOORS * FH * 0.55, TD / 2] },
  { stage: 3, text: 'Rooftop retreat', at: [TW / 2, ROOF_Y + 2.6, 0] },
];

export default function BuildingScene({ stage, glb, tier, reducedMotion, onReady }) {
  return (
    <Canvas shadows={tier === 'full'} dpr={[1, tier === 'full' ? 1.75 : 1.25]} frameloop="demand" camera={{ fov: 30, near: 0.1, far: 300, position: VIEWS[0].pos }} gl={{ antialias: true, powerPreference: 'high-performance' }} >
      <color attach="background" args={['#2a2826']} />
      <fog attach="fog" args={['#2a2826', 70, 150]} />
      <hemisphereLight args={['#f1ede5', '#1f1e1c', 0.6]} />
      <directionalLight position={[30, 60, 25]}
        intensity={1.15}
        color="#fff1dc"
        castShadow={tier === 'full'}
        shadow-mapSize={[1024, 1024]} shadow-camera-left={-30} shadow-camera-right={30} shadow-camera-top={50} shadow-camera-bottom={-10} />
      <directionalLight position={[-30, 10, -20]} intensity={0.25} color="#c9aa7e" />
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color="#252421" roughness={1} />
      </mesh>
      <gridHelper args={[120, 40, '#4a4743', '#34322f']} position-y={0.01} />
      <ContextBlocks />
      <Suspense fallback={null}>{glb ? <Model url={glb} /> : <Massing stage={stage} />}</Suspense>
      {LABELS.map((l) => (
        <Html key={l.text} position={l.at} style={{ pointerEvents: 'none' }} zIndexRange={[2, 2]}>
          <span className={`tag3d${stage === l.stage ? ' on' : ''}`}>{l.text}</span>
        </Html>
      ))}
      <Rig stage={stage} reducedMotion={reducedMotion} onReady={onReady} />
    </Canvas>
  );
}
function Rig({ stage, reducedMotion, onReady }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    // camera-controls exposes its ACTION enum on the class.
    const ACTION = c.constructor.ACTION;
    c.mouseButtons.wheel = ACTION.NONE;
    c.mouseButtons.right = ACTION.NONE;
    c.touches.one = ACTION.NONE; // one finger scrolls the page
    c.touches.two = ACTION.TOUCH_DOLLY_ROTATE;
    onReady?.({
      zoom: (d) => {
        void c.dolly(d, !reducedMotion);
      },
      reset: () => {
        const v = VIEWS[0];
        void c.setLookAt(...v.pos, ...v.target, !reducedMotion);
      },
    });
  }, [onReady, reducedMotion]);
  useEffect(() => {
    const v = VIEWS[stage];
    void ref.current?.setLookAt(...v.pos, ...v.target, !reducedMotion);
  }, [stage, reducedMotion]);
  return <CameraControls ref={ref} makeDefault minDistance={14} maxDistance={90} maxPolarAngle={Math.PI / 2 - 0.05} smoothTime={0.6} />;
}
function Massing({ stage }) {
  const invalidate = useThree((s) => s.invalidate);
  const mats = useMemo(() => {
    const z = (color, roughness, metalness = 0) => {
      const m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
      m.emissive = CHAMPAGNE.clone();
      m.emissiveIntensity = 0;
      return m;
    };
    return { podium: z('#e7e1d6', 0.85), glass: z('#34363a', 0.25, 0.55), slab: z('#e7e1d6', 0.85), roof: z('#e7e1d6', 0.85), planter: z('#5d5f52', 1) };
  }, []);
  useEffect(() => {
    const zones = [[], [mats.podium], [mats.glass, mats.slab], [mats.roof, mats.planter]];
    zones.forEach((ms, i) =>
      ms.forEach((m) => {
        m.emissiveIntensity = i === stage ? 0.32 : 0;
      }),
    );
    invalidate();
  }, [stage, mats, invalidate]);
  const fins = Array.from({ length: 7 }, (_, f) => -TW / 2 + 0.4 + (f * (TW - 0.8)) / 6);
  return (
    <group rotation-y={-0.12}>
      <mesh position-y={PH / 2} material={mats.podium} castShadow receiveShadow>
        <boxGeometry args={[17, PH, 12]} />
      </mesh>
      <mesh position={[0, 1.2, 6.05]}>
        <boxGeometry args={[4, 2.4, 0.2]} />
        <meshStandardMaterial color="#1a1917" roughness={0.3} />
      </mesh>
      <mesh position-y={PH + (FLOORS * FH) / 2} material={mats.glass} castShadow>
        <boxGeometry args={[TW, FLOORS * FH, TD]} />
      </mesh>
      {Array.from({ length: FLOORS + 1 }, (_, i) => (
        <mesh key={`s${i}`} position-y={PH + i * FH} material={mats.slab} castShadow>
          <boxGeometry args={[TW + 0.5, 0.16, TD + 0.5]} />
        </mesh>
      ))}
      {fins.flatMap((x) =>
        [TD / 2 + 0.25, -TD / 2 - 0.25].map((z) => (
          <mesh key={`f${x}${z}`} position={[x, PH + (FLOORS * FH) / 2, z]} material={mats.slab} castShadow>
            <boxGeometry args={[0.12, FLOORS * FH, 0.5]} />
          </mesh>
        )),
      )}
      <mesh position-y={ROOF_Y + 0.25} material={mats.roof}>
        <boxGeometry args={[TW + 0.5, 0.5, TD + 0.5]} />
      </mesh>
      {Array.from({ length: 9 }, (_, b) => (
        <mesh key={`b${b}`} position={[-TW / 2 + 0.8 + (b * (TW - 1.6)) / 8, ROOF_Y + 2.5, 0]} material={mats.roof} castShadow>
          <boxGeometry args={[0.12, 0.12, TD - 1]} />
        </mesh>
      ))}
      {[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([x, z]) => (
        <mesh key={`p${x}${z}`} position={[x * (TW / 2 - 0.8), ROOF_Y + 1.5, z * (TD / 2 - 0.8)]} material={mats.roof}>
          <boxGeometry args={[0.12, 2, 0.12]} />
        </mesh>
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={`pl${i}`} position={[-TW / 2 + 1.2 + (i * (TW - 2.4)) / 4, ROOF_Y + 0.8, TD / 2 - 1]} material={mats.planter}>
          <boxGeometry args={[1.2, 0.6, 1.2]} />
        </mesh>
      ))}
    </group>
  );
}
function Model({ url }) {
  const { scene } = useGLTF(url, true); // true = Draco decoder
  return (
    <Center top>
      <primitive object={scene} />
    </Center>
  );
}
function ContextBlocks() {
  const blocks = [
    [-24, 8, -6, 8, 8],
    [22, 12, -10, 9, 10],
    [-20, 5, 18, 10, 7],
    [26, 6, 14, 8, 8],
    [0, 9, -26, 14, 8],
  ];
  return (
    <>
      {blocks.map(([x, h, z, w, d]) => (
        <mesh key={`${x}${z}`} position={[x, h / 2, z]} castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#2c2b28" roughness={1} />
        </mesh>
      ))}
    </>
  );
}
