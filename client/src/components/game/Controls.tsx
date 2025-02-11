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

    // Handle both WASD and arrow keys (normalized to lowercase)
    if (keys.current.has("w") || keys.current.has("arrowup")) {
      movement.z -= moveSpeed;
    }
    if (keys.current.has("s") || keys.current.has("arrowdown")) {
      movement.z += moveSpeed;
    }
    if (keys.current.has("a") || keys.current.has("arrowleft")) {
      movement.x -= moveSpeed;
    }
    if (keys.current.has("d") || keys.current.has("arrowright")) {
      movement.x += moveSpeed;
    }

    // Only update if there's actual movement
    if (movement.length() > 0) {
      updatePosition(movement);
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Normalize key to lowercase and handle arrow keys
      const key = event.key.toLowerCase();
      keys.current.add(key);

      // Prevent default only for game control keys
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      keys.current.delete(key);

      // Prevent default only for game control keys
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        event.preventDefault();
      }
    };

    // Add event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return null;
}