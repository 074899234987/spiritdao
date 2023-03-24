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

    const ROUTER_ADDRESS = process.env.JOE_ROUTER_ADDRESS

    const currentBlock = await ethers.provider.getBlockNumber();
    const blockTimestamp = (await ethers.provider.getBlock(currentBlock)).timestamp;

    // const mintAmt = ethers.BigNumber.from("1000000000000000000000000")

    const USDC = await ethers.getContractFactory("TestnetERC20")
    const usdc = USDC.attach(USDC_ADDRESS)
    // await usdc.mint(OWNER_ADDRESS, mintAmt)

    const OHM = await ethers.getContractFactory("ABC")
    const ohm = OHM.attach(OHM_ADDRESS)
    // await ohm.setVault(OWNER_ADDRESS)
    // console.log("SUCCESS: ABC -> setVault OWNER_ADDRESS")
    // await ohm.mint(OWNER_ADDRESS, mintAmt)
    // console.log("SUCCESS: ABC -> mint OWNER_ADDRESS")
    // await ohm.setVault(TREASURY_ADDRESS)
    // console.log("SUCCESS: ABC -> setVault TREASURY_ADDRESS")

    const depositAmt = ethers.BigNumber.from("48500000000000000000000")
    const Treasury = await ethers.getContractFactory("ABCTreasury");
    const treasury = await Treasury.attach(TREASURY_ADDRESS)
    await treasury.deposit(depositAmt, USDC_ADDRESS, 0)
    console.log("SUCCESS: Treasury -> deposit")


    const amountADesired = ethers.BigNumber.from("6750000000000")
    const amountBDesired = ethers.BigNumber.from("135000000000000000000000")
    const amountAMin = ethers.BigNumber.from("6750000000000")
    const amountBMin = ethers.BigNumber.from("135000000000000000000000")

    await ohm.approve(ROUTER_ADDRESS, amountADesired)
    console.log("SUCCESS: ABC -> approve")
    await usdc.approve(ROUTER_ADDRESS, amountBDesired)
    console.log("SUCCESS: USD -> approve")

    const Router = await ethers.getContractFactory("JoeRouter02");
    const router = await Router.attach(ROUTER_ADDRESS)
    await router.addLiquidity(OHM_ADDRESS, USDC_ADDRESS, amountADesired, amountBDesired, amountAMin, amountBMin, OWNER_ADDRESS, blockTimestamp + 60 * 2)
    console.log("SUCCESS: JoeRouter -> addLiquidity ABC/USDC")
}

main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
