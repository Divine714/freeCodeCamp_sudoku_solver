const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

const validPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
const invalidPuzzle = "#.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
console.log(solver.validate(invalidPuzzle))
suite('UnitTests', () => {
  suite("Validate puzzle string", () => {
    test("handles a valid puzzle string of 81 characters", (done) => {
      assert.equal(solver.validate(validPuzzle), "Valid");
      done();
    });
    test("handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      let invalidStr = '#.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let test = solver.validate(invalidStr)
      assert.isObject(test, { error: "Invalid characters in puzzle" });
    });
    test("handles a puzzle string that is not 81 characters in length", () => {
        let invalidStr = '.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        let test = solver.validate(invalidStr)
        assert.isObject(test, { error: 'Expected puzzle to be 81 characters long' });
    });
  });

  suite("Validates placement", () => {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    test("handles valid row placement", () => {
      let test = solver.checkRowPlacement(puzzleString, "a1", "7");
      assert.isTrue(test);
    });
    test("handles an invalid row placement", () => {
      let test = solver.checkRowPlacement(puzzleString, "a1", "9");
      assert.isFalse(test);
    })
    test("handles valid column placement", () => {
      let test = solver.checkColPlacement(puzzleString, "a1", "7");
      assert.isTrue(test);
    });
    test("handles an invalid column placement", () => {
      let test = solver.checkColPlacement(puzzleString, "a1", "4");
      assert.isFalse(test);
    });
    test("handles a valid region (3x3 grid) placement", () => {
      let test = solver.checkRegionPlacement(puzzleString, "a1", "7");
      assert.isTrue(test);
    })
    test("handles a invalid region (3x3 grid) placement", () => {
      let test = solver.checkRegionPlacement(puzzleString, "a1", "3");
      assert.isFalse(test);
    })
  });

  suite("Solver", () => {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    test("Valid puzzle strings pass the solver", () => {
      let test = solver.solve(puzzleString);
      assert.equal(test, "769235418851496372432178956174569283395842761628713549283657194516924837947381625")
    })
    test("Invalid puzzle strings pass the solver", () => {
        let invalidString = '4.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
        let test = solver.solve(invalidString);
        assert.equal(test, "Puzzle cannot be solved")
    })
    test("returns the the expected solution for an incomplete puzzzle", () => {
        let test = solver.solve(puzzleString);
        assert.equal(test, "769235418851496372432178956174569283395842761628713549283657194516924837947381625")
    })
  })
});
