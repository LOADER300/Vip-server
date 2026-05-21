const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client =
    new OpenAI({

        apiKey:
            process.env.OPENAI_API_KEY
    });

app.post("/predict", async (req,res)=>{

    try{

        const period =
            req.body.period;

        const prompt = `
        Analyze this 3 digit trend:

        ${period}

        Return ONLY JSON:

        {
          "color":"GREEN",
          "size":"BIG",
          "number":7,
          "confidence":92
        }
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

        const result =
            chat.choices[0].message.content;

        res.send(JSON.parse(result));

    }catch(err){

        res.status(500).send({

            error: err.message
        });
    }
});

app.listen(3000,()=>{

    console.log(
        "GPT AI SERVER RUNNING"
    );
});
