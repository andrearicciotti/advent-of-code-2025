import fs from "node:fs";

const day = 'day05';
const filePath = './' + day + '.txt';

main();

function main() {
    let totalFreshIngredients = 0;

    const file = fs.readFileSync(filePath, 'utf8');
    const aFile = file.split(/\r\n/);

    const ranges = aFile.filter(file => file.includes('-'));
    const topLimits: number[] = ranges.map(range => parseInt(range.split('-')[1]));
    const bottomLimits: number[] = ranges.map(range => parseInt(range.split('-')[0]));
    const ingredientsId = aFile.filter(file => !file.includes('-') && file != '').map(file => parseInt(file));

    console.log("Ranges: ", ranges, "Bottom: ", bottomLimits, "Top: ", topLimits, "Ids: ", ingredientsId);

    totalFreshIngredients = checkFreshIngredients(ranges, bottomLimits, topLimits, ingredientsId);

    console.log(totalFreshIngredients);

}

function checkFreshIngredients(ranges: string[], bottomLimits: number[], topLimits: number[], ingredientsId: number[]): number {
    let freshIngredients = 0;

    for (let i = 0; i < ingredientsId.length; i++) {
        const curIngredientId = ingredientsId[i];

        for (let j = 0; j < ranges.length; j++) {

            const bottomLimit = bottomLimits[j];
            const topLimit = topLimits[j];

            if (curIngredientId >= bottomLimit && curIngredientId <= topLimit) {
                freshIngredients++;
                break
            }
        }
    }

    return freshIngredients
}