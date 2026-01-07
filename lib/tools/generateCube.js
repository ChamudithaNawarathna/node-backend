import { z } from "zod";
import { logger } from "../utils/logger.js";

const parameters = {
  size: z.number().positive().describe("The size of the cube"),
};

async function handler({ size }) {
  logger.info("Tool 'generate_cube' invoked", { size });

  const s = size / 2;
  const objData = `
# Cube Size: ${size}
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

  // Return the data directly to the LLM Context
  return {
    content: [
      { 
        type: "text", 
        text: objData 
      }
    ]
  };
}

export const generateCubeTool = {
  name: "generate_cube",
  description: "Generate the geometry data for a 3D cube. Returns raw OBJ format text.",
  parameters,
  handler
};