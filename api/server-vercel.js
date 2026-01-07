import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express"; // npm install express
import { generateCubeTool } from "./core/generateCube.js";
import { saveFileTool } from "./core/saveFile.js";

const app = express();
const server = new McpServer({ name: "cube-cloud", version: "1.0.0" });

server.tool(generateCubeTool.name, generateCubeTool.description, generateCubeTool.parameters, generateCubeTool.handler);
server.tool(saveFileTool.name, saveFileTool.description, saveFileTool.parameters, saveFileTool.handler);

/**
 * SINGLE MCP endpoint
 * Handles streaming + messages
 */
app.all("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport(req, res);
  await server.connect(transport);
});

export default app;