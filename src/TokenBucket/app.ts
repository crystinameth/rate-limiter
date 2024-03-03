import express from 'express'

import { rateLimitMiddleware } from './rateLimitMiddleware'

export const TokenBucketApp = express()
const port = 8080

TokenBucketApp.get('/unlimited', (req, res) => {
    res.send("Unlimited! Let's Go!")
})


TokenBucketApp.get('/limited', rateLimitMiddleware, (req, res) => {
    res.send("Limited, don't overuse me!")
})

TokenBucketApp.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/`)
})