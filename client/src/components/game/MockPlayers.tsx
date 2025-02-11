import { useQuery } from "@tanstack/react-query";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import type { Player } from "@shared/schema";

export default function MockPlayers({ playerId }: { playerId: number }) {
  const mockPlayersRef = useRef<Map<number, Vector3>>(new Map());

  const { data: players } = useQuery<Player[]>({
    queryKey: ["/api/players"],
    refetchInterval: 100,
  });

  useFrame(() => {
    mockPlayersRef.current.forEach((target, id) => {
      const player = players?.find((p) => p.id === id);
      if (player) {
        target.lerp(
          new Vector3(
            Number(player.x),
            Number(player.y),
            Number(player.z)
          ),
          0.1
        );
      }
    });
  });

  if (!players) return null;

  return (
    <>
      {players
        .filter((p) => p.id !== playerId)
        .map((player) => {
          if (!mockPlayersRef.current.has(player.id)) {
            mockPlayersRef.current.set(
              player.id,
              new Vector3(Number(player.x), Number(player.y), Number(player.z))
            );
          }
          return (
            <mesh
              key={player.id}
              position={mockPlayersRef.current.get(player.id)}
              castShadow
            >
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#3498DB" />
            </mesh>
          );
        })}
    </>
  );
}
