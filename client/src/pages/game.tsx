import { Canvas } from "@react-three/fiber";
import Scene from "@/components/game/Scene";
import MobileControls from "@/components/game/MobileControls";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useEffect } from "react";

export default function Game() {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const createPlayerMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/players", {
        name: `Player${Math.floor(Math.random() * 1000)}`,
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
      },
    });
  }, []);

  if (createPlayerMutation.isPending) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-2xl text-primary">Loading...</div>
      </div>
    );
  }

  if (!createPlayerMutation.data) return null;

  return (
    <div className="h-screen w-screen">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
        <Scene playerId={createPlayerMutation.data.id} />
      </Canvas>
      {isMobile && <MobileControls />}
    </div>
  );
}