export class Dial {
    constructor(initNum, finalNum, startNum) {
        this.initNum = initNum;
        this.finalNum = finalNum;
        this.curPosition = startNum;
        this.rotationQuantity = [];
        this.rotationDirection = [];
        this.zeroCounter = 0;
    }

    setRotations(rules) {
        rules.forEach(rule => {
            this.rotationDirection.push(rule.slice(0, 1));
            this.rotationQuantity.push(parseInt(rule.slice(1)));
        });
    }

    countZeros() {
        const topLimit = 99;
        const lowLimit = 0;

        for (let i = 0; i < this.rotationDirection.length; i++) {

            console.log(this.rotationDirection[i], this.rotationQuantity[i]);
            switch (this.rotationDirection[i]) {
                
                case 'R':
                    for (let j = 1; j <= this.rotationQuantity[i]; j++) {
                        if (this.curPosition != topLimit) {
                            this.curPosition++;
                        } else {
                            this.curPosition = 0;
                        }

                        this.curPosition == 0 ? this.zeroCounter++ : '';

                    }

                    break;

                case 'L':
                    for (let j = 1; j <= this.rotationQuantity[i]; j++) {
                        if (this.curPosition != lowLimit) {
                            this.curPosition--;
                        } else {
                            this.curPosition = 99;
                        }
                        
                        this.curPosition == 0 ? this.zeroCounter++ : '';

                    }

                    break;

                default:
                    break;
            }
        }
    }
}

export default Dial;