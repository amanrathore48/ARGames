import { Vector3 } from "three";

export default function Player({ position }: { position: Vector3 }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color="#E74C3C"
        metalness={0.4}
        roughness={0.5}
      />
    </mesh>
  );
}