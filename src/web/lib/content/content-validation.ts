import type { ContentFieldConfig } from "./content-keys";

export interface ContentValidationResult {
  cleanedValues: Record<string, string>;
  fieldErrors: Record<string, string>;
  isValid: boolean;
}

const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;
const SCRIPT_PROTOCOL_PATTERN = /javascript:/i;

function hasUnsafeMarkup(value: string): boolean {
  return HTML_TAG_PATTERN.test(value) || SCRIPT_PROTOCOL_PATTERN.test(value);
}

export function validateContentFieldValues(
  fields: ContentFieldConfig[],
  rawValues: Record<string, string>,
): ContentValidationResult {
  const cleanedValues: Record<string, string> = {};
  const fieldErrors: Record<string, string> = {};

  for (const field of fields) {
    const rawValue = rawValues[field.name] ?? "";
    const normalizedValue = rawValue.replace(/\r\n/g, "\n").trim();

    if (!normalizedValue) {
      fieldErrors[field.name] = `${field.label} is verplicht.`;
      continue;
    }

    if (normalizedValue.length > field.maxLength) {
      fieldErrors[field.name] = `${field.label} mag maximaal ${field.maxLength} tekens bevatten.`;
      continue;
    }

    if (hasUnsafeMarkup(normalizedValue)) {
      fieldErrors[field.name] = `${field.label} mag geen HTML of scripts bevatten.`;
      continue;
    }

    cleanedValues[field.name] = normalizedValue;
  }

  return {
    cleanedValues,
    fieldErrors,
    isValid: Object.keys(fieldErrors).length === 0,
  };
}
