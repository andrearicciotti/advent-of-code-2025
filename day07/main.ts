import fs from "node:fs";

const day = 'day07';
const filePath = './' + day + '.txt';
const cache = new Map<string, number>();

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');
    const aFile = file.split(/\r\n/);

    const matrix = aFile.map(row => row.split(''));
    const x = matrix[0].indexOf('S');
    const y = 0;

    const timelines = tachionRay(x, y, matrix);
    console.log(timelines);
}


function tachionRay(x: number, y: number, matrix: string[][]): number {
    let key = x + "-" + y;
    let timelines = 0;

    if (y >= matrix.length) {
        timelines++;
        cache.set(key, timelines);
        return timelines
    }

    const curElem = matrix[y][x];

    if (cache.has(key)) {
        timelines += cache.get(key)!;
        return timelines
    }

    switch (curElem) {
        case '^':

            matrix[y][x + 1] = '|';
            timelines += tachionRay(x + 1, y, matrix);

            matrix[y][x - 1] = '|';
            timelines += tachionRay(x - 1, y, matrix);

            break;

        case '.':
            matrix[y][x] = '|';
            timelines += tachionRay(x, y + 1, matrix);

            break;

        default:
            timelines += tachionRay(x, y + 1, matrix);

            break;

    }

    cache.set(key, timelines);

    return timelines
}