/**
 * @fileoverview A centralized logger utility ensuring all logs are written to stderr.
 * This prevents corruption of the stdout JSON-RPC stream used by MCP.
 */

/**
 * Log levels available in the application.
 * @readonly
 * @enum {string}
 */
const LogLevel = {
  INFO: "INFO",
  ERROR: "ERROR",
  WARN: "WARN",
};

/**
 * Formats and writes a log message to stderr.
 * * @param {string} level - The severity level of the log.
 * @param {string} message - The main log message.
 * @param {unknown} [meta] - Optional metadata or error objects to attach.
 * @returns {void}
 */
function writeLog(level, message, meta) {
  const timestamp = new Date().toISOString();
  const metaString = meta ? ` | ${JSON.stringify(meta, Object.getOwnPropertyNames(meta))}` : '';
  
  // CRITICAL: Always use console.error. Never console.log.
  console.error(`[${timestamp}] [${level}] ${message}${metaString}`);
}

export const logger = {
  /**
   * Log informational messages.
   * @param {string} message - The message to log.
   * @param {Object.<string, any>} [meta] - Additional context.
   */
  info: (message, meta) => writeLog(LogLevel.INFO, message, meta),

  /**
   * Log error messages.
   * @param {string} message - The error description.
   * @param {Error|unknown} [error] - The error object.
   */
  error: (message, error) => writeLog(LogLevel.ERROR, message, error),
  
  /**
   * Log warnings.
   * @param {string} message - The warning description.
   * @param {Object.<string, any>} [meta] - Additional context.
   */
  warn: (message, meta) => writeLog(LogLevel.WARN, message, meta),
};