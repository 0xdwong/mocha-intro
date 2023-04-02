const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity, MockProvider } = require("ethereum-waffle");
use(solidity);
const provider = new MockProvider();


async function revertBlock(snapshotId) {
    await ethers.provider.send("evm_revert", [snapshotId]);
    const newSnapshotId = await ethers.provider.send("evm_snapshot");
    return newSnapshotId;
}

describe("MyErc20", async () => {
    let myErc20;
    let accounts, owner;
    const name = 'MyERc20';
    const symbol = 'M20';
    let snapshotId;

    before(async () => {
        const MyErc20 = await ethers.getContractFactory('MyErc20');
        myErc20 = await MyErc20.deploy(name, symbol);
        await myErc20.deployed();

        accounts = await ethers.getSigners();
        owner = accounts[0];

        snapshotId = await ethers.provider.send("evm_snapshot");
    })

    afterEach(async () => {
        snapshotId = await revertBlock(snapshotId);
    });

    it("name", async () => {
        expect(await myErc20.name()).to.equal(name);
    });

    it("symbol", async () => {
        expect(await myErc20.symbol()).to.equal(symbol);
    });

    it("init token balance should be 10000", async () => {
        expect(await myErc20.balanceOf(owner.address)).to.equal(ethers.utils.parseUnits('10000', 18));

        // const balance = await myErc20.balanceOf(owner.address);
        // expect(balance.toString()).to.equal('10000000000000000000000');
    });

    describe('transfer', () => {
        it("should revert when exceed balance", async () => {
            const fromWallet = owner;
            const toWallet = provider.createEmptyWallet();
            const amount = ethers.utils.parseUnits('10010', 18);

            await expect(
                myErc20.connect(fromWallet).transfer(toWallet.address, amount)
            ).to.be.revertedWith('ERC20: transfer amount exceeds balance');
        });

        it("should emit Transfer event", async () => {
            const fromWallet = owner;
            const toWallet = provider.createEmptyWallet();
            const amount = ethers.utils.parseUnits('100', 18);

            await expect(
                myErc20.connect(fromWallet).transfer(toWallet.address, amount)
            ).to.emit(myErc20, 'Transfer')
                .withArgs(fromWallet.address, toWallet.address, amount);
        });

        it('Both should change token balance', async () => {
            const fromWallet = owner;
            const toWallet = provider.createEmptyWallet();
            const amount = ethers.utils.parseUnits('10000', 18);

            await expect(
                () => myErc20.connect(fromWallet).transfer(toWallet.address, amount)
            ).to.changeTokenBalances(myErc20, [fromWallet, toWallet], [amount.mul(-1), amount]);
        })

        it('Both should change token balance2', async () => {
            const fromWallet = owner;
            const toWallet = provider.createEmptyWallet();
            const amount = ethers.utils.parseUnits('10000', 18);

            // 转账前
            const fromBalanceBefore = await myErc20.balanceOf(fromWallet.address);
            const toBalanceBefore = await myErc20.balanceOf(toWallet.address);

            expect(fromBalanceBefore).to.equal(amount);
            expect(toBalanceBefore).to.equal(0);

            // 转账
            await myErc20.connect(fromWallet).transfer(toWallet.address, amount);

            // 转账后
            const fromBalanceAfter = await myErc20.balanceOf(fromWallet.address);
            const toBalanceAfter = await myErc20.balanceOf(toWallet.address);

            expect(fromBalanceAfter).to.equal(0);
            expect(toBalanceAfter).to.equal(amount);
        })
    })
});