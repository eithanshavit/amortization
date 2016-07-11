var expect = require('chai').expect;
var amortization = require('../../amortization');
describe('amortizationSchedule', function() {
  var fn;

  before(function() {
   fn = amortization.amortizationSchedule;
  });

  describe('principal', function() {

    it('should be positive', function() {
      expect(function() {fn(-1, 1, 1);}).to.throw(RangeError, "principal must be positive");
    });

    it('should be a number', function() {
      expect(function() {fn("text", 1, 1);}).to.throw(TypeError, "principal must be a number");
    });

  });

  describe('yearsDuration', function() {

    it('should be positive', function() {
      expect(function() {fn(1, -1, 1);}).to.throw(RangeError, "yearsDuration must be positive");
    });

    it('should be an integer', function() {
      expect(function() {fn(1, 1.2, 1);}).to.throw(TypeError, "yearsDuration must be a and integer");
    });

  });

  describe('yearlyRate', function() {

    it('should be positive', function() {
      expect(function() {fn(1, 1, -1);}).to.throw(RangeError, "yearlyRate must be positive");
    });

    it('should be a number', function() {
      expect(function() {fn(1, 1, "text");}).to.throw(TypeError, "yearlyRate must be a number");
    });

  });

  describe('result', function() {

    it('should return an array', function() {
      expect(fn(10000, 5, 5)).to.be.instanceof(Array);
    });

  });

});

describe('yearlyAmortizationSchedule', function() {
  var fn;

  before(function() {
   fn = amortization.yearlyAmortizationSchedule;
  });

  describe('principal', function() {

    it('should be positive', function() {
      expect(function() {fn(-1, 1, 1);}).to.throw(RangeError, "principal must be positive");
    });

    it('should be a number', function() {
      expect(function() {fn("text", 1, 1);}).to.throw(TypeError, "principal must be a number");
    });

  });

  describe('yearsDuration', function() {

    it('should be positive', function() {
      expect(function() {fn(1, -1, 1);}).to.throw(RangeError, "yearsDuration must be positive");
    });

    it('should be an integer', function() {
      expect(function() {fn(1, 1.2, 1);}).to.throw(TypeError, "yearsDuration must be a and integer");
    });

  });

  describe('yearlyRate', function() {

    it('should be positive', function() {
      expect(function() {fn(1, 1, -1);}).to.throw(RangeError, "yearlyRate must be positive");
    });

    it('should be a number', function() {
      expect(function() {fn(1, 1, "text");}).to.throw(TypeError, "yearlyRate must be a number");
    });

  });

  describe('result', function() {

    it('should return an array', function() {
      expect(fn(10000, 5, 5)).to.be.instanceof(Array);
    });

  });

});
