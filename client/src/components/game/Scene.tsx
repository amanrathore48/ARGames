import { useThree } from "@react-three/fiber";
import Player from "./Player";
import Controls from "./Controls";
import MockPlayers from "./MockPlayers";
import Platform from "./Platform";
import { useGameState } from "@/hooks/useGameState";
import { Vector3 } from "three";

interface SceneProps {
  playerId: number;
  mapType: string;
}

export default function Scene({ playerId, mapType }: SceneProps) {
  const { camera } = useThree();
  const { playerPosition } = useGameState(playerId);

  // Set camera position for better view
  camera.position.set(0, 15, 20);
  camera.lookAt(0, 0, 0);

  const renderMap = () => {
    switch (mapType) {
      case 'platforms':
        return (
          <>
            <Platform 
              position={new Vector3(0, -0.5, 0)} 
              size={new Vector3(20, 1, 20)} 
              color="#34495E"
            />
            {/* Elevated platforms in corners */}
            <Platform 
              position={new Vector3(7, 1, 7)} 
              size={new Vector3(4, 1, 4)} 
              color="#2980B9"
            />
            <Platform 
              position={new Vector3(-7, 1, -7)} 
              size={new Vector3(4, 1, 4)} 
              color="#2980B9"
            />
            <Platform 
              position={new Vector3(7, 1, -7)} 
              size={new Vector3(4, 1, 4)} 
              color="#2980B9"
            />
            <Platform 
              position={new Vector3(-7, 1, 7)} 
              size={new Vector3(4, 1, 4)} 
              color="#2980B9"
            />
          </>
        );
      case 'maze':
        return (
          <>
            <Platform 
              position={new Vector3(0, -0.5, 0)} 
              size={new Vector3(24, 1, 24)} 
              color="#34495E"
            />
            {/* Maze walls */}
            <Platform 
              position={new Vector3(-6, 0.5, 0)} 
              size={new Vector3(2, 2, 12)} 
              color="#2980B9"
            />
            <Platform 
              position={new Vector3(6, 0.5, 0)} 
              size={new Vector3(2, 2, 12)} 
              color="#2980B9"
            />
            <Platform 
              position={new Vector3(0, 0.5, 6)} 
              size={new Vector3(12, 2, 2)} 
              color="#2980B9"
            />
            <Platform 
              position={new Vector3(0, 0.5, -6)} 
              size={new Vector3(12, 2, 2)} 
              color="#2980B9"
            />
          </>
        );
      default: // classic
        return (
          <Platform 
            position={new Vector3(0, -0.5, 0)} 
            size={new Vector3(20, 1, 20)} 
            color="#34495E"
          />
        );
    }
  };

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

      {/* Map */}
      {renderMap()}

      {/* Players - Position players on top of platform by setting y to 0.5 (platform height + ball radius) */}
      <Player position={new Vector3(playerPosition.x, 0.5, playerPosition.z)} />
      <MockPlayers playerId={playerId} />
      <Controls playerId={playerId} />
    </>
  );
}