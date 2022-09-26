# Tick Tock Timer

Tick Tock Timer is a library that helps you to easily create a countdown timer in the browser. Create a new timer instance and set the time of it. The timer can be started, paused and reseted. You can also adjust the time of the timer, by adding or removing time, while it is running. The timer dispatches events when its state is changed. For example on update or when it has expired.

# Basic usage example

```javascript
// TODO need to update this import...
import { Timer } from 'Timer.js';

const timer = new Timer();

timer.setTimer(10000);

timer.start();

console.log(timer.getTimeString());

timer.addEventListener('expired', () => {
  console.log('Timer Expired');
});
```

# Properties

The Timer class has the following public properties.

- **isExpired** - boolean
- **isRunning** - boolean
- **isPaused** - boolean

# Methods

The Timer class has the following public methods.

- **start()** - starts the timer. If the timer was paused it will resume.
- **pause()** - pauses the timer if it was running.
- **reset()** - resets the timer to its initial set value. If it's running the timer will stop.
- **adjustTime(_timeAdjustment_)** - Add or remove time to the timer. Its argument _timeAdjustment_ is the time to add/remove in **milliseconds**. A negative number removes time, a positive adds time.
- **setTime(_time_)** - Sets the time of the time according. The argument _time_ should be a positive integer which indicates time to set in **milliseconds**.
- **getTimeObject()** - returns the current time in form of an object with hours, minutes, seconds and hundredths keys.
- **getTimeString()** - returns the currents time as a string formated as: _HH:MM:SS:hh_ Seconds and hundredths are even if they are 0.
- **addEventListener(_event_, _callback_)** - lets you listen and execute your own code when an event from the timer is dispatched. _event_-argument Should be a string for the event to listen for. The _callback_-argument sets the callback that will be invoked when the event is dispatched. The callback accepts a single parameter which is fed an Event object containing details of the event that occurred. More on different events bellow.

# Events

- **started** - is dispatched when the timer is started.

- **paused** - is dispatched when the timer is paused.

- **reseted** - is dispatched when the time of the timer is reseted.

- **updated** - is dispatched when the time of the timer is updated.

- **expired** - is dispatched when the time of the timer is expired.

All Events have a detail property that contains information of the time of the timer when the event was dispatched.

## Example use with addEventListener-method

```javascript
const timer = new Timer(60000);
timer.addEventListener('started', (event) => {
  console.log(event.detail.timeString); // logs 01:00:00
  console.log(event.detail.timeObject); // logs {hours: 0, minutes: 1, seconds: 0, hundredths: 0}
});
```

# Test application

The test application is to test the library while also acting as an example of usage of it.

To start up the test application

- ` cd test-app` - go into the directory of the app
- `npm i` - install app dependencies
- `npm run dev` - starts a development server that lets you use the test app

# Licens

MIT License, (See adjacent LICENSE file)
