import React from "react";

function Floor() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
      <planeBufferGeometry args={[100, 100]} />
      <shadowMaterial />
    </mesh>
  );
}

export default Floor;
