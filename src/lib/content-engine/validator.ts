import { z } from 'zod';

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; field: string; reason: string };

/**
 * Wraps Zod validation to provide structured error responses
 */
export const validateWithSchema = <T>(schema: z.ZodSchema<T>, data: unknown): ValidationResult<T> => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const firstError = result.error.issues[0];
    return {
      success: false,
      error: 'Validation failed',
      field: firstError.path.join('.') || 'unknown',
      reason: firstError.message,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
