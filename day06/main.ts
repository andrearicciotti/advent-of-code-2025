import fs from "node:fs";

const day = 'day06';
const filePath = './' + day + '.txt';

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');
    const aFile = file.split(/\r\n/);
    const rows = createRows(aFile);
    const total = calcTotal(rows);
    console.log(total);
}

function createRows(aFile: string[]): string[][] {
    const rows = [];

    for (let i = 0; i < aFile.length; i++) {
        const curRow = aFile[i];
        const aRow = curRow.trim().split(/  */);
        rows.push(aRow);
    }

    return rows
}

function calcTotal(rows: string[][]): number {
    let total = 0;

    for (let i = 0; i < rows[0].length; i++) {
        const operator = rows[rows.length - 1][i];
        let curTotal = operator == '*' ? 1 : 0;
        
        for (let j = 0; j < rows.length - 1; j++) {
            const curNumber = parseInt(rows[j][i]);

            if (operator == '*') {
                curTotal *= curNumber;
                continue
            }

            if (operator == '+') {
                curTotal += curNumber;
                continue
            }
            
        }
        
        total += curTotal;
    }

    return total
}