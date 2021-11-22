import CalculatorPresenter from '../../ui/calculator/Calculator.presenter';
import Component from '../common/Component';
import './Calculator.scss';

export default class Calculator extends Component {
  #html = `
      <section class="data-input">
        <h2 class="data-input__header">Change values to calculate your results</h2>
        <form class="data-input__form">
          <app-slider id="years-of-mortgage" title="Years of mortgage"></app-slider>
          <app-slider id="interest-rate" title="Rate of interest (%)"></app-slider>
          <currency-fieldset id="loan-amount" title="Loan Amount"></currency-fieldset>
          <currency-fieldset id="annual-tax" title="Annual Tax" half-size="true"></currency-fieldset>
          <currency-fieldset id="annual-insurance" title="Annual Insurance" half-size="true"></currency-fieldset>
          <input id="calculate" type="button" class="button" value="Calculate"></input>
        </form>
      </section>

      <section class="data-output">
        <h2 class="data-output__header">Your results</h2>
        <div class="data-output__table">
          <div id="principal-and-interest" class="data-output__item">
            <label class="data-output__label">Principal & Interest</label>
            <span class="data-output__value"></span>
          </div>
          <div id="tax" class="data-output__item">
            <label class="data-output__label">Tax</label>
            <span class="data-output__value"></span>
          </div>
          <div id="insurance" class="data-output__item">
            <label class="data-output__label">Insurance</label>
            <span class="data-output__value"></span>
          </div>
          <div id="monthly-payment" class="data-output__item">
            <label class="data-output__label">Total Monthly Payment</label>
            <span class="data-output__value"></span>
          </div>
        </div>
      </section>
  `;

  #presenter;

  constructor() {
    super();
    this.#presenter = new CalculatorPresenter();
  }

  _createPresenterInputBinder(propertyName) {
    return (event) => (this.#presenter[propertyName] = event.target.value);
  }

  connectedCallback() {
    this.innerHTML = this.#html;
    this._attachInputBinders();
    this._attachButtonClickListener();
    this.#presenter.subscribe(this._applyPresenterState.bind(this));
  }

  get isReady() {
    return this.hasChildNodes();
  }

  _attachInputBinders() {
    this._attachYearsOfMortgageBinder();
    this._attachInterestRateBinder();
    this._attachLoanAmountBinder();
    this._attachAnnualTaxBinder();
    this._attachAnnualInsuranceBinder();
  }

  _attachYearsOfMortgageBinder() {
    this._attachEventListners(
      '#years-of-mortgage',
      'input',
      this._createPresenterInputBinder('yearsOfMortgage')
    );
  }

  _attachInterestRateBinder() {
    this._attachEventListners(
      '#interest-rate',
      'input',
      this._createPresenterInputBinder('interestRate')
    );
  }

  _attachLoanAmountBinder() {
    this._attachEventListners(
      '#loan-amount',
      'focusout',
      this._createPresenterInputBinder('loanAmount')
    );
  }

  _attachAnnualTaxBinder() {
    this._attachEventListners(
      '#annual-tax',
      'focusout',
      this._createPresenterInputBinder('annualTax')
    );
  }

  _attachAnnualInsuranceBinder() {
    this._attachEventListners(
      '#annual-insurance',
      'focusout',
      this._createPresenterInputBinder('annualInsurance')
    );
  }

  _attachButtonClickListener() {
    this.querySelector('#calculate').addEventListener('click', (event) => {
      this.#presenter.handleCalculateButtonPressed();
    });
  }

  _attachEventListners(selector, events, binder) {
    for (const eventName of events.split(' ')) {
      this.querySelector(selector).addEventListener(eventName, binder);
    }
  }

  _handleDisplayResultsState(displayResult) {
    if (displayResult) {
      this._displayResults();
      return;
    }

    this._hideResults();
  }

  _hideResults() {
    this.querySelector('.data-output').classList.add('data-output--hidden');
  }

  _displayResults() {
    this.querySelector('.data-output').classList.remove('data-output--hidden');
  }

  _applyPresenterState(state) {
    this.querySelector('#years-of-mortgage').setAttribute('value', state.yearsOfMortgage);
    this.querySelector('#years-of-mortgage').setAttribute('error', state.yearsOfMortgageError);
    this.querySelector('#years-of-mortgage').setAttribute('min', state.yearsOfMortgageMin);
    this.querySelector('#years-of-mortgage').setAttribute('max', state.yearsOfMortgageMax);
    this.querySelector('#years-of-mortgage').setAttribute('step', state.yearsOfMortgageStep);
    this.querySelector('#interest-rate').setAttribute('value', state.interestRate);
    this.querySelector('#interest-rate').setAttribute('error', state.interestRateError);
    this.querySelector('#interest-rate').setAttribute('min', state.interestRateMin);
    this.querySelector('#interest-rate').setAttribute('max', state.interestRateMax);
    this.querySelector('#interest-rate').setAttribute('step', state.interestRateStep);
    this.querySelector('#loan-amount').setAttribute('value', state.loanAmount);
    this.querySelector('#loan-amount').setAttribute('error', state.loanAmountError);
    this.querySelector('#annual-tax').setAttribute('value', state.annualTax);
    this.querySelector('#annual-tax').setAttribute('error', state.annualTaxError);
    this.querySelector('#annual-insurance').setAttribute('value', state.annualInsurance);
    this.querySelector('#annual-insurance').setAttribute('error', state.annualInsuranceError);
    this.querySelector('#principal-and-interest .data-output__value').innerText =
      state.principalAndInterest;
    this.querySelector('#tax .data-output__value').innerText = state.tax;
    this.querySelector('#insurance .data-output__value').innerText = state.insurance;
    this.querySelector('#monthly-payment .data-output__value').innerText = state.monthlyPayment;
    this._handleDisplayResultsState(state.displayResult);
  }
}
