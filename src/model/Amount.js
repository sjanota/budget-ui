import * as math from 'mathjs';

export default class Amount {
  static parse(string) {
    if (string === null || string === '') {
      return null;
    }
    const number = math.evaluate(string.replace(/,/g, '.'));
    return Math.round(number * 100);
  }

  static isValid(string) {
    if (string === null || string === '') {
      return true;
    }

    try {
      math.parse(string.replace(/,/g, '.'));
      return true;
    } catch (e) {
      return false;
    }
  }

  static zero() {
    return 0;
  }

  static format(amount, kSeparator = true) {
    if (amount === null) {
      return null;
    }

    const fixed = (amount / 100).toFixed(2);
    if (!kSeparator) {
      return fixed;
    }
    var parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }

  static prettyFormat(amount) {
    if (amount === null) return '-';
    return Amount.format(amount, true);
  }
}
