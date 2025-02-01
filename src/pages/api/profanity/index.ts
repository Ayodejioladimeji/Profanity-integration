import { NextApiRequest, NextApiResponse } from "next";
import { checkProfanity } from "@/lib/profanityFilter";
import { ProfanitySettings } from "@/types/settings";
import Cors from "cors";
import { validateSettings } from "./../../../lib/validate-strings";

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

// API Handler function for GET requests
const getProfanity = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await runMiddleware(req, res, cors);

    const {
      message_content,
      settings,
    }: { message_content: any; settings: ProfanitySettings } = req.body;

    if (
      !message_content?.event_name ||
      !message_content?.message ||
      !settings
    ) {
      return res
        .status(400)
        .json({ error: "Message content and settings are required" });
    }

    // Process profanity check
    const { modifiedText } = checkProfanity(message_content?.message, settings);

    return res.status(200).json({
      event_name: message_content?.event_name,
      status: message_content?.status,
      message: modifiedText,
      username: message_content?.username,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Main API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await getProfanity(req, res);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}
