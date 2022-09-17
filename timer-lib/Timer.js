export class Timer {

  /**
   * Milliseconds since Unix epoch when timer started
   * @type {Number} - milliseconds
   */
  #startUnixTime
  
  /**
   * Current time of timer.
   * @type {Number} - milliseconds
   */
  #currentTime = 0
  
  /**
   * Set time for timer to expire.
   * @type {Number} - milliseconds
   */
  #timeToExpire = 0
  
  #isRunning = false
  
  #isPaused = false

  /**
   * Frequency of timer updates. Tick frequency.
   * @type {Number} - milliseconds
   */
  #updateFrequency = 100

  /**
   * Creates intance of class.
   * @param {Number} time - milliseconds until timer should expire/ring.
   */
  constructor(time) {
    this.#timeToExpire = time
    this.#currentTime = time
  }

  /**
   * @param {Number} time - Seconds until timer should expire/ring.
   */
  set setTime (time) {
    this.#timeToExpire = time * 1000
    this.#currentTime = time
  }

  /**
   * Returns 
   * @returns {String} - time in MM:SS format.
   */
  get getTime() {
    if (this.#startUnixTime) {
      const timePassedSinceStart = Date.now() - this.#startUnixTime
      this.#currentTime = this.#timeToExpire - timePassedSinceStart
      return Math.floor(this.#currentTime)
    } else {
      return '00:00'
    }
  }

  #updateTime() {
    if (!this.#isRunning || this.#isPaused) return

    // updatera currentTime
    const timePassedSinceStart = Date.now() - this.#startUnixTime
    this.#currentTime = this.#timeToExpire - timePassedSinceStart

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
      this.#startUnixTime = Date.now()
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
