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
    const SOHM_ADDRESS = process.env.MEMO_ADDRESS
    const USDC_ADDRESS = process.env.USDC_ADDRESS
    const STAKING_HELPER_ADDRESS = process.env.STAKING_HELPER_ADDRESS
    const STAKING_ADDRESS = process.env.STAKING_ADDRESS
    const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS

    const maxAmt = ethers.BigNumber.from("1919145145919141451451515194516")
    const USDC = await ethers.getContractFactory("TestnetERC20");
    const usdc = await USDC.attach(USDC_ADDRESS)
    await usdc.approve(TREASURY_ADDRESS, maxAmt)
    console.log("SUCCESS: USDC -> approve Treasury")

    const amtDeposit = ethers.BigNumber.from("80000000000000000000")
    const Treasury = await ethers.getContractFactory("ABCTreasury");
    const treasury = await Treasury.attach(TREASURY_ADDRESS)
    await treasury.deposit(amtDeposit, USDC_ADDRESS, 0)
    console.log("SUCCESS: Treasury -> deposit")

    const SOHM = await ethers.getContractFactory("sABC")
    const sOhm = await SOHM.attach(SOHM_ADDRESS)
    await sOhm.approve(STAKING_HELPER_ADDRESS, maxAmt)
    console.log("SUCCESS: sABC -> approve StakingHelper")

    const OHM = await ethers.getContractFactory("ABC")
    const ohm = await OHM.attach(OHM_ADDRESS)
    await ohm.approve(STAKING_HELPER_ADDRESS, maxAmt)
    console.log("SUCCESS: ABC -> approve StakingHelper")


    const StakingHelper = await ethers.getContractFactory("StakingHelper")
    const stakingHelper = await StakingHelper.attach(STAKING_HELPER_ADDRESS)
    await stakingHelper.stake(1000000000, OWNER_ADDRESS)
    console.log("SUCCESS: StakingHelper -> stake")

    const burnAmt = ethers.BigNumber.from("70000000000")

    // await ohm.approve(OHM_ADDRESS, burnAmt)
    // await ohm.burn(burnAmt)
    // console.log("SUCCESS: ABC -> Burn")
}

main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
