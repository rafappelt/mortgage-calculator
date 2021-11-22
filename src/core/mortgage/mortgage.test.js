import Mortgage from './mortgage';

const mortgage = new Mortgage(30, 1.8, 400000, 1000, 300);

test('Principle & Interest', () => {
  expect(mortgage.principalAndInterest).toBeCloseTo(1438.79);
});

test('Tax', () => {
  expect(mortgage.tax).toBeCloseTo(83.33);
});

test('Insurance', () => {
  expect(mortgage.insurance).toBeCloseTo(25);
});

test('Total Monthly Payment', () => {
  expect(mortgage.monthlyPayment).toBeCloseTo(1547.13);
});
