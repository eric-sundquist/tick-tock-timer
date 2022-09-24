export class TimeEngine {
  /**
   * Milliseconds since Unix epoch when timer initially started
   * @type {Number} - milliseconds
   */
  #startTime

  /**
   * Current internal time of timer. (counting up)
   * @type {Number} - milliseconds
   */
  #ellapsedTime = 0

  #isRunning = false

  #isPaused = false

  /**
   * Frequency of timer updates. Tick frequency.
   * @type {Number} - milliseconds
   */
  #updateFrequency

  /**
   * Identifies the timer created by the update timer timeout.
   * @type {Number}
   */
  #timeoutID

  /**
   * Emitts timer events and is handle for listening to those events.
   * @type {HTMLSpanElement}
   */
  #eventHandlerElement = document.createElement('span')

  /**
   * Creates intance of class.
   * @param {Number} time - milliseconds until timer should expire/ring. Defaults to 0.
   * @param {Number} updateFreq - milliseconds between updating time. Defaults to 50.
   */
  constructor(updateFreq = 50) {
    this.#updateFrequency = updateFreq
  }

  /**
   * @returns {Number} - time in ms.
   */
  get time() {
    return this.#ellapsedTime
  }

  #updateTime() {
    if (!this.#isRunning || this.#isPaused) return

    this.#ellapsedTime = Date.now() - this.#startTime

    if (this.#ellapsedTime >= this.#expireTime) {
      this.#ellapsedTime = this.#expireTime
      this.#triggerEvent('expired')
      this.#isRunning = false
      this.#isPaused = false
      return
    }

    this.#triggerEvent('updated')

    this.#timeoutID = setTimeout(() => this.#updateTime(), this.#updateFrequency)
  }

  start() {
    if (this.#isRunning) return

    if (!this.#isPaused) {
      this.#startTime = Date.now()
    }

    if (this.#isPaused) {
      this.#startTime = Date.now() - this.#ellapsedTime
    }

    this.#isPaused = false
    this.#isRunning = true

    this.#triggerEvent('started')
    this.#updateTime()
  }

  pause() {
    if (this.#isPaused || !this.#isRunning) return

    this.#isPaused = true
    this.#isRunning = false

    this.#triggerEvent('paused')
    clearTimeout(this.#timeoutID)
  }

  reset() {
    this.#isRunning = false
    this.#isPaused = false
    this.#ellapsedTime = 0

    this.#triggerEvent('reseted')
    clearTimeout(this.#timeoutID)
  }

  /**
   *
   * @param {String} event - Event to listen for.
   * @param {Function} callback - callback to run when event is triggered.
   */
  onEvent(event, callback) {
    this.#eventHandlerElement.addEventListener(event, callback)
  }

  #triggerEvent(eventName) {
    const event = new CustomEvent(eventName, {
      detail: {
        time: this.getTime,
      },
    })
    this.#eventHandlerElement.dispatchEvent(event)
  }
}
