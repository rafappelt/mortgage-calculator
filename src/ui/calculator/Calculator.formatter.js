import Formatter from '../common/Formatter';

export default class CalculatorFormatter extends Formatter {
  formatYearsOfMortgage(value) {
    return value.toString();
  }

  formatInterestRate(value) {
    return value.toString();
  }

  formatLoanAmount(value) {
    return Formatter.formatCurrency(value, 0, 2, '');
  }

  formatAnnualTax(value) {
    return Formatter.formatCurrency(value, 0, 2, '');
  }

  formatAnnualInsurance(value) {
    return Formatter.formatCurrency(value, 0, 2, '');
  }
}
