import Amount from './Amount';

export default class Envelope {
  static overLimit(envelope) {
    return envelope.limit !== null && envelope.limit < envelope.balance
      ? Amount.prettyFormat(envelope.balance - envelope.limit)
      : '-';
  }
}
