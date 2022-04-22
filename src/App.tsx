import { Canvas } from "@react-three/fiber";
import * as React from "react";
import Box from "src/components/Box";
import "./App.css";

const App = () => {
  return (
    <Canvas resize={{ scroll: true, offsetSize: true }}>
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={2} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      {/* T */}
      <Box position={[-7, 3, -3]} scale={1} />
      <Box position={[-7, 1, -3]} scale={1} />
      <Box position={[-7, -1, -3]} scale={1} />

      <Box position={[-9, 3, -3]} scale={1} />
      <Box position={[-5, 3, -3]} scale={1} />
      {/* Ù */}
      <Box position={[-2, 3, -3]} scale={1} />
      <Box position={[-2, 1, -3]} scale={1} />
      <Box position={[-2, -1, -3]} scale={1} />

      <Box position={[0, -1, -3]} scale={1} />
      <Box position={[2, -1, -3]} scale={1} />

      <Box position={[2, 1, -3]} scale={1} />
      <Box position={[2, 3, -3]} scale={1} />
      {/* N */}
      <Box position={[5, 3, -3]} scale={1} />
      <Box position={[5, 1, -3]} scale={1} />
      <Box position={[5, -1, -3]} scale={1} />

      <Box position={[7, 1.75, -3]} scale={1} />
      <Box position={[8, -0.1, -3]} scale={1} />
      <Box position={[9, -1, -3]} scale={1} />

      <Box position={[9, 1, -3]} scale={1} />
      <Box position={[9, 3, -3]} scale={1} />

      <Box position={[-1, 5.5, -3]} scale={1} />
      <Box position={[0.35, 5.25, -3]} scale={1} />
      <Box position={[1.7, 4.85, -3]} scale={1} />
      {/* <Box position={[0.45, 4, -3]} scale={1} /> */}
    </Canvas>
  );
};

export default App;
