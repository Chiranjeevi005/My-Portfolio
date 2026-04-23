import { z } from 'zod';

/**
 * ID Schema (Slug-safe, kebab-case)
 */
export const IdSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'ID must be kebab-case (slug-safe)',
  });

/**
 * Project Schema
 */
export const ProjectSchema = z.object({
  id: IdSchema,
  title: z.string().min(1).max(80, 'Title must be max 80 characters'),
  description: z.string().min(1).max(300, 'Description must be max 300 characters'),
  videoUrl: z.string().url('Invalid CDN URL format').optional().or(z.literal('')),
  tags: z.array(z.string().min(1)).min(1, 'At least one tag required').max(6, 'Max 6 tags allowed'),
  status: z.enum(['live', 'draft']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();

/**
 * Experience Schema
 */
export const ExperienceSchema = z.object({
  id: IdSchema,
  company: z.string().min(1, 'Company is required').max(100, 'Company must be max 100 characters'),
  role: z.string().min(1, 'Role is required').max(100, 'Role must be max 100 characters'),
  duration: z.string().min(1, 'Duration is required').max(50, 'Duration must be max 50 characters'),
  description: z.string().min(1).max(400, 'Description must be max 400 characters'),
  type: z.enum(['internship', 'fulltime', 'project']),
  order: z.number().int().nonnegative(),
}).strict();

/**
 * Skills Schema
 */
export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(50, 'Skill name max 50 characters'),
  description: z.string().min(1, 'Skill description is required').max(200, 'Skill description max 200 characters'),
  level: z.number().min(1).max(5, 'Level must be between 1 and 5'),
}).strict();

export const SkillCategorySchema = z.object({
  category: z.string().min(1, 'Category name is required').max(50, 'Category name max 50 characters'),
  skills: z.array(SkillSchema).min(1, 'At least one skill required').max(20, 'Max 20 skills allowed'),
}).strict();

export type Project = z.infer<typeof ProjectSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type Skill = z.infer<typeof SkillSchema>;
