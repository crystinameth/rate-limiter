import express  from "express";

import { rateLimitMiddleware } from "./FixedWindowCounter";

export const FixedWindowCounterApp = express()
const port = 7080

FixedWindowCounterApp.get('/unlimited', (req, res) => {
    res.send("Unlimited! Let's Go!")
})

FixedWindowCounterApp.get('/limited',rateLimitMiddleware, (req, res) => {
    res.send("Limited, don't overuse me!")
})

FixedWindowCounterApp.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`)
})