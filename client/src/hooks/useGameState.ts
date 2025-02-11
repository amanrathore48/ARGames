
import { useRef, useEffect } from "react";
import { Vector3 } from "three";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useGameState(playerId: number) {
  const playerPosition = useRef(new Vector3(0, 0.5, 0));
  const isInitialized = useRef(false);

  const updatePositionMutation = useMutation({
    mutationFn: async (position: Vector3) => {
      const res = await apiRequest("PATCH", `/api/players/${playerId}/position`, {
        x: position.x,
        y: position.y,
        z: position.z,
      });
      return res.json();
    },
  });

  useEffect(() => {
    if (!isInitialized.current) {
      // Initialize player position
      updatePositionMutation.mutate(playerPosition.current);
      isInitialized.current = true;
    }
  }, [playerId]);

  const isWithinBoundaries = (position: Vector3) => {
    const PLATFORM_SIZE = 9;
    return Math.abs(position.x) <= PLATFORM_SIZE && Math.abs(position.z) <= PLATFORM_SIZE;
  };

  const updatePosition = (movement: Vector3) => {
    const newPosition = new Vector3(
      playerPosition.current.x + movement.x,
      0.5,
      playerPosition.current.z + movement.z
    );

    if (isWithinBoundaries(newPosition)) {
      playerPosition.current.copy(newPosition);
      updatePositionMutation.mutate(newPosition);
    }
  };

  return {
    playerPosition: playerPosition.current,
    updatePosition,
  };
}
