export class Timer {
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

  /**
   * Set time for timer to expire.
   * @type {Number} - milliseconds
   */
  #expireTime = 0

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
  #updateFrequency

  /**
   * Identifies the timer created by the update timer timeout.
   * @type {Number}
   */
  #timeoutID

  /**
   * Creates intance of class.
   * @param {Number} time - milliseconds until timer should expire/ring. Defaults to 0.
   * @param {Number} updateFreq - milliseconds between updating time. Defaults to 50.
   */
  constructor(time = 0, updateFreq = 50) {
    this.#expireTime = time
    this.#updateFrequency = updateFreq
  }

  /**
   * Returns
   * @returns {String} - time in HH:MM:SS format.
   */
  get getTime() {
    return this.#convertMsToTimeString(this.#expireTime - this.#ellapsedTime)
  }

  /**
   * @param {Number} time - milliseconds until timer should expire/ring.
   */
  set setTime(time) {
    this.reset()

    this.#expireTime = time
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

  /**
   * Coverts milliseconds to HH:MM:SS:hh. SS:hh is always shown.
   *
   * @param {Number} timeInMs
   * @returns {String} - Time string in format HH:MM:SS:PP
   */
  #convertMsToTimeString(timeInMs) {
    // TODO: Snygga till lösning...

    const hundredths = Math.floor((timeInMs / 10) % 100)
    const seconds = Math.floor((timeInMs / 1000) % 60)
    const minutes = Math.floor((timeInMs / 1000 / 60) % 60)
    const hours = Math.floor((timeInMs / 1000 / 60 / 60) % 24)

    let hourString = hours + ':'
    let minutesString = minutes + ':'
    let secondsString = seconds + ':'
    let hundredthsString = hundredths

    if (hours < 10) {
      if (hours === 0) {
        hourString = ''
      } else {
        hourString = '0' + hours + ':'
      }
    }

    if (minutes < 10) {
      if (hours === 0 && minutes === 0) {
        minutesString = ''
      } else {
        minutesString = '0' + minutes + ':'
      }
    }

    if (seconds < 10) {
      secondsString = '0' + seconds + ':'
    }

    if (hundredths < 10) {
      hundredthsString = '0' + hundredths
    }

    return hourString + minutesString + secondsString + hundredthsString
  }
}
