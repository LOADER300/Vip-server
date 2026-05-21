const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {

    res.send("GPT AI SERVER RUNNING");
});

app.post("/predict", async (req, res) => {

    try {

        const period = req.body.period;

        const prompt = `
Reply ONLY valid JSON.

{
 "color":"GREEN",
 "size":"BIG",
 "number":7,
 "confidence":92
}

Analyze:
${period}
`;

        const chat =
            await client.chat.completions.create({

            model: "gpt-4.1-mini",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        let result =
            chat.choices[0].message.content;

        result = result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {

            res.send(JSON.parse(result));

        } catch {

            res.send({

                color: "GREEN",
                size: "BIG",
                number: 7,
                confidence: 90
            });
        }

    } catch (err) {

        res.status(500).send({

            error: err.message
        });
    }
});

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("GPT AI SERVER RUNNING");
});
