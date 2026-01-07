import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { generateCubeTool } from "../lib/tools/generateCube.js";
import { saveFileTool } from "../lib/tools/saveFile.js";

const server = new McpServer({ name: "cube-local", version: "1.0.0" });

// Register tools from core
server.tool(generateCubeTool.name, generateCubeTool.description, generateCubeTool.parameters, generateCubeTool.handler);
server.tool(saveFileTool.name, saveFileTool.description, saveFileTool.parameters, saveFileTool.handler);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();