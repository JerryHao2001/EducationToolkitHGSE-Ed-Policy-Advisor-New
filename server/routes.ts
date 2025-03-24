import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateLogicFramework, generateSwotAnalysis } from "./openai";
import { logicFrameworkSchema, swotAnalysisSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the educational tools
  
  // Logic Framework Generator
  app.post("/api/logic-framework", async (req, res) => {
    try {
      const validData = logicFrameworkSchema.parse(req.body);
      const generatedHtml = await generateLogicFramework(validData);
      
      res.json({ html: generatedHtml });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error generating logic framework:", error);
        res.status(500).json({ message: "Failed to generate logic framework" });
      }
    }
  });

  // SWOT Analysis
  app.post("/api/swot-analysis", async (req, res) => {
    try {
      const validData = swotAnalysisSchema.parse(req.body);
      const generatedHtml = await generateSwotAnalysis(validData);
      
      res.json({ html: generatedHtml });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error generating SWOT analysis:", error);
        res.status(500).json({ message: "Failed to generate SWOT analysis" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
