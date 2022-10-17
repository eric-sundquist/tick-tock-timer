export class MillisecondsTimeFormatter {
  #milliseconds

  constructor(milliseconds) {
    this.#milliseconds = milliseconds
  }

  /**
   * @returns {object}
   */
  getTimeObject() {
    return {
      hours: Math.floor((this.#milliseconds / 1000 / 60 / 60) % 24),
      minutes: Math.floor((this.#milliseconds / 1000 / 60) % 60),
      seconds: Math.floor((this.#milliseconds / 1000) % 60),
      hundredths: Math.floor((this.#milliseconds / 10) % 100),
    }
  }

  /**
   * @returns {String} - time in HH:MM:SS:hh format. Seconds and hundreths always shown.
   */
  getTimeString() {
    return this.#formatTimeTo24hourString()
  }

  #formatTimeTo24hourString() {
    const timeObject = this.getTimeObject()
    let timeString = ''

    for (const timeUnit in timeObject) {
      // unit - timePart
      timeString += this.#formatTimeUnitValue(timeUnit, timeObject[timeUnit])
    }

    return timeString
  }

  /**
   * @param {String} unit - time unit. ex 'seconds' or 'minutes'.
   * @param {Number} value - value of unit.
   */
  #formatTimeUnitValue(unit, value) {
    let timeString = value < 10 ? this.#padTimeString(value) : '' + value

    timeString += this.#semicolonIfNotHundreths(unit)

    if (value === 0) {
      timeString = this.#showZerosOnlyForSecondsAndHundreths(unit, timeString)
    }

    return timeString
  }

  #padTimeString(value) {
    return '0' + value
  }

  #semicolonIfNotHundreths(unit) {
    if (unit === 'hundredths') {
      return ''
    } else {
      return ':'
    }
  }

  #showZerosOnlyForSecondsAndHundreths(unit, timeString) {
    if (unit === 'seconds' || unit === 'hundredths') {
      return timeString
    } else {
      return ''
    }
  }
}
