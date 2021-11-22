export default class Mortgage {
  #yearsOfMortgage = 0;
  #interestRate = 0;
  #loanAmount = 0;
  #annualTax = 0;
  #annualInsurance = 0;

  constructor(yearsOfMortgage, interestRate, loanAmount, annualTax, annualInsurance) {
    this.yearsOfMortgage = yearsOfMortgage;
    this.interestRate = interestRate;
    this.loanAmount = loanAmount;
    this.annualTax = annualTax;
    this.annualInsurance = annualInsurance;
  }

  get yearsOfMortgage() {
    return this.#yearsOfMortgage;
  }

  set yearsOfMortgage(yearsOfMortgage) {
    this.#yearsOfMortgage = yearsOfMortgage;
  }

  get interestRate() {
    return this.#interestRate;
  }

  set interestRate(interestRate) {
    this.#interestRate = interestRate;
  }

  get loanAmount() {
    return this.#loanAmount;
  }

  set loanAmount(loanAmount) {
    this.#loanAmount = loanAmount;
  }

  get annualTax() {
    return this.#annualTax;
  }

  set annualTax(annualTax) {
    this.#annualTax = annualTax;
  }

  get tax() {
    return this.annualTax / 12;
  }

  get annualInsurance() {
    return this.#annualInsurance;
  }

  set annualInsurance(annualInsurance) {
    this.#annualInsurance = annualInsurance;
  }

  get insurance() {
    return this.annualInsurance / 12;
  }

  get principalAndInterest() {
    return (
      ((this.interestRate / 100 / 12) * this.loanAmount) /
      (1 - (1 + this.interestRate / 100 / 12) ** (-this.yearsOfMortgage * 12))
    );
  }

  get monthlyPayment() {
    return this.principalAndInterest + this.tax + this.insurance;
  }
}
