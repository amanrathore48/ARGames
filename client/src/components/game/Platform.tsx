import { Vector3 } from "three";

interface PlatformProps {
  position: Vector3;
  size: Vector3;
  color?: string;
}

export default function Platform({ position, size, color = "#34495E" }: PlatformProps) {
  return (
    <mesh position={position} receiveShadow castShadow>
      <boxGeometry args={[size.x, size.y, size.z]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
