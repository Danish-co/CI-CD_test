const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { add, subtract, multiply, divide } = require('../src/calculator');

describe('calculator', () => {
  describe('add', () => {
    it('adds two positive numbers', () => {
      assert.equal(add(2, 3), 5);
    });

    it('adds negative numbers', () => {
      assert.equal(add(-2, -3), -5);
    });
  });

  describe('subtract', () => {
    it('subtracts two numbers', () => {
      assert.equal(subtract(10, 4), 6);
    });

    it('handles a negative result', () => {
      assert.equal(subtract(3, 8), -5);
    });
  });

  describe('multiply', () => {
    it('multiplies two numbers', () => {
      assert.equal(multiply(4, 5), 20);
    });

    it('multiplies by zero', () => {
      assert.equal(multiply(7, 0), 0);
    });
  });

  describe('divide', () => {
    it('divides two numbers', () => {
      assert.equal(divide(20, 4), 5);
    });

    it('throws when dividing by zero', () => {
      assert.throws(() => divide(10, 0), {
        message: 'Cannot divide by zero',
      });
    });
  });
});
