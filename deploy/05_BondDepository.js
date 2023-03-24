const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    const DAO_ADDRESS = process.env.DAO_ADDRESS
    const OHM_ADDRESS = process.env.TIME_ADDRESS
    const USDC_ADDRESS = process.env.MIM_ADDRESS
    const STAKING_ADDRESS = process.env.STAKING_ADDRESS
    const BONDING_CALC_ADDRESS = process.env.TIME_BONDING_CALC_ADDRESS
    const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS

    const BondDepository = await ethers.getContractFactory("ABCBondDepository")
    const bondDepository = await BondDepository.deploy(OHM_ADDRESS, USDC_ADDRESS, TREASURY_ADDRESS, DAO_ADDRESS, BONDING_CALC_ADDRESS)
    console.log(`SUCCESS: Deploy -> ABCBondDepository ${bondDepository.address}`)

    await bondDepository.setStaking(STAKING_ADDRESS, false)
    console.log(`SUCCESS: BondDepository -> setStaking ${STAKING_ADDRESS}`)

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
    await treasury.queue(RESERVEDEPOSITOR, bondDepository.address)
    console.log(`SUCCESS: Treasury -> queue RESERVEDEPOSITOR (0) ${bondDepository.address}`)
    await treasury.toggle(RESERVEDEPOSITOR, bondDepository.address, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle RESERVEDEPOSITOR (0) ${bondDepository.address}`)

    console.log("---------------------------------")
    console.log("")
    console.log("COPY THESE ADDRESSES IN .env")
    console.log("")
    console.log(`TIME_BOND_DEPOSITORY = "${bondDepository.address}"`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});