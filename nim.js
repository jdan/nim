/**
 * A game of Nim
 * Jordan Scales <scalesjordan@gmail.com>
 * 1 Mar 2014
 */

/**
 * Constructor for a new game of Nim
 *
 * Accepts piles with coin counts as an argument, for instance:
 *   new Nim([1, 2, 3])
 * creates a game of Nim with 3 piles with 1, 2, and 3 respectively
 */
function Nim(piles) {
  this.piles = piles;
  this.turn = 0;

  this.winner = null;
}

/**
 * A move involves taking an amount from a particular pile
 * i.e. game.move(1, 5) - will take 5 from the first pile
 *
 * The return value is -1 if an error occured
 * - pile index is invalid
 * - not enough items in the pile
 */
Nim.prototype.move = function (pile, amount) {
  pile = +pile;
  amount = +amount;

  if (!pile || !amount) {
    return -1;
  } else if (pile < 1 || pile - 1 >= this.piles.length) {
    return -1;
  } else if (amount <= 0 || amount > this.piles[pile - 1]) {
    return -1;
  }

  this.piles[pile - 1] -= amount;

  // Check for a win
  var i, broke;
  for (i = 0, broke = false; i < this.piles.length; i++) {
    if (this.piles[i] > 0) {
      broke = true;
      break;
    }
  }

  if (!broke) {
    this.winner = this.turn;
  }

  this.turn = +!+this.turn;
  return 0;
};

Nim.prototype.toString = function () {
  return this.piles.join(' ');
};

module.exports = Nim;
