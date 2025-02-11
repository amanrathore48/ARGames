import { pgTable, text, serial, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  x: numeric("x").notNull().default("0"),
  y: numeric("y").notNull().default("0"),
  z: numeric("z").notNull().default("0"),
});

export const insertPlayerSchema = createInsertSchema(players).pick({
  name: true,
});

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;
