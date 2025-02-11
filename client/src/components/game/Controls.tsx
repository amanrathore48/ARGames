import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Vector3 } from "three";
import { useGameState } from "@/hooks/useGameState";

export default function Controls({ playerId }: { playerId: number }) {
  const keys = useRef(new Set<string>());
  const { updatePosition } = useGameState(playerId);

  useFrame(() => {
    const moveSpeed = 0.1;
    const movement = new Vector3();

    if (keys.current.has("w")) movement.z -= moveSpeed;
    if (keys.current.has("s")) movement.z += moveSpeed;
    if (keys.current.has("a")) movement.x -= moveSpeed;
    if (keys.current.has("d")) movement.x += moveSpeed;

    if (movement.length() > 0) {
      updatePosition(movement);
    }
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => keys.current.add(e.key.toLowerCase());
    const onKeyUp = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return null;
}