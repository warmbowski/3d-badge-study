import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import {
  extend,
  MeshProps,
  ReactThreeFiber,
  useThree,
} from "@react-three/fiber";

import { MeshLineGeometry, MeshLineMaterial } from "meshline";
extend({ MeshLineGeometry, MeshLineMaterial });
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ReactThreeFiber.Object3DNode<
        MeshLineGeometry,
        typeof MeshLineGeometry
      >;
      meshLineMaterial: ReactThreeFiber.Object3DNode<
        MeshLineMaterial,
        typeof MeshLineMaterial
      >;
    }
  }
}

useTexture.preload("/band.jpg");

export function Lanyard({ meshRef }: { meshRef: MeshProps["ref"] }) {
  const texture = useTexture("/band.jpg");
  const { width, height } = useThree((state) => state.size);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <mesh ref={meshRef}>
      <meshLineGeometry />
      <meshLineMaterial
        color="white"
        depthTest={false}
        resolution={new THREE.Vector2(width, height)}
        useMap={1}
        map={texture}
        repeat={new THREE.Vector2(-3, 1)}
        lineWidth={1}
      />
    </mesh>
  );
}
