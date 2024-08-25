const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

function processInput(data) {
    const numbers = data
        .filter(x => !isNaN(x)) 
        .map(x => Number(x));   
    
    const alphabets = data.filter(x => typeof x === 'string' && /^[a-zA-Z]+$/.test(x));    
    const lowercaseAlphabets = alphabets.filter(x => /^[a-z]+$/.test(x));
    const highestLowercase = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    return {
        numbers: numbers.length > 0 ? numbers : [], 
        alphabets: alphabets.length > 0 ? alphabets : [], 
        highestLowercase: highestLowercase.length > 0 ? highestLowercase : [] 
    };
}


app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];

    const userId = "Santhosh_Kumar_S"+"_"+"17102003";
    const email = "santhoshkumar.s2021a@vitstudent.ac.in";
    const rollno = "21BCI0088";

    const processedData = processInput(data);

    const response = {
        is_success: true,
        user_id: userId,
        email_id: email,
        college_roll_number: rollno,
        numbers: processedData.numbers,
        alphabets: processedData.alphabets,
        highest_lowercase: processedData.highestLowercase
    };

    res.status(200).json(response);
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
