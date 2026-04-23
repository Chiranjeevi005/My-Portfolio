/**
 * CONTENT CONTROL ENGINE (Data Integrity Layer)
 * 
 * Ensures strict schema-driven content validation and transformation.
 * Gatekeeper forProjects, Experience, and Skills content domains.
 */

export * from './schemas';
export { ContentEngine } from './core';
export type { ValidationResult } from './validator';
