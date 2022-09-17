export class Timer {
  #startMS
  
  #currentTime
  
  #expireTime = 0
  
  #isRunning = false
  
  #isPaused = false

  /**
   * Update frequency (milliseconds)
   */
  #updateFrequency = 100

  /**
   * 
   * @param {Number} time - Seconds until timer should expire/ring. Defaults to 0.
   */
  constructor(time = 0) {
    this.#expireTime = time * 1000 // seconds to ms
    this.#currentTime = time
  }

  /**
   * @param {Number} time - Seconds until timer should expire/ring.
   */
  set setTime (time) {
    this.#expireTime = time * 1000
    this.#currentTime = time
  }

  /**
   * @returns {Number} - current time of timer in seconds.
   */
  get getTime() {
    if (this.#startMS) {
      const timePassedSinceStart = Date.now() - this.#startMS
      this.#currentTime = this.#expireTime - timePassedSinceStart
    }
    return Math.floor(this.#currentTime)
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


  start() {
    if (this.#isRunning) return

    if(!this.#isPaused) {
      this.#startMS = Date.now()
    }
    
    this.#isPaused = false
    this.#isRunning = true

    this.#updateTime()
  }

  pause() {
    console.log('TOOD: PAUSE TIMER');
  }

  stop() {
    console.log('TOOD: STOP TIMER');
  }
}
