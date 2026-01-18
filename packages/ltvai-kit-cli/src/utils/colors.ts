import pc from 'picocolors';

/**
 * LINE Brand Colors for terminal (ANSI 256)
 * Primary Green: #06C755 → ANSI 40 (#00D700)
 */
export const colors = {
  // Primary brand color (LINE Green)
  primary: (text: string) => `\x1b[38;5;40m${text}\x1b[0m`,

  // Dark variant
  primaryDark: (text: string) => `\x1b[38;5;34m${text}\x1b[0m`,

  // Success (same as primary)
  success: pc.green,

  // Error
  error: pc.red,

  // Warning
  warning: pc.yellow,

  // Info/muted
  muted: pc.dim,

  // Bold
  bold: pc.bold,

  // Underline
  underline: pc.underline,

  // Cyan for info
  info: pc.cyan,
};

/**
 * Styled log functions
 */
export const log = {
  success: (msg: string) => console.log(colors.success(`✓ ${msg}`)),
  error: (msg: string) => console.log(colors.error(`✗ ${msg}`)),
  warning: (msg: string) => console.log(colors.warning(`⚠ ${msg}`)),
  info: (msg: string) => console.log(colors.info(`ℹ ${msg}`)),
  muted: (msg: string) => console.log(colors.muted(msg)),
  step: (msg: string) => console.log(colors.primary(`→ ${msg}`)),
};
