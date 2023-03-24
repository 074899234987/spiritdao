const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    const OHM_ADDRESS = process.env.TIME_ADDRESS

    const AOHM = await ethers.getContractFactory("aABC")
    const aOHM = await AOHM.deploy()
    console.log(`SUCCESS: Deploy -> aABC ${aOHM.address}`)

    const Presales = await ethers.getContractFactory("Presales")
    const presales = await Presales.deploy()
    console.log(`SUCCESS: Deploy -> PRESALES_ADDRESS: "${presales.address}"`)

    await presales.initialize(OHM_ADDRESS, aOHM.address)
    console.log("SUCCESS: presales -> init ABC, aABC")

    const amt = ethers.BigNumber.from("400000000000000000000")
    await aOHM.approve(presales.address, amt)
    console.log("SUCCESS: aABC -> approve Presales")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});