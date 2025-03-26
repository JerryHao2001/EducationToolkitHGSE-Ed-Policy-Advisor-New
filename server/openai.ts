import OpenAI from "openai";
import { LogicFrameworkData, SwotAnalysisData } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-dummy-key-for-development",
});

export async function generateLogicFramework(
  data: LogicFrameworkData,
): Promise<string> {
  try {
    const prompt = `
      Using the following information, create a Logic Framework in a structured JSON format with rows: IMPACT, OBJECTIVES, RESULTS, ACTIVITIES 
      and columns: DESCRIPTION, INDICATORS, SOURCES, PRESUMPTIONS.

      Problem: ${data.problem}

      Goal: ${data.goal}

      Target Group: ${data.targetGroup}

      Key Actions:
        - Action 1: ${data.action1}
        - Action 2: ${data.action2}
        - Action 3: ${data.action3}

      Success Indicators: ${data.successIndicators}

      Challenges/Risks: ${data.challenges || "None specified"}

      Return only valid JSON with the following structure:
      {
        "IMPACT": {"DESCRIPTION": "...", "INDICATORS": "...", "SOURCES": "...", "PRESUMPTIONS": "..." },
        "OBJECTIVES": {"DESCRIPTION": "...", "INDICATORS": "...", "SOURCES": "...", "PRESUMPTIONS": "..." },
        "RESULTS": {"DESCRIPTION": "...", "INDICATORS": "...", "SOURCES": "...", "PRESUMPTIONS": "..." },
        "ACTIVITIES": {"DESCRIPTION": "...", "INDICATORS": "...", "SOURCES": "...", "PRESUMPTIONS": "..." }
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const jsonData = JSON.parse(response.choices[0].message.content || "{}");

    // Convert the JSON data to an HTML table
    const tableHtml = `
      <div class="logic-framework-container">
        <h2 class="text-2xl font-bold mb-6 text-center">${data.organization} Logic Framework</h2>
        <p class="mb-4"><strong>Contact:</strong> ${data.contact} (${data.email})</p>
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 p-3 text-left">Framework Level</th>
                <th class="border border-gray-300 p-3 text-left">Description</th>
                <th class="border border-gray-300 p-3 text-left">Indicators</th>
                <th class="border border-gray-300 p-3 text-left">Sources</th>
                <th class="border border-gray-300 p-3 text-left">Presumptions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-blue-50">
                <td class="border border-gray-300 p-3 font-medium">IMPACT</td>
                <td class="border border-gray-300 p-3">${jsonData.IMPACT.DESCRIPTION}</td>
                <td class="border border-gray-300 p-3">${jsonData.IMPACT.INDICATORS}</td>
                <td class="border border-gray-300 p-3">${jsonData.IMPACT.SOURCES}</td>
                <td class="border border-gray-300 p-3">${jsonData.IMPACT.PRESUMPTIONS}</td>
              </tr>
              <tr class="bg-green-50">
                <td class="border border-gray-300 p-3 font-medium">OBJECTIVES</td>
                <td class="border border-gray-300 p-3">${jsonData.OBJECTIVES.DESCRIPTION}</td>
                <td class="border border-gray-300 p-3">${jsonData.OBJECTIVES.INDICATORS}</td>
                <td class="border border-gray-300 p-3">${jsonData.OBJECTIVES.SOURCES}</td>
                <td class="border border-gray-300 p-3">${jsonData.OBJECTIVES.PRESUMPTIONS}</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-medium">RESULTS</td>
                <td class="border border-gray-300 p-3">${jsonData.RESULTS.DESCRIPTION}</td>
                <td class="border border-gray-300 p-3">${jsonData.RESULTS.INDICATORS}</td>
                <td class="border border-gray-300 p-3">${jsonData.RESULTS.SOURCES}</td>
                <td class="border border-gray-300 p-3">${jsonData.RESULTS.PRESUMPTIONS}</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-medium">ACTIVITIES</td>
                <td class="border border-gray-300 p-3">${jsonData.ACTIVITIES.DESCRIPTION}</td>
                <td class="border border-gray-300 p-3">${jsonData.ACTIVITIES.INDICATORS}</td>
                <td class="border border-gray-300 p-3">${jsonData.ACTIVITIES.SOURCES}</td>
                <td class="border border-gray-300 p-3">${jsonData.ACTIVITIES.PRESUMPTIONS}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-6">
          <h3 class="font-semibold mb-2">Problem Statement:</h3>
          <p class="mb-4">${data.problem}</p>
          
          <h3 class="font-semibold mb-2">Target Group:</h3>
          <p class="mb-4">${data.targetGroup}</p>
          
          <h3 class="font-semibold mb-2">Key Challenges:</h3>
          <p>${data.challenges || "None specified"}</p>
        </div>
      </div>
    `;

    return tableHtml;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return `<p class="text-red-500">Error: Unable to generate the Logic Framework. Please try again later.</p>
            <details class="text-sm text-gray-600 mt-2">
              <summary>Technical Details</summary>
              <p>${error instanceof Error ? error.message : String(error)}</p>
            </details>`;
  }
}

export async function generateSwotAnalysis(
  data: SwotAnalysisData,
): Promise<string> {
  try {
    const prompt = `
      Please create a detailed SWOT Analysis for an educational program or initiative using the information provided below.
      Format your response as HTML that can be directly displayed in a web application. Do not include any additional text or block headers."
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
      Arrange the sections in a 2x2 grid.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    const html =
      response.choices[0].message.content ||
      "<p>Sorry, we could not generate a SWOT analysis at this time. Please try again later.</p>";
    return html.slice(8, html.length - 4);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate SWOT Analysis");
  }
}
