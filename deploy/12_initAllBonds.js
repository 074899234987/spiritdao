const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    const ABC_BOND_DEPOSITORY = process.env.TIME_BOND_DEPOSITORY
    const LP_BOND_DEPOSITORY = process.env.LP_BOND_DEPOSITORY

    const controlVariable = 5;
    const minimumPrice = 1100;
    const maxPayout = 1000;
    const fee = 10000;
    const maxDebt = ethers.BigNumber.from("1000000000000000000000000");
    const initialDebt = 0;
    const vestingTerm = 432000;


    const BondDepository = await ethers.getContractFactory("ABCBondDepository")
    const bondDepository = await BondDepository.attach(ABC_BOND_DEPOSITORY)
    await bondDepository.initializeBondTerms(controlVariable, minimumPrice, maxPayout, fee, maxDebt, initialDebt, vestingTerm)
    console.log(`SUCCESS: BondDepository -> initializeBondterms`)

    // minimumPrice = 100;
    const LPBondDepository = await ethers.getContractFactory("LPBondDepository")
    const lpbondDepository = await LPBondDepository.attach(LP_BOND_DEPOSITORY)
    await lpbondDepository.initializeBondTerms(controlVariable, 100, maxPayout, fee, maxDebt, initialDebt, vestingTerm)
    console.log(`SUCCESS: LPBondDepository -> initializeBondterms`)

    await bondDepository.setBondTerms(4, 2100)
    console.log("SUCCESS: LPBondDepository -> setBondTerms")
    await lpbondDepository.setBondTerms(4, 200)
    console.log("SUCCESS: LPBondDepository -> setBondTerms")
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});