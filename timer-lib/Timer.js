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
  #currentTime

  /**
   * Set time for timer to expire.
   * @type {Number} - milliseconds
   */
  #timeToExpire

  #isRunning = false

  #isPaused = false

  /**
   * Emitts timer events and is handle for listening to those events.
   * @type {HTMLSpanElement}
   */
  #eventHandlerElement = document.createElement('span')

  /**
   * Frequency of timer updates. Tick frequency.
   * @type {Number} - milliseconds
   */
  #updateFrequency = 1000

  /**
   * Identifies the timer created by the update timer timeout.
   * @type {Number}
   */
  #timeoutID

  /**
   * Creates intance of class.
   * @param {Number} time - milliseconds until timer should expire/ring. Defaults to 0.
   */
  constructor(time = 0) {
    this.#timeToExpire = time
    this.#currentTime = time
  }

  /**
   * Returns
   * @returns {String} - time in HH:MM:SS format.
   */
  get getTime() {
    if (this.#startUnixTime) {
      const timePassedSinceStart = Date.now() - this.#startUnixTime
      this.#currentTime = this.#timeToExpire - timePassedSinceStart
    }
    return this.#convertMsToTimeString(this.#currentTime)
  }

  /**
   * @param {Number} time - milliseconds until timer should expire/ring.
   */
  set setTime(time) {
    this.#timeToExpire = time
    this.#currentTime = time
  }

  #updateTime() {
    if (!this.#isRunning || this.#isPaused) return

    // updatera currentTime
    const timePassedSinceStart = Date.now() - this.#startUnixTime
    this.#currentTime = this.#timeToExpire - timePassedSinceStart

    if (this.#currentTime <= 0) {
      this.#currentTime = 0
      this.#triggerEvent('expired', this.#currentTime)
      return
    }

    // skicka event 'time-updated'
    this.#triggerEvent('time-updated', this.#currentTime)

    this.#timeoutID = setTimeout(() => this.#updateTime(), this.#updateFrequency)
  }

  start() {
    if (this.#isRunning) return

    if (!this.#isPaused) {
      this.#startUnixTime = Date.now()
    }

    this.#isPaused = false
    this.#isRunning = true

    this.#updateTime()
  }

  pause() {
    console.log('TOOD: PAUSE TIMER')
  }

  stop() {
    this.#isRunning = false
    this.#isPaused = false

    clearTimeout(this.#timeoutID)
  }

  onUpdate(callback) {
    this.#eventHandlerElement.addEventListener('time-updated', callback)
  }

  onExpire(callback) {
    this.#eventHandlerElement.addEventListener('expired', callback)
  }

  #triggerEvent(eventName) {
    const event = new CustomEvent(eventName, {
      detail: {
        time: this.getTime,
      },
    })
    this.#eventHandlerElement.dispatchEvent(event)
  }

  /**
   *
   * @param {Number} timeInMs
   * @returns {String} - Time string in format HH:MM:SS
   */
  #convertMsToTimeString(timeInMs) {
    // TODO: Ta bort onödiga nollor..
    // Bugg rundar nedåt.. Är på 00:00 en sekund innan Beep Boop

    // const seconds = Math.floor((timeInMs / 1000) % 60)
    // const minutes = Math.floor((timeInMs / 1000 / 60) % 60)
    // const hours = Math.floor((timeInMs / 1000 / 60 / 60) % 24)
    const timeStringLong = new Date(timeInMs).toISOString().slice(11, 19)

    return timeStringLong
  }
}
