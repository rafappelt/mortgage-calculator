import Component from '../common/Component';
import './CurrencyFieldset.scss';

export default class CurrencyFieldset extends Component {
  #html = `
    <fieldset class="${this.className}__fieldset">
      <legend class="${this.className}__header">${this.title}</legend>
      <currency-input class="${this.className}__input"></currency-input>
      <label class="${this.className}__error"></label>
    </fieldset>
  `;

  constructor() {
    super();
    if (this.isHalfSize) {
      this.classList.add(`${this.className}--half`);
    }
  }

  static get observedAttributes() {
    return ['value', 'error'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.refresh();
  }

  get input() {
    return this.querySelector('currency-input');
  }
  get errorLabel() {
    return this.querySelector(`.${this.className}__error`);
  }

  refresh() {
    this._applyInputValue();
    this._applyError();
  }

  _applyInputValue() {
    if (!this.isReady) {
      return;
    }
    this.input.setAttribute('value', this.value);
  }

  _applyError() {
    if (!this.isReady) {
      return;
    }

    const errorStatusClassName = `${this.className}--error`;

    this.classList.remove(errorStatusClassName);
    if (this.error) {
      this.classList.add(errorStatusClassName);
    }

    this.errorLabel.innerHTML = this.error;

    this.input.setAttribute('error', this.error);
  }

  get isHalfSize() {
    return this.getAttribute('half-size') === 'true';
  }

  get value() {
    return this.getAttribute('value');
  }

  get error() {
    return this.getAttribute('error');
  }

  connectedCallback() {
    this.innerHTML = this.#html;
    this.addEventListener('focusout', (event) => this.setAttribute('value', event.target.value));
  }

  get isReady() {
    return this.hasChildNodes();
  }
}
