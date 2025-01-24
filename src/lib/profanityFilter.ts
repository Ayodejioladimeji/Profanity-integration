// src/lib/profanityFilter.ts

import { ProfanitySettings } from "@/types/settings";

const maskProfaneWord = (word: string, style: string): string => {
  const maskLength = Math.max(1, Math.floor(word.length / 2));
  switch (style) {
    case "asterisks":
      return word[0] + "*".repeat(maskLength) + word.slice(maskLength + 1);
    case "dashes":
      return word[0] + "-".repeat(maskLength) + word.slice(maskLength + 1);
    case "partial":
      return word[0] + "*".repeat(word.length - 2) + word[word.length - 1];
    default:
      return word;
  }
};

export const checkProfanity = (
  text: string,
  settings: ProfanitySettings
): { containsProfanity: boolean; modifiedText: string } => {
  let containsProfanity = false;
  let modifiedText = text;

  const profaneWords = settings.customProfaneWords || ["badword1", "badword2"];
  profaneWords.forEach((word) => {
    const regex = new RegExp(
      `\\b${word}\\b`,
      settings.caseSensitivity ? "g" : "gi"
    );
    if (regex.test(text)) {
      containsProfanity = true;
      modifiedText = modifiedText.replace(
        regex,
        maskProfaneWord(word, settings.maskingStyle)
      );
    }
  });

  return { containsProfanity, modifiedText };
};
