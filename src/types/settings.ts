// src/types/settings.ts

export interface ProfanitySettingItem {
  label: string;
  type: "text" | "multi-select" | "dropdown" | "checkbox" | "number";
  description: string;
  required?: boolean;
  default: string | number | boolean | string[];
  options?: string[];
}

export type ProfanitySettings = ProfanitySettingItem[];
