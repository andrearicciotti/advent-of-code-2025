import fs from "node:fs";

const day = 'day05';
const filePath = './' + day + '.txt';

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');
    const aFile = file.split(/\r\n/);

    const ranges = aFile.filter(file => file.includes('-'));
    const updatedRanges: string[] = updateRanges(ranges, true, 0);
    
    console.log("Ranges updated: ", updatedRanges);

    const totalFreshIngredients = countFreshIngredients(updatedRanges);

    console.log(totalFreshIngredients);
}

function updateRanges(ranges: string[], firstCall: boolean, rangesUpdated: number): string[] {
    const checkedRanges: string[] = [];

    if (!firstCall && rangesUpdated == 0) {
        return ranges;
    }
    
    rangesUpdated  = 0;

    for (let i = 0; i < ranges.length; i++) {
        const curRange = ranges[i];
        const bottomLimit = parseInt(curRange.split('-')[0]);
        const topLimit = parseInt(curRange.split('-')[1]);

        for (let j = 0; j < checkedRanges.length; j++) {
            const curCheckedRange = checkedRanges[j];

            const checkedBottomLimit = parseInt(curCheckedRange.split('-')[0]);
            const checkedTopLimit = parseInt(curCheckedRange.split('-')[1]);

            const noUpdate = bottomLimit >= checkedBottomLimit && topLimit <= checkedTopLimit; // range interamente compreso - esco
            const updateBottom = bottomLimit < checkedBottomLimit && topLimit >= checkedBottomLimit && topLimit <= checkedTopLimit; // range compreso che estende limite basso - aggiorno limite basso
            const updateTop = topLimit > checkedTopLimit && bottomLimit <= checkedTopLimit && bottomLimit >= checkedBottomLimit; // range compreso che estende limite alto - aggiorno limite alto
            const updateLimits = topLimit > checkedTopLimit && bottomLimit < checkedTopLimit; // range che comprende il vecchio range - aggiorno entrambi i limiti

            
            if (noUpdate) {
                continue
            }
            
            if (updateBottom) {
                checkedRanges[j] = bottomLimit + '-' + checkedTopLimit;
                rangesUpdated ++;
                continue
            }

            if (updateTop) {
                checkedRanges[j] = checkedBottomLimit + '-' + topLimit;
                rangesUpdated ++;
                continue
            }

            if (updateLimits) {
                checkedRanges[j] = bottomLimit + '-' + topLimit;
                rangesUpdated ++;
                continue
            }

            // range nuovo - aggiorno array
            if (j == checkedRanges.length -1) {
                checkedRanges.push(bottomLimit + '-' + topLimit);
            }
        }

        if (checkedRanges.length == 0) {
            // range nuovo - aggiorno array
            checkedRanges.push(bottomLimit + '-' + topLimit);
        }
    }

    return updateRanges(checkedRanges, false, rangesUpdated);
}

function countFreshIngredients(ranges: string[]): number {
    let totIngredients = 0;

    ranges.forEach(range => {
        totIngredients += (parseInt(range.split('-')[1]) - parseInt(range.split('-')[0])) +1;
    });

    return totIngredients
}