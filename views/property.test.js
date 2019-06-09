const propertyView = require('./property');

const QUALIFIED_PROPERTY = {
  fullHomeRent: 3732,
  renterRent: 2887,
  airbnbIncome: [1905, 2448, 3036, 3251, 3177, 2549, 1527, 1117, 1145, 1155, 1172, 1973],
}

const NOT_QUALIFIED_PROPERTY = {
  fullHomeRent: 10000,
  renterRent: 6000,
  airbnbIncome: [1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000],
}

describe('getOffer', () => {

  describe('for qualified properties', () => {
    it('returns the correct offer amount', () => {
      expect(propertyView.getOffer(QUALIFIED_PROPERTY)).toBe(3935);
    });
  });

  describe('for not qualified properties', () => {
    it('returns 0', () => {
      expect(propertyView.getOffer(NOT_QUALIFIED_PROPERTY)).toBe(0);
    });
  });
});
