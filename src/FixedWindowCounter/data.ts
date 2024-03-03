type WindowCounter = {
    count: number
    startTime: number
}

export const rateLimitWindowInMilliSeconds = 60 * 1000   // 60 sec
export const requestLimitPerWindow = 10
export const counters = new Map<string, WindowCounter>()