import Component from '../common/Component';
import './NumberInput.scss';

export default class NumberInput extends Component {
  _html = `
       <input class="${this.className}__input"></input>
    `;

  _emptyValues = [''];
  _typingRegex = /^(([0-9]{1,3}(?:,?([0-9]{0,3})?)*(\.[0-9]{0,2})?)?)?$/;
  _initialTypingValue = '';

  #lastInputState;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this._html;
    this._attachFocusBinder();
    this._attachBlurBinder();
    this._attachInputBinder();
  }

  static get observedAttributes() {
    return ['value', 'error'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.refresh();
  }

  refresh() {
    this._applyInputValue();
    this._checkError();
  }

  _checkError() {
    const errorClass = `${this.className}--error`;
    this.classList.remove(errorClass);
    if (this.error) {
      this.classList.add(errorClass);
    }
  }

  _applyInputValue() {
    if (!this.isReady) {
      return;
    }
    this.input.value = this.value;
  }

  get isReady() {
    return this.hasChildNodes();
  }

  get input() {
    return this.querySelector('input');
  }

  get value() {
    return this.getAttribute('value');
  }

  get error() {
    return this.getAttribute('error');
  }

  _attachFocusBinder() {
    this.input.addEventListener('focusin', this._handleInputFocus.bind(this));
  }

  _attachBlurBinder() {
    this.input.addEventListener('focusout', this._handleInputBlur.bind(this));
  }

  _attachInputBinder() {
    this.input.addEventListener('input', this._handleInput.bind(this));
  }

  _handleInputFocus() {
    if (this._hasEmptyValue) {
      this._applyInitialTypingValue();
    }
  }

  _handleInputBlur() {}

  _handleInput() {
    if (this._hasValidInputValue) {
      this._storeInputState();
    } else if (this._hasStoredInputState) {
      this._revertToLastInputState();
    } else {
      this._applyInitialTypingValue();
    }
  }

  get _hasEmptyValue() {
    return this._emptyValues.indexOf(this.input.value) >= 0;
  }

  get _hasValidInputValue() {
    return this._typingRegex.test(this.input.value);
  }

  get _hasStoredInputState() {
    return this.#lastInputState != undefined;
  }

  _applyInitialTypingValue() {
    this.input.value = this._initialTypingValue;
  }

  _storeInputState() {
    this.#lastInputState = {
      value: this.input.value,
      selectionStart: this.input.selectionStart,
      selectionEnd: this.input.selectionEnd,
    };
  }

  _revertToLastInputState() {
    this.input.value = this.#lastInputState.value;
    this.input.setSelectionRange(
      this.#lastInputState.selectionStart,
      this.#lastInputState.selectionEnd
    );
  }
}
