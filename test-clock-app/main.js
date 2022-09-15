import './style.css'
import javascriptLogo from './javascript.svg'
import { Timer } from '../timer-lib/Timer'

const t1 = new Timer()
console.log(t1.message)

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Timer!</h1>
    <p class="read-the-docs">
      Timer is controlled by buttons bellow:
    </p>
  </div>
`


