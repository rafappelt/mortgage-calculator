import Component from '../common/Component';
import './Slider.scss';

export default class Slider extends Component {
  #html = `
  <fieldset class="slider">
    <legend class="slider__header">${this.title}</legend>
    <label class="slider__limit slider__min"></label>
    <input class="slider__range" type="range"/>
    <label class="slider__limit slider__max"></label>
    <number-input class="slider__number"></number-input>
  </fieldset>
`;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = this.#html;
    this._attachInputListeners();
    this.refresh();
  }

  _attachInputListeners() {
    this.rangeInput.addEventListener('input', (event) => {
      this.setAttribute('value', event.target.value);
      this._dispatchInputEvent();
      event.stopPropagation();
    });
    this.numberInput.addEventListener('focusout', (event) => {
      this.setAttribute('value', event.target.value);
      this._dispatchInputEvent();
      event.stopPropagation();
    });
    this.numberInput.addEventListener('input', (event) => {
      event.stopPropagation();
    });
  }

  _dispatchInputEvent() {
    this.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        cancelable: true,
      })
    );
  }

  get isReady() {
    return this.hasChildNodes();
  }

  get rangeInput() {
    return this.querySelector('.slider__range');
  }

  get numberInput() {
    return this.querySelector('.slider__number');
  }

  get minLabel() {
    return this.querySelector('.slider__min');
  }

  get maxLabel() {
    return this.querySelector('.slider__max');
  }

  get min() {
    return parseFloat(this.getAttribute('min'));
  }

  get max() {
    return parseFloat(this.getAttribute('max'));
  }

  get step() {
    return parseFloat(this.getAttribute('step'));
  }

  get value() {
    return parseFloat(this.getAttribute('value'));
  }

  refresh() {
    this.refreshSliderBackground();
    this._applyRangeInputValues();
    this._applyNumberInputValues();
    this._applyLimitsLabelsValues();
  }

  static get observedAttributes() {
    return ['min', 'max', 'step', 'value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.refresh();
  }

  _applyRangeInputValues() {
    if (!this.isReady) {
      return;
    }
    this.rangeInput.setAttribute('min', this.min);
    this.rangeInput.setAttribute('max', this.max);
    this.rangeInput.setAttribute('step', this.step);
    this.rangeInput.value = this.value;
  }

  _applyLimitsLabelsValues() {
    if (!this.isReady) {
      return;
    }
    this.minLabel.innerText = this.min;
    this.maxLabel.innerText = this.max;
  }

  _applyNumberInputValues() {
    if (!this.isReady) {
      return;
    }
    this.numberInput.setAttribute('value', this.value);
  }

  refreshSliderBackground() {
    if (!this.isReady) {
      return;
    }
    this.rangeInput.style.background = this._createSliderBackground(this.percent);
  }

  get percent() {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  _createSliderBackground(percent) {
    return `linear-gradient(to right, #1b3979 ${percent}%, #dddddd ${percent}%)`;
  }
}
