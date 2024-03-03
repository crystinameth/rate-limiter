# Rate Limiter
A flexible and extensible rate limiter implementation in TypeScript with support for multiple strategies such as Fixed Window Counter, Token Bucket, Sliding Window Log and Sliding Window Counter.

## Get Started
- **Clone the Repository.**
- **Install Dependencies:** `npm install`
- **To Start Different Servers:**
   - **Fixed Window Counter:**
     `npm run start-fixed-window-counter`

   - **Token Bucket:**
     `npm run start-token-bucket`

   - **Sliding Window Log:**
     `npm run start-sliding-window-log`

   - **Sliding Window Counter:**
     `npm run start-sliding-window-counter`
- **To run tests:** `npm run test`

## What is a Rate Limiter ?
A Rate Limiter is a crucial tool that monitors the frequency of requests a client IP can send to an API endpoint within a specified timeframe. If the number of requests surpasses a predefined limit, the rate limiter takes action, blocking the client IP from making additional requests for a designated period.

## Key Concepts
- *Limit:* The maximum number of requests permitted for a client IP within a specified unit of time.
- *Window:* The unit of time used by the rate limiter to track the number of requests sent by a client IP. This timeframe can range from seconds to days.
- *Identifier:* A unique attribute associated with each request, used by the rate limiter to identify the client IP.

# Rate Limiting Strategies Implemented
## **Fixed Window Counter Algorithm** 
This method tracks the number of requests within a fixed time frame, like a minute or an hour. Once the limit is reached, no more requests are allowed until the next time window.
## **Sliding Window Log Algorithm**
Records the timestamp of each request in a log; the window slides with each request. It allows for more flexibility, as it can dynamically adjust the rate limit window based on the server's current load.
## **Token Bucket Algorithm**
A bucket is filled with tokens at a steady rate; each request costs a token. Every user begins with a bucket full of tokens, and making a request uses up one token. Over time, tokens get added back to the bucket until it's full again.
## **Sliding Window Counter Algorithm**
Similar to a fixed window but smoother. The window slides with each request, combining the simplicity of fixed windows with some advantages of sliding log.
It's less memory intensive as we only keep track of a counter and the last request timestamp.

## Conclusion
While rate limiting helps control server load , it can't fully stop DDoS attacks, where many sources flood the server with requests. Load balancing and firewall protections may help in these situations.

Rate Limiting is crucial for managing server load, ensuring availability and preventing abuse.
