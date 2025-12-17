import fs from "node:fs";

const day = 'day07';
const filePath = './' + day + '.txt';

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');
    const aFile = file.split(/\r\n/);

    const matrix = aFile.map(row => row.split(''));
    const x = matrix[0].indexOf('S');
    const y = 0;

    const totalSplit = tachionRay(x, y, matrix, 0);
    console.log(totalSplit);
}

function tachionRay(x: number, y: number, matrix: string[][], totalSplit: number): number {

    if (y >= matrix.length) {
        console.log("baseCase", totalSplit);
        console.log(matrix.map(row => row.join('')).join('\r\n'));
        
        return totalSplit
    }

    const curElem = matrix[y][x];


    switch (curElem) {
        case '^':
            let hasSplitted = false;
            if (matrix[y][x + 1] != '|') {

                matrix[y][x + 1] = '|';
                totalSplit = tachionRay(x + 1, y, matrix, totalSplit);
                hasSplitted = true;
            }

            if (matrix[y][x - 1] != '|') {

                matrix[y][x - 1] = '|';
                totalSplit = tachionRay(x - 1, y, matrix, totalSplit);
                hasSplitted = true;
            }
            
            if(hasSplitted) {
                totalSplit++;
            }

            break;

        case '.':
            matrix[y][x] = '|';
            totalSplit = tachionRay(x, y + 1, matrix, totalSplit);

            break;

        default:
            totalSplit = tachionRay(x, y + 1, matrix, totalSplit);

            break;

    }

    return totalSplit
}