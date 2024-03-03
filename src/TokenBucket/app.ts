import express from 'express'

import { TokenBucket } from './TokenBucket'

export const TokenBucketApp = express()
const port = 8080

TokenBucketApp.get('/unlimited', (req, res) => {
    res.send("Unlimited! Let's Go!")
})

    //Store token buckets for each IP
    const buckets = new Map<string, TokenBucket>()

    //Rate limiting middleware
    const rateLimitMiddleware = (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const ip = req.ip

        if(!ip) {
            res.status(500).send('No IP address found on request')
            return
        }

        const hasIpNoBucket = !buckets.has(ip)
        if(hasIpNoBucket) {
            buckets.set(ip, new TokenBucket(10 , 1))    // Example: 10 tokens, refill 1 token/sec
        }

        const bucket = buckets.get(ip)
        if(bucket && bucket.allowRequest()) {
            next()
        } else {
            res.status(429).send('Too many Requests')
        }
    }

TokenBucketApp.get('/limited', rateLimitMiddleware, (req, res) => {
    res.send("Limited, don't overuse me!")
})

TokenBucketApp.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/`)
})