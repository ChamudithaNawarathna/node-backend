import fs from "fs/promises";
import path from "path";
import { put } from "@vercel/blob"; // npm install @vercel/blob
import { logger } from "./logger.js";

export async function writeToOutput(filename, content) {
  // CLOUD MODE: If running on Vercel
  if (process.env.VERCEL) {
    logger.info("Cloud mode detected: Saving to Vercel Blob.");
    const blob = await put(filename, content, { access: 'public' });
    return blob.url; // Returns the public URL
  } 

  // LOCAL MODE: Save to local folder
  logger.info("Local mode detected: Saving to disk.");
  const outputDir = path.resolve(process.cwd(), "out");
  await fs.mkdir(outputDir, { recursive: true });
  
  const safeName = path.basename(filename);
  const filePath = path.join(outputDir, safeName);
  
  await fs.writeFile(filePath, content);
  return filePath; // Returns the local path
}