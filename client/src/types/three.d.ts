/// <reference types="react-three-fiber" />

import { Object3DNode } from "@react-three/fiber";
import * as THREE from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements extends Object3DNode<THREE.Group, typeof THREE.Group> {}
  }
}
