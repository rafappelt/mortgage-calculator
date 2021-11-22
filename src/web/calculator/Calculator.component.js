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
    this.innerHTML = html;
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
