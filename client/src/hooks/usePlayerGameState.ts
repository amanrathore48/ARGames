import { useRef, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type Vector = { x: number; y: number; z: number };

export function useGameState(playerId: number) {
  const initialPos = { x: 0, y: 0.5, z: 0 };
  const [position, setPosition] = useState<Vector>(initialPos);
  const playerPosition = useRef<Vector>(initialPos);
  const isInitialized = useRef(false);

  const updatePositionMutation = useMutation({
    mutationFn: async (position: Vector) => {
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
      updatePositionMutation.mutate(playerPosition.current);
      isInitialized.current = true;
    }
  }, [playerId]);

  const isWithinBoundaries = (position: Vector) => {
    const PLATFORM_SIZE = 9;
    return Math.abs(position.x) <= PLATFORM_SIZE && Math.abs(position.z) <= PLATFORM_SIZE;
  };

  const updatePosition = (movement: Vector) => {
    const newPosition: Vector = {
      x: playerPosition.current.x + movement.x,
      y: 0.5,
      z: playerPosition.current.z + movement.z
    };

    if (isWithinBoundaries(newPosition)) {
      playerPosition.current = newPosition;
      updatePositionMutation.mutate(newPosition);
      setPosition(newPosition);
    }
  };

  return {
    playerPosition: position,
    updatePosition,
  };
}