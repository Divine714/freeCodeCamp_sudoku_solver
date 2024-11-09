const numPool = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let startingString = ""
// regex for only digits and period
const filter = /^[1-9.]+$/;
const checkStartingValues = () => {
    return filter.test(startingString);
}
let startingArray = startingString.split("");

const checkLength = () => {
    return startingArray.length === 81;
};

const rowArray = (count) => {
    let array = [];
    while (array.length < 9) {
        array.push(startingArray[count]);
        count++;
    }
    return {array, count};
}

const checkString = () => {
  if (checkLength() === false) {
    return { error: 'Expected puzzle to be 81 characters long' }
  } else if (checkStartingValues() === false) {
    return { error: 'Invalid characters in puzzle' }
  } else if (!startingString) {
    return { error: 'Required field(s) missing' }
  } else {
    return "Valid"
  }
}

const columnArray = (count, columnCount) => {
    let array = [];
    if (columnCount < 9) {
        count = 0;
        while (array.length < 9) {
            array.push(startingArray[columnCount + (count * 9)]);
            count++;
        }
        columnCount++;
    }
    return {array, columnCount};
}
const gridArray = (count, gridCount, separateCount) => {
    let array = [];
    count = 0;
    if (separateCount <= 3) {
        if(separateCount === 3) {
            separateCount = 0;
            gridCount = gridCount + 18;
        }
        while (array.length < 9) {
            array.push(startingArray[gridCount + (count * 9)]);
            array.push(startingArray[gridCount + (count * 9) + 1]);
            array.push(startingArray[gridCount + (count * 9) + 2]);
            count++;
        }
        separateCount++;
        gridCount = gridCount + 3;
        return {array, gridCount, separateCount};
    }


}
let rowObj = [
    [], [], [],
    [], [], [],
    [], [], []
];

let columnObj = [
    [], [], [],
    [], [], [],
    [], [], []
];

let gridObj = [
    [], [], [],
    [], [], [],
    [], [], []
];

const createArrays = () => {
    checkString();
    if(checkLength() && checkStartingValues()) {
        let count = 0;
        rowObj = rowObj.map((key, value) => {
            key = rowArray(count).array;
            count = rowArray(count).count;
            return key
        });

        count = 0;
        let columnCount = 0;
        columnObj = columnObj.map((key, value) => {
            key = columnArray(count, columnCount).array;
            columnCount = columnArray(count, columnCount).columnCount;
            return key;
        })

        count = 0;
        let gridCount = 0;
        let separateCount = 0;
        gridObj = gridObj.map((key, value) => {
            key = gridArray(count, gridCount, separateCount).array;
            gridCount = gridArray(count, gridCount, separateCount).gridCount;
            separateCount = gridArray(count, gridCount, separateCount).separateCount;
            return key
        })
        return {
            rowObj: rowObj,
            columnObj: columnObj,
            gridObj: gridObj,
        }
    } 
}

let arraySet = createArrays();

const assign = () => {
    let count = 0;
    let count2 = () =>{
        return count/9 < 1 ? count : count % 9
    }
    let count3 = () => {
        if ( count < 27) {
            return Math.floor(count/ 3) - (Math.floor(count / 9) * 3)
        } else if (count >= 27 && count < 54) {
            return Math.floor(count / 3) - (Math.floor(count / 27) * 6) - (Math.floor((count - 27) / 9) * 3)
        }  else if (count >= 54) {
            return Math.floor(count / 3) - (Math.floor(count / 27) * 6) - (Math.floor((count - 54) / 9) * 3)
        }
    }
    let array = [];
    array = startingArray.map((key, value) => {
        let i = Math.floor(count/9);
        let j = count2();
        let k = count3();
        key = [i, j, k];
        count++
        return key;
    })
    return array
}
let index = assign();

const possibleAnswers = () => {
    let count = 0;
    let array = []
    startingArray.map((key, value) => {

        if (startingArray[count].includes(".")) {
            numPool.map((key, value) => {
                if (arraySet.rowObj[index[count][0]].includes(`${key}`) || arraySet.columnObj[index[count][1]].includes(`${key}`) || arraySet.gridObj[index[count][2]].includes(`${key}`)) {
                    return;
                } else {
                    if(array.length > 0 && array[array.length-1][0] === count){
                        array[array.length-1].push(key)
                    } else
                    array.push([count, key])
                    return array
                }
            })
            count++
        } else {
            count++
        }
    })
    return array
}
let answerPool = possibleAnswers();
let workingArray = startingArray
const check = () => {
    let count = 0;
    while(answerPool.length > 0) {
        if (answerPool[count].length === 2) {
            workingArray.splice(answerPool[count][0], 1, answerPool[count][1].toString());
            arraySet = createArrays();
            answerPool = possibleAnswers();
            count = 0;
        } else {
            count ++
        }
    }

    let answerString = workingArray.join("")
    return answerString
}

const inputFilter = {
    a1: 0, a2: 1, a3: 2, a4: 3, a5: 4, a6: 5, a7: 6, a8: 7, a9: 8,
    b1: 9, b2: 10, b3: 11, b4: 12, b5: 13, b6: 14, b7: 15, b8: 16, b9: 17,
    c1: 18, c2: 19, c3: 20, c4: 21, c5: 22, c6: 23, c7: 24, c8: 25, c9: 26,
    d1: 27, d2: 28, d3: 29, d4: 30, d5: 31, d6: 32, d7: 33, d8: 34, d9: 35,
    e1: 36, e2: 37, e3: 38, e4: 39, e5: 40, e6: 41, e7: 42, e8: 43, e9: 44,
    f1: 45, f2: 46, f3: 47, f4: 48, f5: 49, f6: 50, f7: 51, f8: 52, f9: 53,
    g1: 54, g2: 55, g3: 56, g4: 57, g5: 58, g6: 59, g7: 60, g8: 61, g9: 62,
    h1: 63, h2: 64, h3: 65, h4: 66, h5: 67, h6: 68, h7: 69, h8: 70, h9: 71,
    i1: 72, i2: 73, i3: 74, i4: 75, i5: 76, i6: 77, i7: 78, i8: 79, i9: 80
};



class SudokuSolver {

  validate(puzzleString) {
    startingString = puzzleString;
    startingArray = startingString.split("");
    return checkString();
  }

  checkRowPlacement(puzzleString, coordinate, value) {
    startingString = puzzleString;
    startingArray = startingString.split("");
    let arraySet = createArrays();
    let index = assign();

    if (inputFilter[coordinate] === undefined) {
        return 'Invalid coordinate'
    }
    let row = arraySet.rowObj[index[inputFilter[coordinate]][0]]
    if (row.includes(value) && value !== startingArray[inputFilter[coordinate]]) {
        return false
    } else {
        return true
    }
  }

  checkColPlacement(puzzleString, coordinate, value) {
    startingString = puzzleString;
    startingArray = startingString.split("");
    let arraySet = createArrays();
    let index = assign();


    if (inputFilter[coordinate] === undefined) {
        return 'Invalid coordinate'
    }
    let col = arraySet.columnObj[index[inputFilter[coordinate]][1]]
    if (col.includes(value) && value !== startingArray[inputFilter[coordinate]]) {
        return false
    } else {
        return true
    }
  }

  checkRegionPlacement(puzzleString, coordinate, value) {
    startingString = puzzleString;
    startingArray = startingString.split("");
    let arraySet = createArrays();
    let index = assign();

    if (inputFilter[coordinate] === undefined) {
        return 'Invalid coordinate'
    }
    let region = arraySet.gridObj[index[inputFilter[coordinate]][2]]
    if (region.includes(value) && value !== startingArray[inputFilter[coordinate]]) {
        return false
    } else {
        return true
    }
  }

  solve(puzzleString) {
    startingString = puzzleString;
    startingArray = startingString.split("");
   
    let arraySet = createArrays();
    let index = assign();
    const possibleAnswers = () => {
        let count = 0;
        let array = []
        startingArray.map((key, value) => {
    
            if (startingArray[count].includes(".")) {
                numPool.map((key, value) => {
                    if (arraySet.rowObj[index[count][0]].includes(`${key}`) || arraySet.columnObj[index[count][1]].includes(`${key}`) || arraySet.gridObj[index[count][2]].includes(`${key}`)) {
                        return;
                    } else {
                        if(array.length > 0 && array[array.length-1][0] === count){
                            array[array.length-1].push(key)
                        } else
                        array.push([count, key])
                        return array
                    }
                })
                count++
            } else {
                count++
            }
        })
        return array
    }
    let answerPool = possibleAnswers();
    let workingArray = startingArray;
    const check = () => {
        let count = 0;
        while(answerPool.length > 0) {
            if (answerPool[count].length === 2) {
                workingArray.splice(answerPool[count][0], 1, answerPool[count][1].toString());
                arraySet = createArrays();
                answerPool = possibleAnswers();
                count = 0;
            } else {
                count ++
            }
        }
    
        let answerString = workingArray.join("")
        return answerString
    }
    let solution = check()
    if (solution.includes(".")) {
        return "Puzzle cannot be solved"
    } else {
        return solution
    }
    
  }
}

module.exports = SudokuSolver;

