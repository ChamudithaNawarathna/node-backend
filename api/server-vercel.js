// server.js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { generateCubeTool } from "./core/generateCube.js";
import { saveFileTool } from "./core/saveFile.js";

const server = new McpServer({ name: "cube-cloud", version: "1.0.0" });
server.tool(generateCubeTool.name, generateCubeTool.description, generateCubeTool.parameters, generateCubeTool.handler);
server.tool(saveFileTool.name, saveFileTool.description, saveFileTool.parameters, saveFileTool.handler);

export default async function handler(req, res) {
  const transport = new StreamableHTTPServerTransport(req, res);
  await server.connect(transport);
}
