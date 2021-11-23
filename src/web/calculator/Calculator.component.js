import CalculatorPresenter from '../../ui/calculator/Calculator.presenter';
import Component from '../common/Component';
import './Calculator.scss';
import * as html from './Calculator.html';

export default class Calculator extends Component {
  #presenter;

  constructor() {
    super();
    this.#presenter = new CalculatorPresenter();
  }

  _createPresenterInputBinder(propertyName) {
    return (event) => (this.#presenter[propertyName] = event.target.value);
  }

  connectedCallback() {
    this.innerHTML = html.default;
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

  get yearsOfMortgage() {
    return this.querySelector('#years-of-mortgage');
  }

  get interestRate() {
    return this.querySelector('#interest-rate');
  }

  get loanAmount() {
    return this.querySelector('#loan-amount');
  }

  get annualTax() {
    return this.querySelector('#annual-tax');
  }

  get annualInsurance() {
    return this.querySelector('#annual-insurance');
  }

  get principalAndInterest() {
    return this.querySelector('#principal-and-interest');
  }

  get tax() {
    return this.querySelector('#tax');
  }

  get insurance() {
    return this.querySelector('#insurance');
  }

  get monthlyPayment() {
    return this.querySelector('#monthly-payment');
  }

  _applyPresenterState(state) {
    this.yearsOfMortgage.setAttribute('value', state.yearsOfMortgage);
    this.yearsOfMortgage.setAttribute('error', state.yearsOfMortgageError);
    this.yearsOfMortgage.setAttribute('min', state.yearsOfMortgageMin);
    this.yearsOfMortgage.setAttribute('max', state.yearsOfMortgageMax);
    this.yearsOfMortgage.setAttribute('step', state.yearsOfMortgageStep);
    this.interestRate.setAttribute('value', state.interestRate);
    this.interestRate.setAttribute('error', state.interestRateError);
    this.interestRate.setAttribute('min', state.interestRateMin);
    this.interestRate.setAttribute('max', state.interestRateMax);
    this.interestRate.setAttribute('step', state.interestRateStep);
    this.loanAmount.setAttribute('value', state.loanAmount);
    this.loanAmount.setAttribute('error', state.loanAmountError);
    this.annualTax.setAttribute('value', state.annualTax);
    this.annualTax.setAttribute('error', state.annualTaxError);
    this.annualInsurance.setAttribute('value', state.annualInsurance);
    this.annualInsurance.setAttribute('error', state.annualInsuranceError);
    this.principalAndInterest.querySelector('.data-output__value').innerText =
      state.principalAndInterest;
    this.tax.querySelector('.data-output__value').innerText = state.tax;
    this.insurance.querySelector('.data-output__value').innerText = state.insurance;
    this.monthlyPayment.querySelector('.data-output__value').innerText = state.monthlyPayment;
    this._handleDisplayResultsState(state.displayResult);
  }
}
