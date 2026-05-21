const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

function aiPredict(period){

    const last3 =
        period.slice(-3);

    const digits =
        last3.split("").map(Number);

    const sum =
        digits.reduce((a,b)=>a+b,0);

    const weighted =
        (digits[0]*2) +
        (digits[1]*3) +
        (digits[2]*5);

    const ai =
        (sum + weighted + 7) % 10;

    let color = "VIOLET";

    if([1,3,7,9].includes(ai)){
        color = "GREEN";
    }

    if([2,4,6,8].includes(ai)){
        color = "RED";
    }

    return {
        number: ai,
        color: color,
        confidence: 90
    };
}

app.post("/predict",(req,res)=>{

    const period =
        req.body.period;

    res.json(
        aiPredict(period)
    );
});

app.get("/",(req,res)=>{

    res.send(
        "AI SERVER RUNNING"
    );
});

app.listen(3000);