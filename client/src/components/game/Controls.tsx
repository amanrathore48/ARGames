import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Vector3 } from "three";
import { useGameState } from "@/hooks/useGameState";

export default function Controls({ playerId }: { playerId: number }) {
  const keys = useRef(new Set<string>());
  const { updatePosition } = useGameState(playerId);

  useFrame(() => {
    const moveSpeed = 0.3;
    const movement = new Vector3(0, 0, 0);

    // Apply movement based on active keys
    if (keys.current.has("w") || keys.current.has("arrowup")) {
      movement.z = -moveSpeed;
    }
    if (keys.current.has("s") || keys.current.has("arrowdown")) {
      movement.z = moveSpeed;
    }
    if (keys.current.has("a") || keys.current.has("arrowleft")) {
      movement.x = -moveSpeed;
    }
    if (keys.current.has("d") || keys.current.has("arrowright")) {
      movement.x = moveSpeed;
    }

    // Only update if there's actual movement
    if (movement.x !== 0 || movement.z !== 0) {
      console.log('Moving:', movement); // Debug log
      updatePosition(movement);
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      console.log('Key down:', key); // Debug log
      keys.current.add(key);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      console.log('Key up:', key); // Debug log
      keys.current.delete(key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return null;
}