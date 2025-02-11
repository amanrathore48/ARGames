import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlayerSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.get("/api/players", async (_req, res) => {
    const players = await storage.getPlayers();
    res.json(players);
  });

  app.post("/api/players", async (req, res) => {
    const parsed = insertPlayerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid player data" });
      return;
    }

    const player = await storage.createPlayer(parsed.data);
    res.json(player);
  });

  app.patch("/api/players/:id/position", async (req, res) => {
    const id = parseInt(req.params.id);
    const { x, y, z } = req.body;

    if (typeof x !== "number" || typeof y !== "number" || typeof z !== "number") {
      res.status(400).json({ message: "Invalid position data" });
      return;
    }

    try {
      const player = await storage.updatePlayerPosition(id, x, y, z);
      res.json(player);
    } catch (error) {
      res.status(404).json({ message: "Player not found" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
