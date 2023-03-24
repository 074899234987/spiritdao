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
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account: " + deployer.address);

    const USDC = process.env.USDC_ADDRESS;

    const epochLength = 28800;
    const firstEpochNumber = 1;
    const currentBlock = await ethers.provider.getBlockNumber();
    const blockTimestamp = (await ethers.provider.getBlock(currentBlock)).timestamp;

    // ABC
    const OHM = await ethers.getContractFactory("ABC"); //OK
    const ohm = await OHM.deploy();
    console.log(`SUCCESS: Deploy -> ABC ${ohm.address}`)

    // STAKED ABC
    const SOHM = await ethers.getContractFactory("sABC");
    const sOHM = await SOHM.deploy();
    console.log(`SUCCESS: Deploy -> sABC ${sOHM.address}`)

    // STAKING
    const OlympusStaking = await ethers.getContractFactory("Staking");
    const staking = await OlympusStaking.deploy(
        ohm.address,
        sOHM.address,
        epochLength,
        firstEpochNumber,
        blockTimestamp + epochLength
    );
    console.log(`SUCCESS: Deploy -> Staking ${staking.address}`)

    // STAKING WARMUP
    const StakingWarmup = await ethers.getContractFactory("StakingWarmup");
    const stakingWarmup = await StakingWarmup.deploy(
        staking.address,
        sOHM.address
    );
    console.log(`SUCCESS: Deploy -> StakingWarmup ${stakingWarmup.address}`)

    // BONDING CALCULATOR
    const BondingCalculator = await ethers.getContractFactory("BondingCalculator");
    const bondingCalculator = await BondingCalculator.deploy(ohm.address);
    console.log(`SUCCESS: Deploy -> BondingCalculator ${bondingCalculator.address}`)

    // STAKING HELPER
    const StakingHelper = await ethers.getContractFactory("StakingHelper");
    const stakingHelper = await StakingHelper.deploy(
        staking.address,
        ohm.address
    );
    console.log(`SUCCESS: Deploy -> StakingHelper ${stakingHelper.address}`)

    // TREASURY
    const OlympusTreasury = await ethers.getContractFactory("ABCTreasury");
    const olympusTreasury = await OlympusTreasury.deploy(ohm.address, USDC, 0);
    console.log(`SUCCESS: Deploy -> Treasury ${olympusTreasury.address}`)

    // DISTRIBUTOR
    const Distributor = await ethers.getContractFactory("Distributor");
    const distributor = await Distributor.deploy(
        olympusTreasury.address,
        ohm.address,
        epochLength,
        blockTimestamp + epochLength
    );
    console.log(`SUCCESS: Deploy -> Distributor ${distributor.address}`)
    console.log("---------------------------------")
    console.log("")
    console.log("COPY THESE ADDRESSES IN .env")
    console.log("")
    console.log("---------------------------------")
    console.log(`MEMO_ADDRESS = "${sOHM.address}"`)
    console.log(`TIME_ADDRESS = "${ohm.address}"`)
    console.log(`MIM_ADDRESS = "${USDC}"`)
    console.log(`STAKING_ADDRESS = "${staking.address}"`)
    console.log(`STAKING_HELPER_ADDRESS = "${stakingHelper.address}"`)
    console.log(`TIME_BONDING_CALC_ADDRESS = "${bondingCalculator.address}"`)
    console.log(`TREASURY_ADDRESS = "${olympusTreasury.address}"`)
    console.log(`DISTRIBUTOR = "${distributor.address}"`)
    console.log(`STAKING_WARMUP_ADDRESS = "${stakingWarmup.address}"`)
}

main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
