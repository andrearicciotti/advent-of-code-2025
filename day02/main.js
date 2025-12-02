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
    const firstPart = id.toString().slice(idLength / 2);
    const secondPart = id.toString().slice(0, idLength / 2);

    if (firstPart == secondPart) {
        return id
    } else {
        return 0
    }
}