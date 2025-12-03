import fs from "node:fs";

const day = 'day03';
const filePath = './' + day + '.txt';

main();

function main() {
    const file = fs.readFileSync(filePath, 'utf8');

    const banks = file.split(/\r?\n/);
    const combinations = [];
    let totJoltage = 0;

    for (let i = 0; i < banks.length; i++) {
        const curBank = banks[i].split('');

        let keepJoule = 0;
        let firstPos = 0;
        let curCombination = '';

        for (let j = 0; j < curBank.length; j++) {
            const curElem = parseInt(curBank[j]);

            if (j < curBank.length - 1 && curElem > keepJoule) {
                keepJoule = curElem;
                firstPos = j;
            }
        }

        curCombination += keepJoule;
        keepJoule = 0;

        for (let k = firstPos + 1; k < curBank.length; k++) {
            const curElem = parseInt(curBank[k]);

            if (curElem > keepJoule) {
                keepJoule = curElem;
            }
        }

        curCombination += keepJoule;
        combinations.push(parseInt(curCombination));
    }

    totJoltage = sumCombinations(combinations);
    console.log(totJoltage, combinations);
    
}

function sumCombinations(combinations) {
    let sum = 0;

    combinations.forEach(combination => {
        sum += combination;
    });

    return sum
}