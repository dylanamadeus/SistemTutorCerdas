"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  CameraControls,
  ContactShadows,
  Environment,
  Text,
} from "@react-three/drei";
import { useChat } from "../hooks/useChat";
import { Avatar } from "./Avatar";
import { Group } from "three";
import type { CameraControls as CameraControlsType } from "@react-three/drei";

// ----------------------
// Dots Component
// ----------------------
interface DotsProps {
  position?: [number, number, number];
  ["position-y"]?: number;
  ["position-x"]?: number;
}

const Dots: React.FC<DotsProps> = (props) => {
  const { loading } = useChat();
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingText((prev) => (prev.length > 2 ? "." : prev + "."));
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLoadingText("");
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <group {...props}>
      <Text fontSize={0.14} anchorX="left" anchorY="bottom">
        {loadingText}
        <meshBasicMaterial attach="material" color="black" />
      </Text>
    </group>
  );
};

// ----------------------
// Experience Component
// ----------------------
export const Experience: React.FC = () => {
  const cameraControls = useRef<CameraControlsType>(null);
  const { cameraZoomed } = useChat();

  useEffect(() => {
    if (cameraControls.current) {
      cameraControls.current.setLookAt(0, 2, 5, 0, 1.5, 0);
    }
  }, []);

  useEffect(() => {
    if (!cameraControls.current) return;

    if (cameraZoomed) {
      cameraControls.current.setLookAt(0, 1.6, 0.8, 0.04, 1.5, 0, true);
    } else {
      cameraControls.current.setLookAt(0, 2.0, 3.0, 0, 1.2, 0, true);
    }
  }, [cameraZoomed]);

  return (
    <>
      <CameraControls ref={cameraControls} />
      <Environment preset="sunset" />
      {/* Wrapping Dots into Suspense to prevent Blink when Troika/Font is loaded */}
      <Suspense>
        <Dots position-y={1.75} position-x={-0.02} />
      </Suspense>
      <Avatar />
      <ContactShadows opacity={0.7} />
    </>
  );
};
