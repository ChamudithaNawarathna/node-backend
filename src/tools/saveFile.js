import { z } from "zod";
import { writeToOutput } from "../utils/fileSystem.js";
import { logger } from "../utils/logger.js";

const parameters = {
  filename: z.string().describe("The name of the file (e.g., 'model.obj')"),
  content: z.string().describe("The text content to write to the file"),
};

async function handler({ filename, content }) {
  logger.info("Tool 'save_file' invoked", { filename, size: content.length });

  try {
    const filePath = await writeToOutput(filename, content);
    
    return {
      content: [
        { type: "text", text: `File saved successfully at: ${filePath}` }
      ]
    };
  } catch (error) {
    logger.error("Failed to save file", error);
    return {
      isError: true,
      content: [
        { type: "text", text: `Error saving file: ${error.message}` }
      ]
    };
  }
}

export const saveFileTool = {
  name: "save_file",
  description: "Save text content to a file in the output directory.",
  parameters,
  handler
};