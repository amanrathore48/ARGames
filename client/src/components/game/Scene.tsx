import { useThree } from "@react-three/fiber";
import Player from "./Player";
import Controls from "./Controls";
import MockPlayers from "./MockPlayers";
import Platform from "./Platform";
import { useGameState } from "@/hooks/useGameState";
import { Vector3 } from "three";

export default function Scene({ playerId }: { playerId: number }) {
  const { camera } = useThree();
  const { playerPosition } = useGameState(playerId);

  // Set camera position for better view
  camera.position.set(0, 15, 20);
  camera.lookAt(0, 0, 0);

  return (
    <>
      <color attach="background" args={["#2C3E50"]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        intensity={1.5}
      />

      {/* Main Platform */}
      <Platform 
        position={new Vector3(0, -0.5, 0)} 
        size={new Vector3(20, 1, 20)} 
        color="#34495E"
      />

      {/* Raised Platforms */}
      <Platform 
        position={new Vector3(5, 0.5, 5)} 
        size={new Vector3(4, 1, 4)} 
        color="#2980B9"
      />
      <Platform 
        position={new Vector3(-5, 0.5, -5)} 
        size={new Vector3(4, 1, 4)} 
        color="#2980B9"
      />
      <Platform 
        position={new Vector3(5, 0.5, -5)} 
        size={new Vector3(4, 1, 4)} 
        color="#2980B9"
      />
      <Platform 
        position={new Vector3(-5, 0.5, 5)} 
        size={new Vector3(4, 1, 4)} 
        color="#2980B9"
      />

      {/* Players */}
      <Player position={playerPosition} />
      <MockPlayers playerId={playerId} />
      <Controls playerId={playerId} />
    </>
  );
}