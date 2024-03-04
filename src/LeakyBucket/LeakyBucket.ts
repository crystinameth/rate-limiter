export class LeakyBucket {
  private capacity: number;
  private tokens: number;
  private lastLeakTime: number;

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.lastLeakTime = Date.now();
    setInterval(() => this.leak(), 1000 / refillRate);
  }

  addRequest(): boolean {
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    } else {
      return false;
    }
  }

  private leak(): void {
    const currentTime = Date.now();
    const elapsedMilliseconds = currentTime - this.lastLeakTime;
    const leaks = Math.floor(elapsedMilliseconds / 1000);
    this.tokens = Math.min(this.capacity, this.tokens + leaks);
    this.lastLeakTime = currentTime;
  }
}

