import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { logger } from "../utils/logger.js";

/**
 * The Zod shape definition for the tool's arguments.
 * NOTE: We do NOT wrap this in z.object(). We let the SDK handle that.
 */
const parameters = {
  size: z.number().positive().describe("The length of the cube's sides"),
  filename: z.string().describe("The filename to save (e.g., 'cube.obj')"),
};

/**
 * The logic for generating the cube.
 * @param {{ size: number, filename: string }} args 
 */
async function handler({ size, filename }) {
  logger.info("Tool 'create_cube_obj' invoked", { size, filename });

  // 1. Logic
  const s = size / 2;
  const objData = `
v ${-s} ${-s} ${-s}
v ${ s} ${-s} ${-s}
v ${ s} ${ s} ${-s}
v ${-s} ${ s} ${-s}
v ${-s} ${-s} ${ s}
v ${ s} ${-s} ${ s}
v ${ s} ${ s} ${ s}
v ${-s} ${ s} ${ s}
f 1 2 3 4
f 5 6 7 8
f 1 5 8 4
f 2 6 7 3
f 4 3 7 8
f 1 2 6 5
`.trim();

  // 2. Security: Path Sanitization
  const safeFilename = path.basename(filename);
  const destination = path.resolve(process.cwd(), safeFilename);

  try {
    await fs.writeFile(destination, objData);
    logger.info("File written successfully", { path: destination });

    return {
      content: [
        { type: "text", text: `Success: Cube created at ${destination}` },
      ],
    };
  } catch (err) {
    logger.error("File write operation failed", err);
    return {
      isError: true,
      content: [
        { type: "text", text: `Error: Failed to save file. ${err.message}` }
      ]
    };
  }
}

// Export the tool definition
export const cubeTool = {
  name: "create_cube_obj",
  description: "Create a 3D cube and save it as an OBJ file",
  parameters, // The raw Zod shape
  handler
};