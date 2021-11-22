import './common/scss/styles.scss';
import '../../resources/img/favicon.ico';
import CurrencyInput from './currency-input/CurrencyInput.component';
import Slider from './slider/Slider.component';
import CurrencyFieldset from './currency-fieldset/CurrencyFieldset.component';
import Calculator from './calculator/Calculator.component';
import NumberInput from './number-input/NumberInput.component';

customElements.define('number-input', NumberInput);
customElements.define('currency-input', CurrencyInput);
customElements.define('currency-fieldset', CurrencyFieldset);
customElements.define('app-slider', Slider);
customElements.define('app-calculator', Calculator);
