import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SERVER_PATH = path.resolve(__dirname, "server-local.js");

async function main() {
  const transport = new StdioClientTransport({
    command: "node",
    args: [SERVER_PATH],
  });

  const client = new Client(
    { name: "agent-client", version: "1.0.0" },
    { capabilities: {} }
  );

  await client.connect(transport);
  console.log("🤖 Client Connected. Starting Workflow...\n");

  try {
    // --- STEP 1: GENERATION ---
    console.log("📝 Step 1: Generating Cube Data...");
    
    const genResult = await client.callTool({
      name: "generate_cube",
      arguments: { size: 5 }
    });

    const objContent = genResult.content[0].text;
    console.log(`   > Generated ${objContent.length} characters of OBJ data.`);
    // In a real LLM, the model now "sees" this data in its context window.

    
    // --- STEP 2: PERSISTENCE ---
    console.log("\n💾 Step 2: Saving to Disk...");

    const saveResult = await client.callTool({
      name: "save_file",
      arguments: {
        filename: "final_cube.obj",
        content: objContent // Passing the data from Step 1
      }
    });

    console.log(`   > ${saveResult.content[0].text}`);

  } catch (error) {
    console.error("❌ Workflow failed:", error);
  } finally {
    await client.close();
  }
}

main();