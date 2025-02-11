import { players, type Player, type InsertPlayer } from "@shared/schema";

export interface IStorage {
  getPlayer(id: number): Promise<Player | undefined>;
  getPlayers(): Promise<Player[]>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayerPosition(id: number, x: number, y: number, z: number): Promise<Player>;
}

export class MemStorage implements IStorage {
  private players: Map<number, Player>;
  currentId: number;

  constructor() {
    this.players = new Map();
    this.currentId = 1;
  }

  async getPlayer(id: number): Promise<Player | undefined> {
    return this.players.get(id);
  }

  async getPlayers(): Promise<Player[]> {
    return Array.from(this.players.values());
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = this.currentId++;
    const player: Player = { ...insertPlayer, id, x: "0", y: "0", z: "0" };
    this.players.set(id, player);
    return player;
  }

  async updatePlayerPosition(id: number, x: number, y: number, z: number): Promise<Player> {
    const player = await this.getPlayer(id);
    if (!player) throw new Error("Player not found");
    
    const updatedPlayer = {
      ...player,
      x: x.toString(),
      y: y.toString(),
      z: z.toString()
    };
    this.players.set(id, updatedPlayer);
    return updatedPlayer;
  }
}

export const storage = new MemStorage();
