const router = require('express').Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate-schema', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

       
        const systemInstruction = `
        You are a Database Schema Generator. 
        You must output ONLY valid JSON. No markdown, no backticks, no explanations.
        
        The user will describe a feature (e.g., "A blog system").
        You must return an array of table objects exactly matching this structure:
        
        [
          {
            "label": "TableName",
            "columns": [
               { "name": "id", "type": "INT", "isPK": true, "isNullable": false },
               { "name": "some_field", "type": "VARCHAR", "isPK": false, "isNullable": true }
            ]
          }
        ]

        Supported types: INT, BIGINT, VARCHAR, TEXT, DATE, DATETIME, BOOLEAN, FLOAT.
        Always include an 'id' primary key for every table.
        Infer relationships by naming columns like 'user_id' (but do not create the edge object, just the columns).
        `;

        const result = await model.generateContent(systemInstruction + "\n\nUser Request: " + prompt);
        const response = await result.response;
        const text = response.text();

   
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const tables = JSON.parse(cleanedText);
        res.json(tables);

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Failed to generate schema" });
    }
});

module.exports = router;