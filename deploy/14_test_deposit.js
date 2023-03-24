const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    const USDC_ADDRESS = process.env.MIM_ADDRESS
    const ABC_BOND_DEPOSITORY = process.env.TIME_BOND_DEPOSITORY
    const OWNER_ADDRESS = process.env.OWNER_ADDRESS

    const maxAmt = ethers.BigNumber.from("1919145145919141451451515194516")
    const USDC = await ethers.getContractFactory("TestnetERC20")
    const usdc = USDC.attach(USDC_ADDRESS)
    await usdc.approve(ABC_BOND_DEPOSITORY, maxAmt)
    console.log("SUCCESS: USDC -> approve ABCBondDepository")

    const amount = ethers.BigNumber.from("150000000000000000000")
    const maxPrice = ethers.BigNumber.from("42000000000000000000")
    const depositor = OWNER_ADDRESS

    const BondDepository = await ethers.getContractFactory("ABCBondDepository")
    const bondDepository = await BondDepository.attach(ABC_BOND_DEPOSITORY)
    await bondDepository.deposit(amount, maxPrice, depositor)
    console.log(`SUCCESS: BondDepository -> deposit`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});