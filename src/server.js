import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { logger } from "./utils/logger.js";
import { generateCubeTool } from "./tools/generateCube.js";
import { saveFileTool } from "./tools/saveFile.js";

async function main() {
  const server = new McpServer({
    name: "multi-step-server",
    version: "1.0.0",
  });

  // Register Tool 1: Generator
  server.tool(
    generateCubeTool.name,
    generateCubeTool.description,
    generateCubeTool.parameters,
    generateCubeTool.handler
  );

  // Register Tool 2: Saver
  server.tool(
    saveFileTool.name,
    saveFileTool.description,
    saveFileTool.parameters,
    saveFileTool.handler
  );

  const transport = new StdioServerTransport();

  process.on("SIGINT", async () => {
    logger.warn("SIGINT received. Shutting down.");
    await server.close();
    process.exit(0);
  });

  try {
    await server.connect(transport);
    logger.info("Multi-Step MCP Server running");
  } catch (err) {
    logger.error("Startup failed", err);
    process.exit(1);
  }
}

main();