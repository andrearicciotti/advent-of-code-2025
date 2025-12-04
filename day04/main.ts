import fs from "node:fs";

const day = 'day04';
const filePath = './' + day + '.txt';

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');

    const rollsRows: string[][] = file.split(/\r\n/).map(row => row.split(''));
    let accessibleRolls = 0;

    rollsRows.forEach((row, indexRow) => {
        row.forEach((roll, indexRoll) => {
            if (roll == '@') {
                accessibleRolls += checkAccess(roll, indexRoll, row, indexRow, rollsRows);
            }
        });
    });

    console.log(accessibleRolls);
}

function checkAccess(roll: string, indexRoll: number, row: string[], indexRow: number, rollsRows: string[][]): number {
    if (checkAdjacent(roll, indexRoll, row, indexRow, rollsRows)) {
        return 1
    }
    return 0
}

function checkAdjacent(roll: string, indexRoll: number, row: string[], indexRow: number, rollsRows: string[][]): boolean {
    let adjacentRolls = 0;

    // @ - -
    // - x -
    // - - -
    if (rollsRows[indexRow - 1] && rollsRows[indexRow - 1][indexRoll - 1] && rollsRows[indexRow - 1][indexRoll - 1] == '@') {
        adjacentRolls++
    }

    // - @ -
    // - x -
    // - - -
    if (rollsRows[indexRow - 1] && rollsRows[indexRow - 1][indexRoll] && rollsRows[indexRow - 1][indexRoll] == '@') {
        adjacentRolls++
    }

    // - - @
    // - x -
    // - - -
    if (rollsRows[indexRow - 1] && rollsRows[indexRow - 1][indexRoll + 1] && rollsRows[indexRow - 1][indexRoll + 1] == '@') {
        adjacentRolls++
    }

    // - - -
    // @ x -
    // - - -
    if (row[indexRoll - 1] && row[indexRoll - 1] == '@') {
        adjacentRolls++
    }

    // - - -
    // - x @
    // - - -
    if (row[indexRoll + 1] && row[indexRoll + 1] == '@') {
        adjacentRolls++
    }

    // - - -
    // - x -
    // @ - -
    if (rollsRows[indexRow + 1] && rollsRows[indexRow + 1][indexRoll - 1] && rollsRows[indexRow + 1][indexRoll - 1] == '@') {
        adjacentRolls++
    }

    // - - -
    // - x -
    // - @ -
    if (rollsRows[indexRow + 1] && rollsRows[indexRow + 1][indexRoll] && rollsRows[indexRow + 1][indexRoll] == '@') {
        adjacentRolls++
    }

    // - - -
    // - x -
    // - - @
    if (rollsRows[indexRow + 1] && rollsRows[indexRow + 1][indexRoll + 1] && rollsRows[indexRow + 1][indexRoll + 1] == '@') {
        adjacentRolls++
    }
    
    if (adjacentRolls < 4) {
        return true
    }
    return false
}