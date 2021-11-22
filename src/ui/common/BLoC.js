/**
 * BLoC stands for Business Logic Component.
 * @see https://www.didierboelens.com/2018/08/reactive-programming-streams-bloc/
 */
export default class BLoC {
  _state = {};
  #listeners = [];

  constructor(initalState) {
    if (initalState) {
      this._state = initalState;
    }
  }

  get state() {
    return this._state;
  }

  _changeState(state) {
    this._state = state;

    if (this.#listeners.length > 0) {
      this.#listeners.forEach(this._applyState.bind(this));
    }
  }

  _applyState(fn) {
    fn(this._state);
  }

  subscribe(fn) {
    this.#listeners.push(fn);
    this._applyState(fn);
  }

  unsubscribe(fn) {
    const index = this.#listeners.indexOf(fn);
    if (index > -1) {
      this.#listeners.splice(index, 1);
    }
  }
}
