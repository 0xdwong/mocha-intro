const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity, MockProvider } = require("ethereum-waffle");
use(solidity);
const provider = new MockProvider();

describe("MyError", async () => {
    let instance;
    let accounts, owner;
    const name = 'MyError';

    before(async () => {
        const MyMath = await ethers.getContractFactory('MyMath');
        const mathInstance = await MyMath.deploy();
        await mathInstance.deployed();


        const MyError = await ethers.getContractFactory('MyError');
        instance = await MyError.deploy(mathInstance.address);
        await instance.deployed();

        accounts = await ethers.getSigners();
        owner = accounts[0];
    })

    it("revertWithoutMsg", async () => {
        await expect(
            instance.connect(owner).revertWithoutMsg(1, 0)
        ).to.be.reverted;
    });

    it("revertWithMsg", async () => {
        await expect(
            instance.connect(owner).revertWithMsg(1, 0)
        ).to.be.revertedWith('with msg');
    });

    it.only("testError", async () => {
        await instance.connect(owner).testError();
        const pos = await instance.connect(owner).pos();

        console.log(pos);
        // expect(result).to.equal(1)
    });
});