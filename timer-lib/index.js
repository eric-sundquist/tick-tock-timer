import { Timer } from "./Timer.js";

const t1 = new Timer(10)
t1.start()
console.log('Tiden är ' + t1.time);

setInterval(() => printTime(t1.time), 500)
  
  function printTime (time) {
    console.log(`${time} seconds...`)
  }