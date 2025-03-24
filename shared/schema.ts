import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Database tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Application schemas
export const logicFrameworkSchema = z.object({
  organization: z.string().min(1, "Organization name is required"),
  contact: z.string().min(1, "Contact person is required"),
  email: z.string().email("Please enter a valid email"),
  problem: z.string().min(10, "Please describe the problem in more detail"),
  goal: z.string().min(10, "Please describe your goal in more detail"),
  targetGroup: z.string().min(5, "Please describe your target group"),
  action1: z.string().min(3, "Action 1 is required"),
  action2: z.string().min(3, "Action 2 is required"),
  action3: z.string().min(3, "Action 3 is required"),
  successIndicators: z.string().min(10, "Please describe your success indicators in more detail"),
  challenges: z.string().optional(),
});

export const swotAnalysisSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  projectDescription: z.string().min(10, "Please describe your project in more detail"),
  strengths: z.string().min(10, "Please add more details to the strengths section"),
  weaknesses: z.string().min(10, "Please add more details to the weaknesses section"),
  opportunities: z.string().min(10, "Please add more details to the opportunities section"),
  threats: z.string().min(10, "Please add more details to the threats section"),
});

export type LogicFrameworkData = z.infer<typeof logicFrameworkSchema>;
export type SwotAnalysisData = z.infer<typeof swotAnalysisSchema>;
