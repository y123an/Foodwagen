"use client";

import { useState } from "react";
import { z } from "zod";

/**
 * Custom hook for form validation using Zod schemas
 * @param schema - Zod schema to validate against
 * @returns Form validation utilities
 */
export function useFormValidation<T extends z.ZodType>(schema: T) {
  type FormData = z.infer<T>;
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: unknown): { success: boolean; data?: FormData; errors?: Record<string, string> } => {
    try {
      const validData = schema.parse(data);
      setErrors({});
      return { success: true, data: validData };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          const path = err.path.join(".");
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
        return { success: false, errors: fieldErrors };
      }
      return { success: false, errors: { general: "Validation failed" } };
    }
  };

  const clearErrors = () => setErrors({});
  
  const getError = (field: string) => errors[field];

  return {
    validate,
    errors,
    clearErrors,
    getError,
    hasErrors: Object.keys(errors).length > 0,
  };
}
