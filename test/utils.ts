/**
 * Utility functions for ESLint testing
 */

export type Something = {
  value: string;
};

export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

export function isObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
