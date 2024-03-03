import type express from 'express'

import { requestLogs, requestThreshold, slidingWindowInSeconds } from './data'

const MILLI_SECOND = 1000

export const rateLimitMiddleware = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const ip = req.ip
    if (!ip) {
        res.status(500).send('No IP address found on request')
        return
    }

    if(!requestLogs.has(ip)) {
        requestLogs.set(ip, { timestamps: [Date.now()] })
        next()
        return
    }

    const currentTime = Date.now()
    const log = requestLogs.get(ip)

    if(log) {
        log.timestamps = log.timestamps.filter((timestamp) => {
            const difference = currentTime - timestamp
            const isWithinWindow = difference <= slidingWindowInSeconds * MILLI_SECOND

            return isWithinWindow
        })

        if(log.timestamps.length < requestThreshold) {
            //Allow request
            log.timestamps.push(currentTime)
            next()
        } else {
            //Rate limit exceeded
            res.status(429).send('Too Many Requests')
        }
    }
}