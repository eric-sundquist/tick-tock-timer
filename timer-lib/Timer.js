export class Timer {
  #startMS
  
  #currentTime
  
  #expireTime
  
  #isRunning = false
  
  #isPaused = false

  /**
   * Update frequency (milliseconds)
   */
  #updateFrequency = 100

  /**
   * 
   * @param {Number} expireTime - Seconds until timer should expire/ring. 
   */
  constructor(setTimer) {
    this.#expireTime = setTimer * 1000
    this.#currentTime = setTimer
  }

  #updateTime() {
    if (!this.#isRunning || this.#isPaused) return

    // updatera currentTime
    const timePassedSinceStart = Date.now() - this.#startMS
    this.#currentTime = this.#expireTime - timePassedSinceStart

    if (this.#currentTime <= 0) {
      this.#currentTime = 0
      // Skicka "end" event

      return
    }



    // skicka event 'time-updated'

    
    setTimeout(() => this.#updateTime(), this.#updateFrequency)
  }

  /**
   * @returns {Number} - current time of timer in seconds.
   */
  get time() {
    const timePassedSinceStart = Date.now() - this.#startMS
    this.#currentTime = this.#expireTime - timePassedSinceStart
    // return Math.round(this.#currentTime / 1000)
    return this.#currentTime
  }

  start() {
    if (this.#isRunning) return

    if(!this.#isPaused) {
      this.#startMS = Date.now()
    }
    
    this.#isPaused = false
    this.#isRunning = true

    this.#updateTime()
  }
}
