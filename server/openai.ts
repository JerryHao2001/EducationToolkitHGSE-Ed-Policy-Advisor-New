import OpenAI from "openai";
import { LogicFrameworkData, SwotAnalysisData } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key-for-development" });

export async function generateLogicFramework(data: LogicFrameworkData): Promise<string> {
  try {
    const prompt = `
      Please create a detailed Logic Framework for an educational program or initiative using the information provided below. 
      Format your response as HTML that can be directly displayed in a web application.
      Use semantic HTML tags and appropriate formatting.
      
      Organization: ${data.organization}
      Contact Person: ${data.contact}
      Email: ${data.email}
      
      Problem: ${data.problem}
      Goal: ${data.goal}
      Target Group: ${data.targetGroup}
      
      Key Actions:
      1. ${data.action1}
      2. ${data.action2}
      3. ${data.action3}
      
      Success Indicators: ${data.successIndicators}
      Challenges/Risks: ${data.challenges || "None specified"}
      
      Include these sections in your response:
      1. Header with the organization name
      2. Problem Statement
      3. Goal
      4. Target Audience
      5. Inputs (resources needed)
      6. Activities (based on the key actions)
      7. Outputs (direct products)
      8. Outcomes (short-term, medium-term, long-term)
      9. Success Indicators
      10. Potential Challenges

      Format the HTML to be visually appealing with appropriate sections, headings, and lists.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    return response.choices[0].message.content || 
      "<p>Sorry, we could not generate a logic framework at this time. Please try again later.</p>";
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate Logic Framework");
  }
}

export async function generateSwotAnalysis(data: SwotAnalysisData): Promise<string> {
  try {
    const prompt = `
      Please create a detailed SWOT Analysis for an educational program or initiative using the information provided below.
      Format your response as HTML that can be directly displayed in a web application.
      Use semantic HTML tags and appropriate formatting.
      
      Project Name: ${data.projectName}
      Project Description: ${data.projectDescription}
      
      User-provided input:
      Strengths: ${data.strengths}
      Weaknesses: ${data.weaknesses}
      Opportunities: ${data.opportunities}
      Threats: ${data.threats}
      
      Expand on these points with additional insights and analysis. Your response should:
      1. Include a header with the project name
      2. Have a brief introduction explaining the project and what a SWOT analysis is
      3. Present the four SWOT quadrants in a visually appealing way (could be a table or styled div elements)
      4. Under each section (Strengths, Weaknesses, Opportunities, Threats):
         - List the user-provided points
         - Add 2-3 additional points based on your analysis of the project
         - Provide brief explanations for each point
      5. Include a summary of key findings and recommendations

      Make the HTML visually appealing with appropriate colors for each section:
      - Strengths: Blue
      - Weaknesses: Red
      - Opportunities: Green
      - Threats: Yellow/Orange
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    return response.choices[0].message.content || 
      "<p>Sorry, we could not generate a SWOT analysis at this time. Please try again later.</p>";
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate SWOT Analysis");
  }
}
