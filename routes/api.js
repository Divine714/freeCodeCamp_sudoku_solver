'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let { puzzle, coordinate, value } = req.body;
      if(coordinate){
        coordinate = coordinate.toLowerCase();
      }
      let puzzleString = puzzle

      if (!puzzle || !coordinate || !value) {
        res.json({ error: "Required field(s) missing" });
        return;
      }
      if (parseInt(value) < 1 || parseInt(value) > 9 || !parseInt(value)) {
        res.json({ error: 'Invalid value' });
        return;
      }
      if (solver.validate(puzzleString) !== "Valid") {
        res.json(solver.validate(puzzleString))
        return;
      } else {
        if (solver.checkRowPlacement(puzzleString, coordinate, value) === "Invalid coordinate") {
          res.json({ error: 'Invalid coordinate'})
        }
        if (solver.checkRowPlacement(puzzleString, coordinate, value) === true && solver.checkColPlacement(puzzleString, coordinate, value) === true && solver.checkRegionPlacement(puzzleString, coordinate, value) === true) {
        res.json({ valid: true });
        return;
        }
        if(solver.checkRowPlacement(puzzleString, coordinate, value) === false && solver.checkColPlacement(puzzleString, coordinate, value) === false && solver.checkRegionPlacement(puzzleString, coordinate, value) === false) {
          res.json({ valid: false, conflict: ["row", "column", "region"] });
          return
        }
        if(solver.checkRowPlacement(puzzleString, coordinate, value) === false && solver.checkColPlacement(puzzleString, coordinate, value) === false) {
          res.json({ valid: false, conflict: ["row", "column"] });
          return
        }
        if(solver.checkColPlacement(puzzleString, coordinate, value) === false && solver.checkRegionPlacement(puzzleString, coordinate, value) === false) {
          res.json({ valid: false, conflict: ["column", "region"] });
          return
        }
        if(solver.checkRowPlacement(puzzleString, coordinate, value) === false && solver.checkRegionPlacement(puzzleString, coordinate, value) === false) {
          res.json({ valid: false, conflict: ["row", "region"] });
          return
        }
        if(solver.checkRowPlacement(puzzleString, coordinate, value) === false) {
          res.json({ valid: false, conflict: ["row"] });
          return;
        }
        if(solver.checkColPlacement(puzzleString, coordinate, value) === false) {
          res.json({ valid: false, conflict: ["column"] });
          return;
        }
        if(solver.checkRegionPlacement(puzzleString, coordinate, value) === false) {
          res.json({ valid: false, conflict: ["region"] });
          return;
        }
        }
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      let puzzleString = puzzle
      if (!puzzle) {
        return res.json({ error: "Required field missing" });
      }
      if (solver.validate(puzzleString) !== "Valid") {
        res.json(solver.validate(puzzleString))
        return 
      } else {
        if (solver.solve(puzzleString) === "Puzzle cannot be solved") {
        res.json({ error: "Puzzle cannot be solved" });
        return;
      } else {
        res.json({ solution: solver.solve(puzzle)});
        return
      }
      
      }
      
    });
};
