const router = require('express').Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetchUser = require('../middleware/fetchUser'); 

// Ensure API Key is loaded
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate', fetchUser, async (req, res) => {
    const { userPrompt } = req.body;

    if (!userPrompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const model = genAI.getGenerativeModel({ 
            model:"gemini-2.5-flash", 
            generationConfig: { responseMimeType: "application/json" }
        });

        const systemPrompt = `
        You are a Database Architect. 
        The user will describe an application. You must design the database schema.
        
        User Description: "${userPrompt}"

        You MUST return a single JSON object with exactly two arrays: "nodes" and "edges".
        
        1. "nodes" format (React Flow):
        {
          "id": "table_1",
          "type": "tableNode",
          "position": { "x": 0, "y": 0 },
          "data": {
            "label": "TableName",
            "columns": [
               { "name": "id", "type": "INT", "isPK": true, "isNullable": false },
               { "name": "column_name", "type": "VARCHAR", "isPK": false, "isNullable": true }
            ]
          }
        }
        
        2. "edges" format (Relationships):
        {
          "id": "e1-2",
          "source": "table_1",
          "target": "table_2",
          "sourceHandle": "column_name-left", 
          "targetHandle": "column_name-right",
          "type": "smoothstep", 
          "animated": true,
          "data": { "label": "1:N" }
        }

        IMPORTANT RULES:
        - "sourceHandle" MUST match a column name in the source table + "-left" (e.g., "user_id-left").
        - "targetHandle" MUST match a column name in the target table + "-right" (e.g., "id-right").
        - Spread the nodes out visually (increment x by 350, y by 0 for each new table) so they don't overlap.
        - Always include Primary Keys (id).
        - Infer relationships intelligently.
        - RESPONSE MUST BE RAW JSON.
        `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        let text = response.text();
        
        // --- CRITICAL FIX: CLEAN THE OUTPUT ---
        // Sometimes Gemini adds markdown backticks (```json ... ```). We must remove them.
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Log the raw text to debug if it fails again
        console.log("Gemini Raw Output:", text);

        const jsonResult = JSON.parse(text);
        
        res.json(jsonResult);

    } catch (error) {
        console.error("Gemini AI Error Details:", error);
        res.status(500).json({ error: "Failed to generate schema. Check server console for details." });
    }
});

module.exports = router;