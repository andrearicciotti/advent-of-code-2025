export class Dial {
    constructor(initNum, finalNum, startNum) {
        this.initNum = initNum;
        this.finalNum = finalNum;
        this.currentNum = startNum;
        this.dialNumbers = [];
        this.rotationQuantity = [];
        this.rotationDirection = [];
        this.zeroCounter = 0;
    }

    setDialNumbers() {
        const totNumbers = this.finalNum - this.initNum;
        this.dialNumbers = [];

        for (let i = 0; i <= totNumbers; i++) {
            this.dialNumbers.push(i);
        }
    }

    setRotations(rules) {

    }
}

export default Dial;