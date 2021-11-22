import Formatter from '../common/Formatter';
import Validator from '../common/Validator';

export default class CalculatorValidator extends Validator {
  validateYearsOfMortgage(value) {
    return this.validateMandatoyField(value);
  }

  validateInterestRate(value) {
    return this.validateMandatoyField(value);
  }

  validateLoanAmount(value) {
    return this.validateMandatoyField(Formatter.parseDecimal(value));
  }

  validateAnnualTax(value) {
    return this.validateMandatoyField(Formatter.parseDecimal(value));
  }

  validateAnnualInsurance(value) {
    return this.validateMandatoyField(Formatter.parseDecimal(value));
  }
}
