import fs from "node:fs";

const day = 'day02';
const filePath = './' + day + '.txt';

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');
    let invalidIdsCounter = 0;
    const ranges = file.split(',');

    for (let i = 0; i < ranges.length; i++) {
        const min = parseInt(ranges[i].split('-')[0]);
        const max = parseInt(ranges[i].split('-')[1]);

        for (let j = min; j <= max; j++) {
            invalidIdsCounter += isInvalid(j);
        }
    }

    console.log(invalidIdsCounter);
}

function isInvalid(id) {
    
    const idLength = id.toString().length;
    const maxStringLength = Math.floor(idLength / 2);
    
    for (let i = 1; i <= maxStringLength; i++) {
        const strToMatch = id.toString().slice(0, i);

        const match = id.toString().match(new RegExp(strToMatch, 'g'));
        const strLength = strToMatch.length;

        if (idLength == match.length * strLength) {

            return id
        }
    }

    return 0
}