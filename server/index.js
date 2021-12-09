const express = require('express');
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hey there fellow Otaku'); //Trial route
})

app.post('/register', (req, res) => {
    console.log(req.body)
    res.status(200).send(req.body);
})

app.listen(5000,
    () => {
        console.log('Litening on port 5000');
    }
)