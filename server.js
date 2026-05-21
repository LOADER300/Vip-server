const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SERVER WORKING");
});

app.post("/predict", (req, res) => {

    const period = req.body.period || "000";

    const digits = period.split("").map(Number);

    const sum = digits.reduce((a,b)=>a+b,0);

    const number = ((sum * 7) + digits[2]) % 10;

    const color =
        number % 2 === 0 ? "RED" : "GREEN";

    const size =
        number >= 5 ? "BIG" : "SMALL";

    res.send({
        color: color,
        size: size,
        number: number,
        confidence: 90
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("SERVER WORKING");
});
