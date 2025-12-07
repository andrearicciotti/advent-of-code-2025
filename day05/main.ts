import fs from "node:fs";

const day = 'day05';
const filePath = './' + day + '.txt';

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');
    const aFile = file.split(/\r\n/);

    const ranges = aFile.filter(file => file.includes('-'));
    const orderedRanges = ranges.sort((a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]));
    const updatedRanges: string[] = updateRanges(orderedRanges);

    const totalFreshIngredients = countFreshIngredients(updatedRanges);

    console.log(totalFreshIngredients);
}

function updateRanges(ranges: string[]): string[] {

    for (let i = ranges.length - 1; i >= 0; i--) {
        const curRange = ranges[i];
        const nextRange = ranges[i - 1];

        if (!nextRange) {
            break
        }

        const curBottom = parseInt(curRange.split('-')[0]);
        const curTop = parseInt(curRange.split('-')[1]);

        const nextBottom = parseInt(nextRange.split('-')[0]);
        const nextTop = parseInt(nextRange.split('-')[1]);

        const update = curBottom <= nextTop;

        if (!update) {
            continue
        }

        ranges[i - 1] = Math.min(curBottom, nextBottom) + '-' + curTop;
        ranges.splice(i, 1);
    }

    return ranges;
}

function countFreshIngredients(ranges: string[]): number {
    let totIngredients = 0;

    ranges.forEach(range => {
        totIngredients += (parseInt(range.split('-')[1]) - parseInt(range.split('-')[0])) + 1;
    });

    return totIngredients
}