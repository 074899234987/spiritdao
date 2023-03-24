const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    OWNER_ADDRESS = process.env.OWNER_ADDRESS
    TO_ADDRESS = "0x533c276cae225D08768a20f6f10dDe0595f1E7b2"

    const OHM_ADDRESS = process.env.TIME_ADDRESS
    const sOHM_ADDRESS = process.env.MEMO_ADDRESS
    const STAKING_ADDRESS = process.env.STAKING_ADDRESS


    const OHM = await ethers.getContractFactory("ABC")
    const ohm = await OHM.attach(OHM_ADDRESS)
    balance = await ohm.balanceOf(OWNER_ADDRESS)
    console.log(`Owner ABC balance: ${balance}`)

    const sOHM = await ethers.getContractFactory("sABC")
    const sohm = await sOHM.attach(sOHM_ADDRESS)
    balance = await sohm.balanceOf(OWNER_ADDRESS)
    circ = await sohm.circulatingSupply();
    console.log(`Owner sABCbalance: ${balance}`)
    console.log(`sABC circulating supply ${circ}`)

    const Staking = await ethers.getContractFactory("Staking")
    const staking = Staking.attach(STAKING_ADDRESS)
    epoch = await staking.epoch()
    console.log(`Epoch : ${epoch}`)



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});