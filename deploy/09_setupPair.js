const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS

    const LP_PAIR_ADDRESS_2 = process.env.LP_PAIR_ADDRESS_2

    const RESERVEDEPOSITOR = ethers.BigNumber.from("0")
    const RESERVESPENDER = ethers.BigNumber.from("1")
    const RESERVETOKEN = ethers.BigNumber.from("2")
    const RESERVEMANAGER = ethers.BigNumber.from("3")
    const LIQUIDITYDEPOSITOR = ethers.BigNumber.from("4")
    const LIQUIDITYTOKEN = ethers.BigNumber.from("5")
    const LIQUIDITYMANAGER = ethers.BigNumber.from("6")
    const DEBTOR = ethers.BigNumber.from("7")
    const REWARDMANAGER = ethers.BigNumber.from("8")
    const TOMB = ethers.BigNumber.from("9")

    const Treasury = await ethers.getContractFactory("ABCTreasury")
    const treasury = await Treasury.attach(TREASURY_ADDRESS)
    await treasury.queue(LIQUIDITYTOKEN, LP_PAIR_ADDRESS_2)
    console.log(`SUCCESS: Treasury -> queue LIQUIDITYTOKEN (5) ${LP_PAIR_ADDRESS_2}`)
    await treasury.toggle(LIQUIDITYTOKEN, LP_PAIR_ADDRESS_2, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle LIQUIDITYTOKEN (5) ${LP_PAIR_ADDRESS_2}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});