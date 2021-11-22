import CalculatorPresenter from './Calculator.presenter';

const presenter = new CalculatorPresenter();

presenter.handleCalculateButtonPressed();
const mandatoryFieldsTest = (state) => {
  test('Loan Amount Required', () => {
    expect(state.loanAmountError).toBe('Mandatory field');
  });
  test('Annual Tax Required', () => {
    expect(state.annualTaxError).toBe('Mandatory field');
  });
  test('Annual Insurance Required', () => {
    expect(state.annualInsuranceError).toBe('Mandatory field');
  });
};
presenter.subscribe(mandatoryFieldsTest);
presenter.unsubscribe(mandatoryFieldsTest);

presenter.loanAmount = '';
presenter.annualTax = ' ';
presenter.annualInsurance = '$ ';
const emptyFormatTest = (state) => {
  test('Loan Amount Empty Format', () => {
    expect(state.loanAmount).toBe('');
  });
  test('Annual Tax Empty Format', () => {
    expect(state.annualTax).toBe('');
  });
  test('Annual Insurance Empty Format', () => {
    expect(state.annualInsurance).toBe('');
  });
};
presenter.subscribe(emptyFormatTest);
presenter.unsubscribe(emptyFormatTest);

presenter.loanAmount = '10000';
presenter.annualTax = '$ 20000.1';
presenter.annualInsurance = ' 30,000.34';
const currencyFormatTest = (state) => {
  test('Loan Amount Format', () => {
    expect(state.loanAmount).toBe('$ 10,000');
  });
  test('Annual Tax Format', () => {
    expect(state.annualTax).toBe('$ 20,000.1');
  });
  test('Annual Insurance Format', () => {
    expect(state.annualInsurance).toBe('$ 30,000.34');
  });
};
presenter.subscribe(currencyFormatTest);
presenter.unsubscribe(currencyFormatTest);

presenter.handleCalculateButtonPressed();
const emptyErrors = (state) => {
  test('Loan Amount with no errors', () => {
    expect(state.loanAmountError).toBe('');
  });
  test('Annual Tax with no errors', () => {
    expect(state.annualTaxError).toBe('');
  });
  test('Annual Insurance with no errors', () => {
    expect(state.annualInsuranceError).toBe('');
  });
};
presenter.subscribe(emptyErrors);
presenter.unsubscribe(emptyErrors);

presenter.yearsOfMortgage = '30';
presenter.interestRate = '1.8';
presenter.loanAmount = '400000';
presenter.annualTax = '1000';
presenter.annualInsurance = '300';
presenter.handleCalculateButtonPressed();
const resultTest = (state) => {
  test('principalAndInterest Result', () => {
    expect(state.principalAndInterest).toBe('$ 1,438.79');
  });
  test('tax Result', () => {
    expect(state.tax).toBe('$ 83.33');
  });
  test('insurance Result', () => {
    expect(state.insurance).toBe('$ 25.00');
  });
  test('monthlyPayment Result', () => {
    expect(state.monthlyPayment).toBe('$ 1,547.13');
  });
};
presenter.subscribe(resultTest);
presenter.unsubscribe(resultTest);
