const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
    const STAKING_ADDRESS = process.env.STAKING_ADDRESS

    const Staking = await ethers.getContractFactory("Staking")
    const staking = await Staking.attach(STAKING_ADDRESS)
    await staking.rebase()
    console.log(`SUCCESS: Staking -> Rebase()`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});