const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    PRESALES_ADDRESS = process.env.PRESALES_ADDRESS

    const Presales = await ethers.getContractFactory("Presales")
    const presales = await Presales.attach(PRESALES_ADDRESS)
    await presales.setStarted(true)
    console.log("SUCCESS: Presales -> setStarted true")


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});