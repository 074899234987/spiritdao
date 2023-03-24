const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    STAKING_ADDRESS = process.env.STAKING_ADDRESS

    const Staking = await ethers.getContractFactory("Staking")
    const staking = await Staking.attach(STAKING_ADDRESS)
    await staking.setWarmup(0)
    console.log("Staking -> setWarmup ")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});