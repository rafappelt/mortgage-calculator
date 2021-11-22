import Mortgage from '../../core/mortgage/mortgage';
import Formatter from '../common/Formatter';
import Presenter from '../common/Presenter';
import CalculatorFormatter from './Calculator.formatter';
import { initialCalculatorState } from './Calculator.state';
import CalculatorValidator from './Calculator.validator';

export default class CalculatorPresenter extends Presenter {
  #formatter = new CalculatorFormatter();
  #validator = new CalculatorValidator();

  constructor() {
    super(initialCalculatorState);
  }

  set yearsOfMortgage(yearsOfMortgage) {
    yearsOfMortgage = this._ensureValidYearsOfMortagage(yearsOfMortgage);
    this._changeState({
      ...this._state,
      yearsOfMortgage,
      ...this._clearError(),
    });
  }

  _ensureValidYearsOfMortagage(yearsOfMortgage) {
    yearsOfMortgage = parseInt(yearsOfMortgage);
    if (typeof yearsOfMortgage !== 'number' || isNaN(yearsOfMortgage)) {
      yearsOfMortgage = this.state.yearsOfMortgageMin;
    }
    yearsOfMortgage = Math.max(this.state.yearsOfMortgageMin, yearsOfMortgage);
    yearsOfMortgage = Math.min(this.state.yearsOfMortgageMax, yearsOfMortgage);
    yearsOfMortgage = this.#formatter.formatYearsOfMortgage(yearsOfMortgage);
    return yearsOfMortgage;
  }

  set interestRate(interestRate) {
    interestRate = this._ensureValidInterestRate(interestRate);

    this._changeState({
      ...this._state,
      interestRate,
      ...this._clearError(),
    });
  }

  _ensureValidInterestRate(interestRate) {
    interestRate = Formatter.parseDecimal(interestRate);
    if (typeof interestRate !== 'number' || isNaN(interestRate)) {
      interestRate = this.state.interestRateMin;
    }
    interestRate = Math.max(this.state.interestRateMin, interestRate);
    interestRate = Math.min(this.state.interestRateMax, interestRate);
    interestRate = this.#formatter.formatInterestRate(interestRate);
    return interestRate;
  }

  set loanAmount(loanAmount) {
    loanAmount = this.#formatter.formatLoanAmount(loanAmount);
    this._changeState({
      ...this._state,
      loanAmount,
      ...this._clearError(),
    });
  }

  set annualTax(annualTax) {
    annualTax = this.#formatter.formatAnnualTax(annualTax);
    this._changeState({
      ...this._state,
      annualTax,
      ...this._clearError(),
    });
  }

  set annualInsurance(annualInsurance) {
    annualInsurance = this.#formatter.formatAnnualInsurance(annualInsurance);
    this._changeState({
      ...this._state,
      annualInsurance,
      ...this._clearError(),
    });
  }

  _validate() {
    return {
      yearsOfMortgageError: this.#validator.validateYearsOfMortgage(this._state.yearsOfMortgage),
      interestRateError: this.#validator.validateInterestRate(this._state.interestRate),
      loanAmountError: this.#validator.validateLoanAmount(this._state.loanAmount),
      annualTaxError: this.#validator.validateAnnualTax(this._state.annualTax),
      annualInsuranceError: this.#validator.validateAnnualInsurance(this._state.annualInsurance),
    };
  }

  _clearError() {
    return {
      yearsOfMortgageError: '',
      interestRateError: '',
      loanAmountError: '',
      annualTaxError: '',
      annualInsuranceError: '',
    };
  }

  _buildMortgage() {
    return new Mortgage(
      Formatter.parseDecimal(this._state.yearsOfMortgage),
      Formatter.parseDecimal(this._state.interestRate),
      Formatter.parseDecimal(this._state.loanAmount),
      Formatter.parseDecimal(this._state.annualTax),
      Formatter.parseDecimal(this._state.annualInsurance)
    );
  }

  _buildResult() {
    const mortgage = this._buildMortgage();
    return {
      displayResult: true,
      principalAndInterest: Formatter.formatCurrency(mortgage.principalAndInterest),
      tax: Formatter.formatCurrency(mortgage.tax),
      insurance: Formatter.formatCurrency(mortgage.insurance),
      monthlyPayment: Formatter.formatCurrency(mortgage.monthlyPayment),
    };
  }

  _buildEmptyResult() {
    return {
      displayResult: false,
      principalAndInterest: Formatter.formatCurrency(0),
      tax: Formatter.formatCurrency(0),
      insurance: Formatter.formatCurrency(0),
      monthlyPayment: Formatter.formatCurrency(0),
    };
  }

  handleCalculateButtonPressed() {
    const errorMessages = this._validate();
    const hasError = Object.values(errorMessages).some((e) => e);
    const result = hasError ? this._buildEmptyResult() : this._buildResult();

    this._changeState({
      ...this._state,
      ...errorMessages,
      ...result,
    });
  }
}
