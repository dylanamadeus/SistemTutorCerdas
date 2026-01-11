"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, ThreeElements } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useChat } from "../hooks/useChat";

// === Type definitions ===
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

type AvatarProps = JSX.IntrinsicElements["group"] & {};

export interface Message {
  text?: string;
  animation?: string;
  facialExpression?: string;
  lipsync?: {
    mouthCues: { start: number; end: number; value: string }[];
  };
  audio?: string;
}

// === Facial Expressions ===
const facialExpressions: Record<string, Record<string, number>> = {
  default: {},
  smile: {
    browInnerUp: 0.17,
    eyeSquintLeft: 0.4,
    eyeSquintRight: 0.44,
    noseSneerLeft: 0.17,
    noseSneerRight: 0.14,
    mouthPressLeft: 0.61,
    mouthPressRight: 0.41,
  },
  funnyFace: {
    jawLeft: 0.63,
    mouthPucker: 0.53,
    noseSneerLeft: 1,
    noseSneerRight: 0.39,
    mouthLeft: 1,
    eyeLookUpLeft: 1,
    eyeLookUpRight: 1,
    cheekPuff: 1,
    mouthDimpleLeft: 0.41,
    mouthRollLower: 0.32,
    mouthSmileLeft: 0.35,
    mouthSmileRight: 0.35,
  },
  sad: {
    mouthFrownLeft: 1,
    mouthFrownRight: 1,
    mouthShrugLower: 0.78,
    browInnerUp: 0.45,
    eyeSquintLeft: 0.72,
    eyeSquintRight: 0.75,
    eyeLookDownLeft: 0.5,
    eyeLookDownRight: 0.5,
    jawForward: 1,
  },
  surprised: {
    eyeWideLeft: 0.5,
    eyeWideRight: 0.5,
    jawOpen: 0.35,
    mouthFunnel: 1,
    browInnerUp: 1,
  },
  angry: {
    browDownLeft: 1,
    browDownRight: 1,
    eyeSquintLeft: 1,
    eyeSquintRight: 1,
    jawForward: 1,
    jawLeft: 1,
    mouthShrugLower: 1,
    noseSneerLeft: 1,
    noseSneerRight: 0.42,
    eyeLookDownLeft: 0.16,
    eyeLookDownRight: 0.16,
    cheekSquintLeft: 1,
    cheekSquintRight: 1,
    mouthClose: 0.23,
    mouthFunnel: 0.63,
    mouthDimpleRight: 1,
  },
  crazy: {
    browInnerUp: 0.9,
    jawForward: 1,
    noseSneerLeft: 0.57,
    noseSneerRight: 0.51,
    eyeLookDownLeft: 0.39,
    eyeLookUpRight: 0.4,
    eyeLookInLeft: 0.96,
    eyeLookInRight: 0.96,
    jawOpen: 0.96,
    mouthDimpleLeft: 0.96,
    mouthDimpleRight: 0.96,
    mouthStretchLeft: 0.27,
    mouthStretchRight: 0.28,
    mouthSmileLeft: 0.55,
    mouthSmileRight: 0.38,
    tongueOut: 0.96,
  },
};

// === Viseme mappings ===
const corresponding: Record<string, string> = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

let setupMode = false;

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { nodes, materials, scene } = useGLTF("/models/68b6c203557a1be13353f17c.glb") as any;
  const { animations } = useGLTF("/models/animations.glb") as any;
  // const { onMessagePlayed, chat } = useChat();

  const group = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, group);

  const [animation, setAnimation] = useState("Idle");
  const [facialExpression, setFacialExpression] = useState("default");
  const [lipsync, setLipsync] = useState<Message["lipsync"]>();
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [blink, setBlink] = useState(false);
  const [winkLeft, setWinkLeft] = useState(false);
  const [winkRight, setWinkRight] = useState(false);
  // const [message, setMessage] = useState<Message | null>(null);
  const { message, onMessagePlayed } = useChat();

  // === Detect new backend message ===
//   useEffect(() => {
//   if (message) {
//     console.log("📩 New message from context:", message);
//     setMessage(message);
//   }
// }, [message]);


  // === Animation control ===
  useEffect(() => {
    if (!actions || !animation) return;
    const action = actions[animation];
    if (action) {
      action.reset().fadeIn(0.5).play();
      return () => {    
        action.fadeOut(0.5);
      };
    }
    // pastikan cleanup return void
    return undefined;
  }, [animation, actions]);


  // === When new message arrives ===
  // useEffect(() => {
  //   if (!message) {
  //     setAnimation("Idle");
  //     return;
  //   }

  //   if (message.animation) setAnimation(message.animation);
  //   if (message.facialExpression) setFacialExpression(message.facialExpression);
  //   if (message.lipsync) setLipsync(message.lipsync);

  //   if (message.audio) {
  //     let base64 = message.audio.trim();
  //     if (base64.startsWith("data:audio")) {
  //       base64 = base64.split(",")[1];
  //     }

  //     const audioEl = new Audio(`data:audio/wav;base64,${base64}`);
  //     audioEl.volume = 1.0; // pastikan tidak mute
  //     setAudio(audioEl);

  //     audioEl.onended = onMessagePlayed;
  //     audioEl
  //       .play()
  //       .then(() => console.log("🎧 Audio started, duration:", audioEl.duration))
  //       .catch((err) => console.error("Audio play failed:", err));
  //   }
  // }, [message]);

  useEffect(() => {
    if (!message) return;
    console.log("📩 New message from context:", message);

    // Update local states sesuai message context
    if (message.animation) setAnimation(message.animation);
    if (message.facialExpression) setFacialExpression(message.facialExpression);
    if (message.lipsync) setLipsync(message.lipsync);

    if (message.audio) {
      let base64 = message.audio.trim();
      if (base64.startsWith("data:audio")) {
        base64 = base64.split(",")[1];
      }

      const audioEl = new Audio(`data:audio/wav;base64,${base64}`);
      audioEl.volume = 1.0;
      setAudio(audioEl);

      audioEl.onended = () => {
        setTimeout(() => {
          setAnimation("Idle");
          setFacialExpression("default");
          onMessagePlayed();
        }, 1500);
      };
      audioEl
        .play()
        .then(() => console.log("🎧 Audio started, duration:", audioEl.duration))
        .catch((err) => console.error("Audio play failed:", err));
    }
  }, [message]);

  // === Morph target helper ===
  const lerpMorphTarget = (target: string, value: number, speed = 0.1) => {
    scene.traverse((child: any) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if (index === undefined) return;
        child.morphTargetInfluences[index] = THREE.MathUtils.lerp(
          child.morphTargetInfluences[index],
          value,
          speed
        );
      }
    });
  };

  // === Lipsync + blink animation ===
  useFrame(() => {
    if (!scene) return;

    const mapping = facialExpressions[facialExpression] || {};
    Object.keys(nodes.EyeLeft.morphTargetDictionary).forEach((key) => {
      if (key === "eyeBlinkLeft" || key === "eyeBlinkRight") return;
      const targetValue = mapping[key] ?? 0;
      lerpMorphTarget(key, targetValue, 0.1);
    });

    lerpMorphTarget("eyeBlinkLeft", blink || winkLeft ? 1 : 0, 0.5);
    lerpMorphTarget("eyeBlinkRight", blink || winkRight ? 1 : 0, 0.5);

    if (setupMode || !message || !lipsync || !audio) return;

    const applied: string[] = [];
    const currentAudioTime = audio.currentTime;

    for (const cue of lipsync.mouthCues) {
      if (currentAudioTime >= cue.start && currentAudioTime <= cue.end) {
        const viseme = corresponding[cue.value];
        if (viseme) {
          applied.push(viseme);
          lerpMorphTarget(viseme, 1, 0.2);
        }
        break;
      }
    }

    Object.values(corresponding).forEach((v) => {
      if (!applied.includes(v)) lerpMorphTarget(v, 0, 0.1);
    });
  });

  // === Blink randomizer ===
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const nextBlink = () => {
      blinkTimeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          nextBlink();
        }, 200);
      }, THREE.MathUtils.randInt(1000, 5000));
    };
    nextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  

  // === Render ===
  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh name="Wolf3D_Body" geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh name="Wolf3D_Outfit_Bottom" geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh name="Wolf3D_Outfit_Footwear" geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh name="Wolf3D_Outfit_Top" geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh name="Wolf3D_Hair" geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
  );
};

// Preload models
useGLTF.preload("/models/68b6c203557a1be13353f17c.glb");
useGLTF.preload("/models/animations.glb");
