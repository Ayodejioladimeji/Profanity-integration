import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Configure CORS
const cors = Cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://telex.im",
    "https://staging.telex.im",
    "https://telex-auth.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

/* eslint-disable */

// Middleware function to run CORS
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await runMiddleware(req, res, cors);

    return res.status(200).json({
      data: {
        date: {
          created_at: "2025-01-21",
          updated_at: "2025-01-21",
        },
        descriptions: {
          app_description: "Detects and tracks profane words in all messages.",
          app_logo:
            "https://res.cloudinary.com/devsource/image/upload/v1737510989/pngtree-no-cursing-sign-png-image_6610915_meqkww.png",
          app_name: "Profanity Checker",
          app_url: "https://profanity-checker-omega.vercel.app/api/integration",
          background_color: "#ffffff",
        },
        is_active: false,
        integration_type: "modifier",
        key_features: [
          "Monitor and filter out offensive language from messages in real-time.",
          "Notify admins when offensive language is detected.",
          "Allow customization of the profanity list and sensitivity settings.",
          "Integrate with chat platforms like Slack and Teams for seamless filtering.",
        ],
        permissions: {
          events: [
            "Monitor and filter out offensive language from messages in real-time.",
            "Notify admins when offensive language is detected.",
            "Allow customization of the profanity list and sensitivity settings.",
            "Integrate with chat platforms like Slack and Teams for seamless filtering.",
          ],
        },
        author: "Layobright Company",
        website: "https://profanity-checkers.vercel.app",
        settings: [
          {
            label: "customProfaneWords",
            type: "multi-select",
            description: "Select custom profane words to track.",
            required: true,
            default:
              "fuck,shit,ass,bastard,bitch,dick,cock,pussy,damn,fucking,motherfucker,asshole,prick,dumbass,fucktard,shithead",
          },
          {
            label: "caseSensitivity",
            type: "checkbox",
            description:
              "Enable case-sensitive profanity detection. If checked, 'Fuck' and 'fuck' will be treated differently.",
            default: false,
          },
          {
            label: "maskingStyle",
            type: "dropdown",
            options: ["asterisks", "dashes", "partial"],
            description: "Choose how to mask detected profane words.",
            default: "partial",
            required: true,
          },
          {
            label: "actionOnDetection",
            type: "dropdown",
            options: ["flag", "block", "replace"],
            description: "Decide how to handle detected messages.",
            default: "flag",
            required: true,
          },
          {
            label: "notificationOnDetection",
            type: "dropdown",
            options: ["Yes", "No"],
            description: "Notify admins when a profane message is detected.",
            default: "No",
            required: true,
          },
          {
            label: "WebhookUrl",
            type: "text",
            description:
              "Specify the webhook url of the channel to notify admin",
            default: "https://my-webhook-url.com",
            required: true,
          },
          {
            label: "maxProfanityCount",
            type: "number",
            description: "Set the maximum allowed profane words per message.",
            default: 3,
            required: true,
          },
        ],
        target_url: "https://profanity-checker-omega.vercel.app/api/profanity",
      },
    });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
