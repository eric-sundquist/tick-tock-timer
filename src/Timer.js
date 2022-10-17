import { MillisecondsTimeFormatter } from './MillisecondsTimeFormatter'

export class Timer {
  /**
   * @type {Number} - milliseconds
   */
  #startTimeInMS

  /**
   * @type {Number} - milliseconds
   */
  #ellapsedTime

  /**
   * @type {Number} - milliseconds
   */
  #expireTime

  /**
   * @type {boolean}
   */
  #isRunning

  /**
   * @type {boolean}
   */
  #isPaused

  /**
   * @type {HTMLSpanElement}
   */
  #eventHandlerElement = document.createElement('span')

  /**
   * @type {Number} - milliseconds
   */
  #updateFrequency

  /**
   * @type {Number}
   */
  #timeoutID

  /**
   * Creates intance of the Timer class.
   */
  constructor() {
    this.#expireTime = 0
    this.#updateFrequency = 50
    this.#ellapsedTime = 0
    this.#isRunning = false
    this.#isPaused = false
    this.#startTimeInMS = 0
  }

  get isRunning() {
    return this.#isRunning
  }

  get isPaused() {
    return this.#isPaused
  }

  get isExpired() {
    return this.#isExpired()
  }

  start() {
    if (this.#isRunning) return

    if (this.#isInitialStart()) {
      this.#setNewStartTime()
    } else {
      this.#updateStartTimeAfterPause()
    }

    this.#setRunningState()
    this.#dispatchEvent('started')
    this.#updateTime()
  }

  pause() {
    if (this.#isPaused || !this.#isRunning) return

    this.#setPausedState()
    this.#pauseTimer()
    this.#dispatchEvent('paused')
  }

  reset() {
    this.#setStoppedState()
    this.#resetTimer()
    this.#dispatchEvent('reseted')
  }

  /**
   * @param {Number} timeAdjustment - milliseconds. Positive to add time. Negative to substract.
   */
  adjustTime(timeAdjustment) {
    this.#validateTimeAdjustmentInput(timeAdjustment)

    if (this.#isRunning) {
      this.#startTimeInMS += timeAdjustment
      this.#updateEllapsedTime()

      if (this.#isExpired()) {
        this.#endTimer()
      } else {
        this.#dispatchEvent('updated')
      }
    }
  }

  /**
   * @param {Number} time - milliseconds until timer should expire/ring.
   */
  setTime(time) {
    this.#validateSetTimeInput(time)
    this.reset()
    this.#expireTime = time
  }

  /**
   * @returns {object}
   */
  getTimeObject() {
    return new MillisecondsTimeFormatter(this.#timeUntilExpire()).getTimeObject()
  }

  /**
   * @returns {String} - time in HH:MM:SS:hh format. Seconds and hundreths always shown.
   */
  getTimeString() {
    return new MillisecondsTimeFormatter(this.#timeUntilExpire()).getTimeString()
  }

  /**
   * @param {String} event - Event to listen for.
   * @param {Function} callback - callback to run when event is triggered.
   */
  addEventListener(event, callback) {
    this.#eventHandlerElement.addEventListener(event, callback)
  }

  #dispatchEvent(eventName) {
    const event = this.#createEvent(eventName)
    this.#eventHandlerElement.dispatchEvent(event)
  }

  #updateTime() {
    this.#updateEllapsedTime()

    if (this.#isExpired()) {
      this.#endTimer()
    } else {
      this.#dispatchEvent('updated')
      this.#setNextTimerUpdate()
    }
  }

  #isInitialStart() {
    return !this.#isPaused && !this.#isRunning
  }

  #setNewStartTime() {
    this.#startTimeInMS = Date.now()
  }

  #updateStartTimeAfterPause() {
    this.#startTimeInMS = Date.now() - this.#ellapsedTime
  }

  #setRunningState() {
    this.#isPaused = false
    this.#isRunning = true
  }

  #setPausedState() {
    this.#isPaused = true
    this.#isRunning = false
  }

  #pauseTimer() {
    clearTimeout(this.#timeoutID)
  }

  #setStoppedState() {
    this.#isRunning = false
    this.#isPaused = false
  }

  #resetTimer() {
    this.#ellapsedTime = 0
    clearTimeout(this.#timeoutID)
  }

  #createEvent(name) {
    return new CustomEvent(name, {
      detail: {
        timeObject: this.getTimeObject(),
        timeString: this.getTimeString(),
      },
    })
  }

  #endTimer() {
    this.#ignoreOvershoot()
    this.#dispatchEvent('updated')
    this.#setStoppedState()
    this.#dispatchEvent('expired')
  }

  #updateEllapsedTime() {
    this.#ellapsedTime = Date.now() - this.#startTimeInMS
  }

  #isExpired() {
    return this.#ellapsedTime >= this.#expireTime
  }

  #ignoreOvershoot() {
    this.#ellapsedTime = this.#expireTime
  }

  #setNextTimerUpdate() {
    this.#timeoutID = setTimeout(() => this.#updateTime(), this.#updateFrequency)
  }

  /**
   * @returns {Number} -milliseconds
   */
  #timeUntilExpire() {
    return this.#expireTime - this.#ellapsedTime
  }

  #isNotAValidInteger(number) {
    return !Number.isInteger(number) || Number.isNaN(number)
  }

  /**
   * @throws {TypeError} - if argument is not valid.
   */
  #validateSetTimeInput(time) {
    if (this.#isNotAValidInteger(time) || time < 0) {
      throw new TypeError('Recieved argument is not of right type. Expected positive integer.')
    }
  }

  /**
   * @throws {TypeError} - if argument is not valid.
   */
  #validateTimeAdjustmentInput(timeAdjustment) {
    if (this.#isNotAValidInteger(timeAdjustment)) {
      throw new TypeError('Recieved argument is not of right type. Expected positive integer.')
    }
  }
}
