import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Gamepad2, Keyboard } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center text-primary">Welcome to 3D Multiplayer Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Keyboard className="h-6 w-6" />
                    How to Play
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Use <span className="font-bold">W</span> to move forward</li>
                    <li>Use <span className="font-bold">S</span> to move backward</li>
                    <li>Use <span className="font-bold">A</span> to move left</li>
                    <li>Use <span className="font-bold">D</span> to move right</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-6 w-6" />
                    Game Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Multiplayer interaction</li>
                    <li>3D environment exploration</li>
                    <li>Real-time position updates</li>
                    <li>Mobile-friendly controls</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center pt-6">
              <Link href="/game">
                <Button size="lg" className="px-8">
                  Start Game
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
