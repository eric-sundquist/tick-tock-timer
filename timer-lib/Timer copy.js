// import { TimeEngine } from './TimeEngine.js'

// export class Timer {
//   /**
//    * Set time for timer to expire.
//    * @type {Number} - milliseconds
//    */
//   #expireTime = 0

//   #engine

//   /**
//    * Creates intance of class.
//    * @param {Number} time - milliseconds until timer should expire/ring. Defaults to 0.
//    * @param {Number} updateFreq - milliseconds between updating time. Defaults to 50.
//    */
//   constructor(time = 0) {
//     this.#expireTime = time
//     this.#engine = new TimeEngine()
//   }

//   /**
//    * Returns
//    * @returns {String} - time in HH:MM:SS format.
//    */
//   get getTime() {
//     return this.#convertMsToTimeString(this.#expireTime - this.#engine.time)
//   }

//   /**
//    * @param {Number} time - milliseconds until timer should expire/ring.
//    */
//   set setTime(time) {
//     this.reset()

//     this.#expireTime = time
//   }

//   start() {
//     this.#engine.start
//   }

//   pause() {
//     this.#engine.pause
//   }

//   reset() {
//     this.#engine.reset
//   }

//   /**
//    * Coverts milliseconds to HH:MM:SS:hh. SS:hh is always shown.
//    *
//    * @param {Number} timeInMs
//    * @returns {String} - Time string in format HH:MM:SS:PP
//    */
//   #convertMsToTimeString(timeInMs) {
//     // TODO: Snygga till lösning...

//     const hundredths = Math.floor((timeInMs / 10) % 100)
//     const seconds = Math.floor((timeInMs / 1000) % 60)
//     const minutes = Math.floor((timeInMs / 1000 / 60) % 60)
//     const hours = Math.floor((timeInMs / 1000 / 60 / 60) % 24)

//     let hourString = hours + ':'
//     let minutesString = minutes + ':'
//     let secondsString = seconds + ':'
//     let hundredthsString = hundredths

//     if (hours < 10) {
//       if (hours === 0) {
//         hourString = ''
//       } else {
//         hourString = '0' + hours + ':'
//       }
//     }

//     if (minutes < 10) {
//       if (hours === 0 && minutes === 0) {
//         minutesString = ''
//       } else {
//         minutesString = '0' + minutes + ':'
//       }
//     }

//     if (seconds < 10) {
//       secondsString = '0' + seconds + ':'
//     }

//     if (hundredths < 10) {
//       hundredthsString = '0' + hundredths
//     }

//     return hourString + minutesString + secondsString + hundredthsString
//   }
// }
