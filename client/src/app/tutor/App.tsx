"use client";

import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <Experience />
      </Canvas>
      <UI />
    </div>
  );
}
