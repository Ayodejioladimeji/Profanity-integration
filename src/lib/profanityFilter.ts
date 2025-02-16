import axios from "axios";

/* eslint-disable */

// Mask profane words based on the chosen style
const maskProfaneWord = (word: string, style: string): string => {
  const maskLength = Math.max(1, Math.floor(word.length / 2));
  switch (style) {
    case "asterisks":
      return word[0] + "*".repeat(maskLength) + word.slice(maskLength + 1);
    case "dashes":
      return word[0] + "-".repeat(maskLength) + word.slice(maskLength + 1);
    case "partial":
      return word[0] + "#".repeat(word.length - 2) + word[word.length - 1];
    default:
      return word;
  }
};

// Function to send webhook notification if set in settings

const sendWebhookNotification = async (webhookUrl: string, message: string) => {
  try {
    if (!webhookUrl || !/^https?:\/\//.test(webhookUrl)) {
      throw new Error("Invalid webhook URL");
    }

    const payload = {
      username: "Admin",
      event_name: "Profanity Notification",
      message,
      status: "success",
    };

    console.log("Sending payload:", payload, "to", webhookUrl);

    const res = await axios.post(webhookUrl, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Webhook response:", res?.data);
  } catch (error) {
    console.error(
      "Error sending webhook notification:",
      error?.response?.data || error.message
    );
  }
};

// Main profanity check function
export const checkProfanity = (
  text: string,
  settings: any
): { containsProfanity: boolean; modifiedText: string } => {
  let containsProfanity = false;
  let modifiedText = text;

  // Helper function to get setting values by label
  const getSettingValue = (label: string) =>
    settings.find((s: any) => s.label === label)?.default;

  // Extracting settings values correctly
  const profaneWords =
    typeof getSettingValue("customProfaneWords") === "string"
      ? getSettingValue("customProfaneWords")
          ?.split(",")
          .map((w) => w.trim()) || []
      : getSettingValue("customProfaneWords") || [];

  const caseSensitivity = getSettingValue("caseSensitivity") as boolean;
  const maskingStyle = getSettingValue("maskingStyle") as string;
  const actionOnDetection = getSettingValue("actionOnDetection") as string;
  const notificationOnDetection = getSettingValue(
    "notificationOnDetection"
  ) as string;
  const webhookUrl = getSettingValue("WebhookUrl") as string;
  const maxProfanityCount = getSettingValue("maxProfanityCount") as number;

  let profanityCount = 0;

  // Loop through each profane word and check the text
  profaneWords.forEach((word: any) => {
    const regex = new RegExp(`\\b${word}\\b`, caseSensitivity ? "g" : "gi");
    if (regex.test(text)) {
      containsProfanity = true;
      modifiedText = modifiedText.replace(
        regex,
        maskProfaneWord(word, maskingStyle)
      );
      profanityCount += 1;
    }
  });

  // Check max profanity count and trigger action if needed
  if (profanityCount >= maxProfanityCount) {
    if (actionOnDetection === "block") {
      modifiedText = "Message blocked due to too many profane words.";
    } else if (actionOnDetection === "replace") {
      modifiedText = modifiedText.replace(
        new RegExp("\\w+", "g"),
        "[REDACTED]"
      );
    }
  }

  // If notification is required, send a webhook
  if (containsProfanity && notificationOnDetection === "Yes") {
    sendWebhookNotification(webhookUrl, "Profanity detected in a message.");
  }

  return { containsProfanity, modifiedText };
};
