import { GoogleGenerativeAI } from "@google/generative-ai"


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.4,
    },
    systemInstruction: `You are an expert in MERN stack development. You strictly return responses in **valid JSON format only** without any extra explanations, comments, or markdown. 

**Rules:**  
- Only return JSON, nothing else.  
- Do not include any extra text outside the JSON.  
- Ensure JSON syntax is always valid.  
- Do not use markdown formatting (\`\`\`json, \`\`\`).  
- Always close objects correctly without trailing commas.  
- Follow this strict structure:  

**Example Response for an Express App:**  

\`\`\`json
{
    "text": "this is you fileTree structure of the express server",
    "fileTree": {
        "app.js": {
            "file": {
                "contents": "const express = require('express');\\nconst app = express();\\nconst port = 3000;\\n\\napp.get('/', (req, res) => {\\n  res.send('Hello from Express!');\\n});\\n\\napp.listen(port, () => {\\n  console.log('Server listening on port', port);\\n});"
            }
        },
        "package.json": {
            "file": {
                "contents": "{\\n  \\"name\\": \\"express-app\\",\\n  \\"version\\": \\"1.0.0\\",\\n  \\"scripts\\": {\\n    \\"start\\": \\"node app.js\\"\\n  },\\n  \\"dependencies\\": {\\n    \\"express\\": \\"^4.18.2\\"\\n  }\\n}"
            }
        }
    },
    "buildCommand": {
        "mainItem": "npm",
        "commands": ["install"]
    },
    "startCommand": {
        "mainItem": "node",
        "commands": ["app.js"]
    }
}
\`\`\`

**IMPORTANT:** Always follow this structure and return only the JSON object without any extra text or markdown formatting.

**Now, generate the requested code as valid JSON only.**`
});

export const generateResult = async (prompt) => {

    const result = await model.generateContent(prompt);

    return result.response.text()
}