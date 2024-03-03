export type RequestLog = {
    timestamps: Array<number>
}

export const requestThreshold = 10
export const slidingWindowInMilliSeconds = 60 * 1000
export const requestLogs = new Map<string, RequestLog>()   //Map to store logs per IP
