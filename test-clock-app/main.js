import './style.css'
import { Timer } from '../timer-lib/Timer'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Timer!</h1>
    <p>
      Add time in seconds:
    </p>
    <form id="set-timer-form">
      <input type="number" id="set-timer" name="set-timer" min="0">
      <button type="submit" id="create-timer-btn">Set Timer</button>

    </form>
    <div id="timers-container">
      <h3 id="timer-display">time here</h3>
      <button id="start">Start</button>
      <button id="pause">Pause</button>
      <button id="stop">Stop</button>
    </div>
  </div>
  `

const timer = new Timer()
setTimeDisplay(timer.getTime)

timer.onUpdate(() => {
  setTimeDisplay(timer.getTime)
})

timer.onExpire(() => {
  setTimeDisplay('BEEEP BEEEP BOOP')
})

document.querySelector('#set-timer-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const userSetTimerValue = parseInt(document.querySelector('#set-timer').value) * 1000 // convert to ms

  timer.setTime = userSetTimerValue
  setTimeDisplay(timer.getTime)
})

document.querySelector('#start').addEventListener('click', () => {
  timer.start()
})

document.querySelector('#pause').addEventListener('click', () => {
  timer.pause()
})

document.querySelector('#stop').addEventListener('click', () => {
  timer.stop()
})

function setTimeDisplay(time) {
  document.querySelector('#timer-display').textContent = time
}
