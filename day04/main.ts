import fs from "node:fs";

const day = 'day04';
const filePath = './' + day + '.txt';
let totalRemovableRolls = 0;

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');

    const rollsRows: string[][] = file.split(/\r\n/).map(row => row.split(''));
    countAccessibleRolls(rollsRows, 0, true);

    console.log(totalRemovableRolls);
}

function countAccessibleRolls(rollsRows: string[][], accessibleRolls: number, firstEntry: boolean): any {
    
    totalRemovableRolls += accessibleRolls;
    let removableRolls = 0;

    if (!firstEntry && accessibleRolls == 0) {
        return totalRemovableRolls
    }

    rollsRows.forEach((row, indexRow) => {
        row.forEach((roll, indexRoll) => {
            if (roll == '@') {
                removableRolls += checkAccess(roll, indexRoll, row, indexRow, rollsRows);
            }
        });
    });

    rollsRows.forEach((row, indexRow) => {
        row.forEach((roll, indexRoll) => {
            if (roll == 'x') {
                rollsRows[indexRow][indexRoll] = '.';
            }
        });
    });

    countAccessibleRolls(rollsRows, removableRolls, false);
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
    if (rollsRows[indexRow - 1] && rollsRows[indexRow - 1][indexRoll - 1] && (rollsRows[indexRow - 1][indexRoll - 1] == '@' || rollsRows[indexRow - 1][indexRoll - 1] == 'x')) {
        adjacentRolls++
    }

    // - @ -
    // - x -
    // - - -
    if (rollsRows[indexRow - 1] && rollsRows[indexRow - 1][indexRoll] && (rollsRows[indexRow - 1][indexRoll] == '@' || rollsRows[indexRow - 1][indexRoll] == 'x')) {
        adjacentRolls++
    }

    // - - @
    // - x -
    // - - -
    if (rollsRows[indexRow - 1] && rollsRows[indexRow - 1][indexRoll + 1] && (rollsRows[indexRow - 1][indexRoll + 1] == '@' || rollsRows[indexRow - 1][indexRoll + 1] == 'x')) {
        adjacentRolls++
    }

    // - - -
    // @ x -
    // - - -
    if (row[indexRoll - 1] && (row[indexRoll - 1] == '@' || row[indexRoll - 1] == 'x')) {
        adjacentRolls++
    }

    // - - -
    // - x @
    // - - -
    if (row[indexRoll + 1] && (row[indexRoll + 1] == '@' || row[indexRoll + 1] == 'x')) {
        adjacentRolls++
    }

    // - - -
    // - x -
    // @ - -
    if (rollsRows[indexRow + 1] && rollsRows[indexRow + 1][indexRoll - 1] && (rollsRows[indexRow + 1][indexRoll - 1] == '@' || rollsRows[indexRow + 1][indexRoll - 1] == 'x')) {
        adjacentRolls++
    }

    // - - -
    // - x -
    // - @ -
    if (rollsRows[indexRow + 1] && rollsRows[indexRow + 1][indexRoll] && (rollsRows[indexRow + 1][indexRoll] == '@' || rollsRows[indexRow + 1][indexRoll] == 'x')) {
        adjacentRolls++
    }

    // - - -
    // - x -
    // - - @
    if (rollsRows[indexRow + 1] && rollsRows[indexRow + 1][indexRoll + 1] && (rollsRows[indexRow + 1][indexRoll + 1] == '@' || rollsRows[indexRow + 1][indexRoll + 1] == 'x')) {
        adjacentRolls++
    }

    if (adjacentRolls < 4) {
        rollsRows[indexRow][indexRoll] = 'x';
        return true
    }
    return false
}