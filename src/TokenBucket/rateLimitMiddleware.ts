import type express from 'express'

import { TokenBucket } from './TokenBucket'

//Store token buckets for each IP
const buckets = new Map<string, TokenBucket>()

export const capacity = 10
export const refillRate = 1

//Rate limiting middleware
export const rateLimitMiddleware = (
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
        buckets.set(ip, new TokenBucket(capacity , refillRate))    // Example: 10 tokens, refill 1 token/sec
    }

    const bucket = buckets.get(ip)
    if(bucket && bucket.allowRequest()) {
        next()
    } else {
        res.status(429).send('Too many Requests')
    }
}