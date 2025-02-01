// src/types/settings.ts

export interface ProfanitySettings {
  customProfaneWords: string;
  maskingStyle: "asterisks" | "dashes" | "partial";
  actionOnDetection: "flag" | "block" | "replace";
  caseSensitivity: boolean;
  logProfaneMessages: boolean;
  notificationOnDetection: string;
  languageFilter: string[];
  whitelistedUsers: string[];
  maxProfanityCount: number;
  webhookUrl: string;
}
