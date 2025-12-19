import fs from "node:fs";

const day = 'day09';
const filePath = './' + day + '.txt';
const cache = new Map<string, number>();

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');
    const aFile = file.split(/\r\n/);
    const maxArea = calcMaxArea(aFile);
    console.log(maxArea);
}

function calcMaxArea(positionsArray: string[]): number {
    let maxArea = 0;
    for (let i = 0; i < positionsArray.length; i++) {
        const curCoords = positionsArray[i].split(',');

        for (let j = i + 1; j < positionsArray.length; j++) {
            const comparedCoords = positionsArray[j].split(',');
            maxArea = calcCurArea(curCoords, comparedCoords, i, j) > maxArea ? calcCurArea(curCoords, comparedCoords, i, j) : maxArea;
        }

    }
    return maxArea
}

function calcCurArea(coordsA: string[], coordsB: string[], aPos: number, bPos: number): number {
    const area = (Math.abs(parseInt(coordsA[0]) - parseInt(coordsB[0])) + 1) * (Math.abs(parseInt(coordsA[1]) - parseInt(coordsB[1])) + 1);
    return area
}