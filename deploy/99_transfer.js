const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    OWNER_ADDRESS = process.env.OWNER_ADDRESS
    TO_ADDRESS = "XXX"

    const OHM_ADDRESS = process.env.TIME_ADDRESS

    const amt = ethers.BigNumber.from("10000000000000")
    const OHM = await ethers.getContractFactory("ABC")
    const ohm = await OHM.attach(OHM_ADDRESS)
    balance = await ohm.balanceOf(OWNER_ADDRESS)
    console.log(`Owner balance: ${balance}`)
    await ohm.transfer(TO_ADDRESS, amt)
    console.log(`SUCCESS: OWNER -> Transfer ${TO_ADDRESS}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});