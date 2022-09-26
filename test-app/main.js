import './style.css'
import { Timer } from '../timer-lib/Timer'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Timer!</h1>
    <p>
      Set a time in seconds:
    </p>
    <form id="set-timer-form">
      <input type="number" id="set-timer" name="set-timer" min="0">
      <button type="submit" id="create-timer-btn">Set Timer</button>
    </form>

    <div id="timers-container">
      <h3 id="timer-display">time here</h3>
      <button id="start">Start</button>
      <button id="pause">Pause</button>
      <button id="reset">Reset</button>
      <button id="addFive">+5s</button>
      <button id="removeFive">-5s</button>
    </div>
  </div>
  `

const timer = new Timer()
setTimeDisplay(timer.getTimeString())

timer.addEventListener('updated', (event) => {
  setTimeDisplay(event.detail.timeString)
})

timer.addEventListener('reseted', (event) => {
  setTimeDisplay(event.detail.timeString)
})

timer.addEventListener('expired', () => {
  setTimeDisplay('BEEEP BEEEP BOOP')
})

document.querySelector('#set-timer-form').addEventListener('submit', (event) => {
  event.preventDefault()

  const userSetTimerValue = parseInt(document.querySelector('#set-timer').value) * 1000 // convert to ms
  timer.setTime(userSetTimerValue)
  setTimeDisplay(timer.getTimeString())
})

document.querySelector('#start').addEventListener('click', () => {
  timer.start()
})

document.querySelector('#pause').addEventListener('click', () => {
  timer.pause()
})

document.querySelector('#reset').addEventListener('click', () => {
  timer.reset()
})

document.querySelector('#addFive').addEventListener('click', () => {
  timer.adjustTime(5000)
})

document.querySelector('#removeFive').addEventListener('click', () => {
  timer.adjustTime(-5000)
})

function setTimeDisplay(time) {
  document.querySelector('#timer-display').textContent = time
}
