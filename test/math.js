const { expect } = require("chai");
const MyMath = require("../math");


describe("math", () => {
    it("1 plus 1 should return 2", () => {
        const myMath = new MyMath();
        const result = myMath.plus(1, 1);
        expect(result).to.equal(2);
    })

    describe("divide()", () => {
        it("divide 0 should throw error", () => {
            const myMath = new MyMath();

            expect(
                myMath.divide.bind(myMath, 1, 0)
                // myMath.divide(1,0)
            ).to.throw('Dividend cannot be 0');
        });

        it("8 divide 2 should return 4", () => {
            const myMath = new MyMath();
            const result = myMath.divide(8, 2);
            expect(result).to.equal(4);
        });
    })

    // it("somethingTakesLongTime", async (done) => {
    //     const myMath = new MyMath();
    //     const result = await myMath.somethingTakesLongTime();
    //     expect(result).to.be.true;
    // });
})