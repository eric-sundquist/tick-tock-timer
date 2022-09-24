export class Timer {
  /**
   * @type {Number} - milliseconds
   */
  #startTimeInMS

  /**
   * @type {Number} - milliseconds
   */
  #ellapsedTimeInMS

  /**
   * @type {Number} - milliseconds
   */
  #expireTime

  #isRunning

  #isPaused

  /**
   * @type {HTMLSpanElement}
   */
  #eventHandlerElement = document.createElement('span')

  /**
   * @type {Number} - milliseconds
   */
  #updateFrequencyInMS

  #timeoutID

  /**
   * Creates intance of the Timer class.
   * @param {Number} time - milliseconds until timer should expire/ring. Defaults to 0.
   * @param {Number} updateFreq - milliseconds between updating time. Defaults to 50.
   */
  constructor(time = 0, updateFreq = 50) {
    this.#expireTime = time
    this.#updateFrequencyInMS = updateFreq
    this.#ellapsedTimeInMS = 0
    this.#isRunning = false
    this.#isPaused = false
  }

  /**
   * @returns {String} - time in HH:MM:SS format.
   */
  getTime() {
    return this.#convertMsToTimeString(this.#expireTime - this.#ellapsedTimeInMS)
  }

  /**
   * @param {Number} time - milliseconds until timer should expire/ring.
   */
  setTime(time) {
    this.reset()
    this.#expireTime = time
  }

  start() {
    if (this.#isRunning) return

    if (this.#isInitialStart) {
      this.#setNewStartTime()
    } else {
      this.#updateStartTimeAfterPause()
    }

    this.#dispatchEvent('started')
    this.#setRunningState()
    this.#updateTime()
  }

  pause() {
    if (this.#isPaused || !this.#isRunning) return

    this.#dispatchEvent('paused')
    this.#setPausedState()
    this.#pauseTimer()
  }

  reset() {
    this.#dispatchEvent('reseted')
    this.#setStoppedState()
    this.#resetTimer()
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

    if (this.#isExpired) {
      this.#endTimer()
    } else {
      this.#dispatchEvent('updated')
      this.#setNextTimerUpdate()
    }
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

  #isInitialStart() {
    return !this.#isPaused && !this.#isRunning
  }

  #setNewStartTime() {
    this.#startTimeInMS = Date.now()
  }

  #updateStartTimeAfterPause() {
    this.#startTimeInMS = Date.now() - this.#ellapsedTimeInMS
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
    this.#ellapsedTimeInMS = 0
    clearTimeout(this.#timeoutID)
  }

  #createEvent(name) {
    new CustomEvent(name, {
      detail: {
        time: this.getTime,
      },
    })
  }

  #endTimer() {
    this.#ignoreOvershoot()
    this.#setStoppedState()
    this.#dispatchEvent('expired')
  }

  #updateEllapsedTime() {
    this.#ellapsedTimeInMS = Date.now() - this.#startTimeInMS
  }

  #isExpired() {
    return this.#ellapsedTimeInMS >= this.#expireTime
  }

  #ignoreOvershoot() {
    this.#ellapsedTimeInMS = this.#expireTime
  }

  #setNextTimerUpdate() {
    this.#timeoutID = setTimeout(() => this.#updateTime(), this.#updateFrequencyInMS)
  }
}
