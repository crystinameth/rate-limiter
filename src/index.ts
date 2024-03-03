import express from 'express'

const app = express()
const port = 8080

app.get('/unlimited', (req, res) => {
    res.send("Unlimited! Let's Go!")
})

app.get('/limited', (req, res) => {
    res.send("Limited, don't overuse me!")
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/`)
})