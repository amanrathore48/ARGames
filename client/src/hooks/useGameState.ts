import { useRef } from "react";
import { Vector3 } from "three";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useGameState(playerId: number) {
  const playerPosition = useRef(new Vector3(0, 0, 0));

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

  const isWithinBoundaries = (position: Vector3) => {
    // Main platform boundaries
    const PLATFORM_SIZE = 10; // Half of the platform size
    return Math.abs(position.x) <= PLATFORM_SIZE && Math.abs(position.z) <= PLATFORM_SIZE;
  };

  const updatePosition = (movement: Vector3) => {
    const newPosition = playerPosition.current.clone().add(movement);

    // Only update if within boundaries
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