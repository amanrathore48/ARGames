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

  const updatePosition = (movement: Vector3) => {
    const newPosition = playerPosition.current.clone().add(movement);
    playerPosition.current.copy(newPosition);
    updatePositionMutation.mutate(newPosition);
  };

  return {
    playerPosition: playerPosition.current,
    updatePosition,
  };
}
