// sample payload

// {
//     "message_content": {
//         "event_name":"string",
//         "message":"What type of game FUCK fucking pussy asshole cunt is this",
//         "status":"success",
//         "username":"string"
//     },
//     "settings": [
//           {
//             "label": "customProfaneWords",
//             "type": "multi-select",
//             "description": "Select custom profane words to track.",
//             "required": true,
//             "default":
//               "fuck,shit,ass,bastard,bitch,dick,cock,pussy,damn,fucking,motherfucker,asshole,prick,dumbass,fucktard,shithead"
//           },
//           {
//             "label": "caseSensitivity",
//             "type": "checkbox",
//             "description":
//               "Enable case-sensitive profanity detection. If checked, 'Fuck' and 'fuck' will be treated differently.",
//             "default": true
//           },
//           {
//             "label": "maskingStyle",
//             "type": "dropdown",
//             "options": ["asterisks", "dashes", "partial"],
//             "description": "Choose how to mask detected profane words.",
//             "default": "partial",
//             "required": true
//           },
//           {
//             "label": "actionOnDetection",
//             "type": "dropdown",
//             "options": ["flag", "block", "replace"],
//             "description": "Decide how to handle detected messages.",
//             "default": "flag",
//             "required": true
//           },
//           {
//             "label": "notificationOnDetection",
//             "type": "dropdown",
//             "options": ["Yes", "No"],
//             "description": "Notify admins when a profane message is detected.",
//             "default": "No",
//             "required": true
//           },
//           {
//             "label": "WebhookUrl",
//             "type": "text",
//             "description":
//               "Specify the webhook url of the channel to notify admin",
//             "default": "https://my-webhook-url.com",
//             "required": true
//           },
//           {
//             "label": "maxProfanityCount",
//             "type": "number",
//             "description": "Set the maximum allowed profane words per message.",
//             "default": 3,
//             "required": true
//           }
//         ]
// }
