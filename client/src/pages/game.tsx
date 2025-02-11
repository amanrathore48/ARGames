import { Canvas } from "@react-three/fiber";
import Scene from "@/components/game/Scene";
import MobileControls from "@/components/game/MobileControls";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Game() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [, setLocation] = useLocation(); 

  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);
  const nickname = params.get('nickname') || `Player${Math.floor(Math.random() * 1000)}`;
  const mapType = params.get('map') || 'classic';

  const createPlayerMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/players", {
        name: nickname,
      });
      return res.json();
    },
  });

  useEffect(() => {
    createPlayerMutation.mutate(undefined, {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to join the game",
          variant: "destructive",
        });
        setLocation("/"); 
      },
    });
  }, []);

  if (createPlayerMutation.isPending || !createPlayerMutation.data) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-2xl text-primary">Joining game...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <Canvas shadows camera={{ position: [0, 15, 20], fov: 75 }}>
        <Scene playerId={createPlayerMutation.data.id} mapType={mapType} />
      </Canvas>
      {isMobile && <MobileControls />}
    </div>
  );
}