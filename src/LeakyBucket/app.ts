import express from 'express'

import { rateLimitMiddleware } from './rateLimitMiddleware'

export const LeakyBucketApp = express()
const port = 4080

LeakyBucketApp.get('/unlimited', (req, res) => {
    res.send("Unlimited! Let's Go!")
})


LeakyBucketApp.get('/limited', rateLimitMiddleware, (req, res) => {
    res.send("Limited, don't overuse me!")
})

LeakyBucketApp.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/`)
})