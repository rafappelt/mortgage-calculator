export default class Validator {
  validateMandatoyField(value) {
    if (!value) {
      return 'Mandatory field';
    }

    return '';
  }
}
