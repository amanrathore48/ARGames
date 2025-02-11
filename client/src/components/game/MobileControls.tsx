import { Button } from "@/components/ui/button";

export default function MobileControls() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <div className="flex flex-col gap-2">
        <Button
          onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "w" }))}
          onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { key: "w" }))}
          className="w-16 h-16 bg-primary/50 backdrop-blur-sm"
        >
          ↑
        </Button>
        <Button
          onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "s" }))}
          onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { key: "s" }))}
          className="w-16 h-16 bg-primary/50 backdrop-blur-sm"
        >
          ↓
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }))}
          onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { key: "a" }))}
          className="w-16 h-16 bg-primary/50 backdrop-blur-sm"
        >
          ←
        </Button>
        <Button
          onTouchStart={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "d" }))}
          onTouchEnd={() => window.dispatchEvent(new KeyboardEvent("keyup", { key: "d" }))}
          className="w-16 h-16 bg-primary/50 backdrop-blur-sm"
        >
          →
        </Button>
      </div>
    </div>
  );
}
