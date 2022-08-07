import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { MeshWobbleMaterial } from "@react-three/drei";

function Box({ position, args, color, speed }) {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxGeometry args={args} />
      <MeshWobbleMaterial color={color} speed={speed} factor={0.6} />
    </mesh>
  );
}

export default Box;
