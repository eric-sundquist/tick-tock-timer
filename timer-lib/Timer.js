export class Timer {
  #message
  constructor() {
    this.#message = 'hello world'
  }
  get message() {
    return this.#message
  }
}
