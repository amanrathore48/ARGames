
import { useRef, useState, useEffect } from "react";
import { Vector3 } from "three";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Player {
  id: number;
  name: string;
  x: number;
  y: number;
  z: number;
}

export function useGameState(playerId: number) {
  const [position, setPosition] = useState(() => new Vector3(0, 0.5, 0));
  const [otherPlayers, setOtherPlayers] = useState<Player[]>([]);
  const playerPosition = useRef(new Vector3(0, 0.5, 0));
  const isInitialized = useRef(false);

  const { data: players } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/players");
      return res.json() as Promise<Player[]>;
    },
    refetchInterval: 100, // Fetch every 100ms
  });

  useEffect(() => {
    if (players) {
      // Update other players
      const others = players.filter(player => player.id !== playerId).map(player => ({
        ...player,
        x: Number(player.x),
        y: Number(player.y),
        z: Number(player.z)
      }));
      setOtherPlayers(others);

      // Update current player position from server
      const currentPlayer = players.find(player => player.id === playerId);
      if (currentPlayer) {
        // Update position directly without creating new instances
        const newPosition = new Vector3(
          Number(currentPlayer.x),
          Number(currentPlayer.y),
          Number(currentPlayer.z)
        );
        const positionCopy = new Vector3(newPosition.x, newPosition.y, newPosition.z);
        playerPosition.current = positionCopy;
        setPosition(positionCopy);
      }
    }
  }, [players, playerId]);

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
      setPosition(new Vector3().copy(newPosition));
    }
  };

  return {
    playerPosition: position,
    updatePosition,
  };
}
