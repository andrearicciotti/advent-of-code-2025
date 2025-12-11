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
        const curRow = aFile[i].split('');
        rows.push(curRow);
    }

    return rows
}

function calcTotal(rows: string[][]): number {
    let curColNumbers = [];

    let total = 0;
    let operator = '';
    let combinationTotal: any = null;

    for (let x = 0; x < rows[0].length; x++) {
        let curColNumber = '';

        for (let y = 0; y < rows.length - 1; y++) {
            // se troviamo un numero lo prendiamo
            if (!Number.isNaN(parseInt(rows[y][x]))) {
                curColNumber += rows[y][x];
            }

            if (x == rows[0].length - 1 && y == rows.length - 2) {
                curColNumbers.push(parseInt(curColNumber));
            }

            // se troviamo un operatore oppure siamo in fondo alla matrice
            if ((rows[rows.length - 1][x] != ' ' && Number.isNaN(parseInt(rows[rows.length - 1][x])) || (x == rows[0].length - 1 && y == rows.length - 2))) {

                // se non è quello iniziale facciamo i calcoli
                if (x != 0) {

                    // facciamo le operazioni sui numeri raccolti e aggiorniamo operatore
                    for (let i = 0; i < curColNumbers.length; i++) {
                        const elem = curColNumbers[i];

                        if (combinationTotal == null) {
                            combinationTotal = elem;
                            continue
                        }

                        if (operator == '+') {
                            combinationTotal += elem;
                        }

                        if (operator == '*') {
                            combinationTotal *= elem;
                        }
                    }

                    total += combinationTotal;
                    combinationTotal = null;
                    curColNumbers = [];
                }

                operator = rows[rows.length - 1][x];
            }

            // se siamo in fondo alla colonna
            if (y == rows.length - 2 && curColNumber != '') {
                curColNumbers.push(parseInt(curColNumber));
            }
        }

    }

    return total
}