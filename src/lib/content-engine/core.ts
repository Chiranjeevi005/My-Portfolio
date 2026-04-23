import {
  ProjectSchema,
  ExperienceSchema,
  SkillCategorySchema,
  Project,
  Experience,
  SkillCategory,
} from './schemas';
import { normalizeData, touchUpdateTimestamp } from './normalizer';
import { validateWithSchema, ValidationResult } from './validator';

export class ContentEngine {
  /**
   * Validates and prepares a Project for persistence
   */
  static processProject(input: unknown, existing?: Project): ValidationResult<Project> {
    // 1. Normalize
    const normalized = normalizeData(input) as any;

    // 2. Handle Immutability
    if (existing) {
      // Re-enforce immutable fields from existing record
      normalized.id = existing.id;
      normalized.createdAt = existing.createdAt;
    } else {
      // New record: ensure createdAt exists
      if (!normalized.createdAt) {
        normalized.createdAt = new Date().toISOString();
      }
    }

    // 3. Auto-update timestamp
    const withTimestamp = touchUpdateTimestamp(normalized);

    // 4. Validate
    return validateWithSchema(ProjectSchema, withTimestamp);
  }

  /**
   * Validates and prepares an Experience for persistence
   */
  static processExperience(input: unknown, existing?: Experience): ValidationResult<Experience> {
    const normalized = normalizeData(input) as any;

    if (existing) {
      normalized.id = existing.id;
    }

    const result = validateWithSchema(ExperienceSchema, normalized);
    return result;
  }

  /**
   * Sorts Experience items deterministically
   */
  static sortExperience(items: Experience[]): Experience[] {
    return [...items].sort((a, b) => a.order - b.order);
  }

  /**
   * Validates and prepares Skills for persistence
   */
  static processSkills(input: unknown): ValidationResult<SkillCategory> {
    const normalized = normalizeData(input);
    return validateWithSchema(SkillCategorySchema, normalized);
  }

  /**
   * Checks if an ID is valid and slug-safe (utility)
   */
  static isValidId(id: string): boolean {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id);
  }
}
