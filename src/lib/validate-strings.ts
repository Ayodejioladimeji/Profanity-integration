type ProfanitySettings = {
  customProfaneWords: string;
  maskingStyle: string;
  caseSensitivity: boolean;
  actionOnDetection: string;
  notificationOnDetection: string;
  maxProfanityCount: number;
  webhookUrl: string;
};

export const validateSettings = (settings: ProfanitySettings): string[] => {
  const errors: string[] = [];

  if (
    !Array.isArray(settings.customProfaneWords) ||
    settings.customProfaneWords.some((w) => typeof w !== "string")
  ) {
    errors.push("customProfaneWords must be a non-empty array of strings.");
  }

  if (
    typeof settings.maskingStyle !== "string" ||
    settings.maskingStyle.trim() === ""
  ) {
    errors.push("maskingStyle must be a non-empty string.");
  }

  if (typeof settings.caseSensitivity !== "boolean") {
    errors.push("caseSensitivity must be a boolean.");
  }

  if (
    typeof settings.actionOnDetection !== "string" ||
    settings.actionOnDetection.trim() === ""
  ) {
    errors.push("actionOnDetection must be a non-empty string.");
  }

  if (
    typeof settings.notificationOnDetection !== "string" ||
    settings.notificationOnDetection.trim() === ""
  ) {
    errors.push("notificationOnDetection must be a non-empty string.");
  }

  if (
    typeof settings.maxProfanityCount !== "number" ||
    settings.maxProfanityCount < 1
  ) {
    errors.push("maxProfanityCount must be a positive number.");
  }

  if (
    typeof settings.webhookUrl !== "string" ||
    !/^https?:\/\/\S+$/.test(settings.webhookUrl)
  ) {
    errors.push("webhookUrl must be a valid URL.");
  }

  return errors;
};
