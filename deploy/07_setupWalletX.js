const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS
    const WALLETX = process.env.WALLETX_ADDRESS

    const RESERVESPENDER = ethers.BigNumber.from("0")
    const LIQUIDITYTOKEN = ethers.BigNumber.from("4")

    const Treasury = await ethers.getContractFactory("ABCTreasury")
    const treasury = await Treasury.attach(TREASURY_ADDRESS)
    await treasury.queue(RESERVESPENDER, WALLETX)
    console.log(`SUCCESS: Treasury -> queue RESERVESPENDER (0) ${WALLETX}`)
    await treasury.toggle(RESERVESPENDER, bondDepository.address, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle RESERVESPENDER (0) ${WALLETX}`)
    await treasury.queue(LIQUIDITYTOKEN, WALLETX)
    console.log(`SUCCESS: Treasury -> queue LIQUIDITYTOKEN (4) ${WALLETX}`)
    await treasury.toggle(LIQUIDITYTOKEN, bondDepository.address, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle LIQUIDITYTOKEN (4) ${WALLETX}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});