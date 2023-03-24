const { ethers } = require("hardhat");
require('dotenv').config();

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

async function main() {

    const OWNER_ADDRESS = process.env.OWNER_ADDRESS

    const OHM_ADDRESS = process.env.TIME_ADDRESS
    const USDC_ADDRESS = process.env.USDC_ADDRESS
    const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS
    const WAVAX_ADDRESS = process.env.WAVAX_ADDRESS

    const ROUTER_ADDRESS = process.env.JOE_ROUTER_ADDRESS

    const currentBlock = await ethers.provider.getBlockNumber();
    const blockTimestamp = (await ethers.provider.getBlock(currentBlock)).timestamp;

    const options = { value: ethers.BigNumber.from("10000000000000000") }
    const amount = ethers.BigNumber.from("1000000000000000000")
    const Router = await ethers.getContractFactory("JoeRouter02");
    const router = await Router.attach(ROUTER_ADDRESS)
    await router.swapAVAXForExactTokens(amount, [WAVAX_ADDRESS, USDC_ADDRESS], OWNER_ADDRESS, blockTimestamp + 60 * 2, options)
    console.log("SUCCESS: Router -> swap for 1 USDC")

    const USDC = await ethers.getContractFactory("TestnetERC20")
    const usdc = USDC.attach(USDC_ADDRESS)

    const profit = await ethers.BigNumber.from("1000000000")
    const Treasury = await ethers.getContractFactory("ABCTreasury");
    const treasury = await Treasury.attach(TREASURY_ADDRESS)

    await treasury.deposit(amount, USDC_ADDRESS, profit)
    console.log("SUCCESS: Treasury -> deposit")
}

main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
