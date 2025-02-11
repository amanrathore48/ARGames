import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { Gamepad2, Keyboard } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [selectedMap, setSelectedMap] = useState("classic");
  const [, setLocation] = useLocation();

  const handleStartGame = () => {
    if (!nickname.trim()) {
      alert("Please enter a nickname!");
      return;
    }
    setLocation(`/game?nickname=${encodeURIComponent(nickname)}&map=${selectedMap}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center text-primary">Welcome to 3D Knockout Game</CardTitle>
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
                    <li>Use <span className="font-bold">W</span> or <span className="font-bold">↑</span> to move forward</li>
                    <li>Use <span className="font-bold">S</span> or <span className="font-bold">↓</span> to move backward</li>
                    <li>Use <span className="font-bold">A</span> or <span className="font-bold">←</span> to move left</li>
                    <li>Use <span className="font-bold">D</span> or <span className="font-bold">→</span> to move right</li>
                    <li>Push other players off the platform to win!</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-6 w-6" />
                    Game Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Nickname</label>
                    <Input
                      placeholder="Enter your nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Map</label>
                    <Select value={selectedMap} onValueChange={setSelectedMap}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a map" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">Classic Arena</SelectItem>
                        <SelectItem value="platforms">Floating Platforms</SelectItem>
                        <SelectItem value="maze">Maze Runner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center pt-6">
              <Button size="lg" className="px-8" onClick={handleStartGame}>
                Start Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}