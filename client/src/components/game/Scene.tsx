import { useThree } from "@react-three/fiber";
import Player from "./Player";
import Controls from "./Controls";
import MockPlayers from "./MockPlayers";
import { useGameState } from "@/hooks/useGameState";

export default function Scene({ playerId }: { playerId: number }) {
  const { scene } = useThree();
  const { playerPosition } = useGameState(playerId);

  return (
    <>
      <color attach="background" args={["#ECF0F1"]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Player position={playerPosition} />
      <MockPlayers playerId={playerId} />
      <Controls playerId={playerId} />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
    </>
  );
}
