import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Vector3 } from "three";
import { useGameState } from "@/hooks/useGameState";

export default function Controls({ playerId }: { playerId: number }) {
  const keys = useRef(new Set<string>());
  const { updatePosition } = useGameState(playerId);

  useFrame(() => {
    const moveSpeed = 0.3; // Increased speed for better responsiveness
    const movement = new Vector3();

    if (keys.current.has("w") || keys.current.has("arrowup")) movement.z -= moveSpeed;
    if (keys.current.has("s") || keys.current.has("arrowdown")) movement.z += moveSpeed;
    if (keys.current.has("a") || keys.current.has("arrowleft")) movement.x -= moveSpeed;
    if (keys.current.has("d") || keys.current.has("arrowright")) movement.x += moveSpeed;

    if (movement.length() > 0) {
      movement.normalize().multiplyScalar(moveSpeed);
      updatePosition(movement);
    }
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      e.preventDefault(); // Prevent browser scrolling
      keys.current.add(e.key.toLowerCase());
    };

    const onKeyUp = (e: KeyboardEvent) => {
      e.preventDefault();
      keys.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return null;
}