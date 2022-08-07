import React from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./components/Box";
import Floor from "./components/Floor";
import Lights from "./components/Lights";
import { softShadows, OrbitControls } from "@react-three/drei";

softShadows();

function ThreeApp() {
  return (
    <>
      <div style={{ height: "120px", backgroundColor: "#a44cd3" }}>
        <h1 style={{ color: "white", paddingTop: "60px" }}>Three.js</h1>
      </div>
      <Canvas
        shadows
        coloranagement="true"
        style={{ width: "100vw", height: "85vh" }}
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <Box position={[0, 1, 0]} args={[3, 2, 1]} color="#a44cd3" speed={2} />
        <Box position={[-2, 1, -5]} color="#bca0dc" speed={6} />
        <Box position={[5, 1, -2]} color="#bca0dc" speed={6} />
        <Floor />
        <Lights />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default ThreeApp;
