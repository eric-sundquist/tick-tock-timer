export class Timer {
  #startTime
  
  #currentTime
  
  #expireTime
  
  #isRunning = false
  
  #isPaused = false

  /**
   * 
   * @param {Number} expireTime - Seconds until timer should expire/ring. 
   */
  constructor(setTimer) {
    this.#expireTime = setTimer * 1000
    this.#currentTime = setTimer
  }

  /**
   * @returns {Number} - current time of timer in seconds.
   */
  get time() {
    const timePassedSinceStart = Date.now() - this.#startTime
    this.#currentTime = this.#expireTime - timePassedSinceStart
    // return Math.round(this.#currentTime / 1000)
    return this.#currentTime
  }

  start() {
    if (this.#isRunning) return

    this.#startTime = Date.now()
    this.#isRunning = true
  }
}
