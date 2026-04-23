/**
 * Normalization & Sanitization Layer
 */

const stripHtml = (str: string) => str.replace(/<[^>]*>?/gm, '');

const normalizeString = (str: string) => {
  return stripHtml(str).trim().replace(/\s+/g, ' ');
};

/**
 * Recursively normalizes an object
 * - Trims strings
 * - Strips HTML
 * - Removes extra whitespace
 * - Deduplicates string arrays
 */
export const normalizeData = <T>(data: T): T => {
  if (typeof data === 'string') {
    return normalizeString(data) as unknown as T;
  }

  if (Array.isArray(data)) {
    const normalizedArray = data.map((item) => normalizeData(item));
    // Deduplicate if it's an array of strings
    if (normalizedArray.every((i) => typeof i === 'string')) {
      return [...new Set(normalizedArray)] as unknown as T;
    }
    return normalizedArray as unknown as T;
  }

  if (data !== null && typeof data === 'object') {
    const normalizedObj: any = {};
    for (const [key, value] of Object.entries(data)) {
      normalizedObj[key] = normalizeData(value);
    }
    return normalizedObj as T;
  }

  return data;
};

/**
 * Prepares an object for update by setting updatedAt
 */
export const touchUpdateTimestamp = <T extends { updatedAt?: string }>(data: T): T & { updatedAt: string } => {
  return {
    ...data,
    updatedAt: new Date().toISOString(),
  };
};
