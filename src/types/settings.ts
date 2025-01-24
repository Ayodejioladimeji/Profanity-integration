// src/types/settings.ts

export interface ProfanitySettings {
  customProfaneWords: string[];
  sensitivity: number; // Range 1-5
  maskingStyle: "asterisks" | "dashes" | "partial";
  actionOnDetection: "flag" | "block" | "replace";
  caseSensitivity: boolean;
  logProfaneMessages: boolean;
  notificationOnDetection: boolean;
  languageFilter: string[];
  whitelistedUsers: string[];
  maxProfanityCount: number;
}
