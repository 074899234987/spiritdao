const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    const OHM_ADDRESS = process.env.TIME_ADDRESS
    const USDC_ADDRESS = process.env.USDC_ADDRESS
    const FACTORY_ADDRESS = process.env.JOE_FACTORY_ADDRESS

    WALLETX = process.env.WALLETX_ADDRESS

    const Factory = await ethers.getContractFactory("JoeFactory")
    const factory = await Factory.attach(FACTORY_ADDRESS)
    await factory.createPair(OHM_ADDRESS, USDC_ADDRESS)
    console.log(`SUCCESS: Factory -> createPair RESERVESPENDER (0)`)

    console.log(`CHECK PAIR ADDRESS on address ${FACTORY_ADDRESS}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});