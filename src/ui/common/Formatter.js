export default class Formatter {
  static formatCurrency(
    number,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    emptyString = '$ - -'
  ) {
    if (typeof number === 'string') {
      number = Formatter.parseDecimal(number);
    }

    if (!number) {
      return emptyString;
    }

    return (
      '$ ' +
      number.toLocaleString('en-US', {
        style: 'decimal',
        minimumFractionDigits,
        maximumFractionDigits,
      })
    );
  }

  static parseDecimal(value) {
    if (!value) {
      return undefined;
    }

    if (typeof value === 'number') {
      return value;
    }

    if (typeof value !== 'string') {
      throw Error(`Invalid parameter. String required. Type found: ${typeof value}`);
    }

    return Number(value.replace(/[^0-9\.-]+/g, ''));
  }
}
