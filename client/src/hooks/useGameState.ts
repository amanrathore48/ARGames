import { useRef } from "react";
import { Vector3 } from "three";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useGameState(playerId: number) {
  const playerPosition = useRef(new Vector3(0, 0.5, 0));

  const updatePositionMutation = useMutation({
    mutationFn: async (position: Vector3) => {
      console.log('Sending position update:', position); // Debug log
      const res = await apiRequest("PATCH", `/api/players/${playerId}/position`, {
        x: position.x,
        y: position.y,
        z: position.z,
      });
      return res.json();
    },
  });

  const isWithinBoundaries = (position: Vector3) => {
    const PLATFORM_SIZE = 9;
    return Math.abs(position.x) <= PLATFORM_SIZE && Math.abs(position.z) <= PLATFORM_SIZE;
  };

  const updatePosition = (movement: Vector3) => {
    console.log('Current position:', playerPosition.current); // Debug log
    console.log('Applying movement:', movement); // Debug log

    const newPosition = new Vector3(
      playerPosition.current.x + movement.x,
      0.5, // Keep y constant at platform height + ball radius
      playerPosition.current.z + movement.z
    );

    // Only update if within boundaries
    if (isWithinBoundaries(newPosition)) {
      playerPosition.current.copy(newPosition);
      console.log('New position:', newPosition); // Debug log

      // Send position update to server
      updatePositionMutation.mutate(newPosition, {
        onError: (error) => {
          console.error("Failed to update position:", error);
        }
      });
    }
  };

  return {
    playerPosition: playerPosition.current,
    updatePosition,
  };
}