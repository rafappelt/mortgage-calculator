import NumberInput from '../number-input/NumberInput.component';
import './CurrencyInput.scss';

export default class CurrencyInput extends NumberInput {
  _emptyValues = ['', '$', '$ '];
  _typingRegex = /^((\$)|(\$\s))?(([0-9]{1,3}(?:,?([0-9]{0,3})?)*(\.[0-9]{0,2})?)?)?$/;
  _initialTypingValue = '$ ';

  constructor() {
    super();
  }
}
