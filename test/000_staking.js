// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require('dotenv').config();

async function main() {

    DAO_ADDRESS = process.env.DAO_ADDRESS
    MEMO_ADDRESS = process.env.MEMO_ADDRESS
    TIME_ADDRESS = process.env.TIME_ADDRESS
    MIM_ADDRESS = process.env.MIM_ADDRESS
    STAKING_ADDRESS = process.env.STAKING_ADDRESS
    STAKING_HELPER_ADDRESS = process.env.STAKING_HELPER_ADDRESS
    TIME_BONDING_CALC_ADDRESS = process.env.TIME_BONDING_CALC_ADDRESS
    TREASURY_ADDRESS = process.env.TREASURY_ADDRESS
    ZAPIN_ADDRESS = process.env.ZAPIN_ADDRESS
    DISTRIBUTOR = process.env.DISTRIBUTOR
    TIME_BOND_DEPOSITORY = process.env.TIME_BOND_DEPOSITORY
    ETH_BOND_DEPOSITORY = process.env.ETH_BOND_DEPOSITORY

    WETH_ADDRESS = process.env.WETH_ADDRESS
    FACTORY_ADDRESS = process.env.FACTORY_ADDRESS
    ROUTER_ADDRESS = process.env.ROUTER_ADDRESS

    OWNER_ADDRESS = "0xE638640a7fA730169b7b7FbbFf14C667264A7EE3"

    const amount = ethers.BigNumber.from("10000000000") // 1 Token

    const OHM = await ethers.getContractFactory("SnowbearToken")
    const ohm = await OHM.attach(TIME_ADDRESS)
    await ohm.approve(STAKING_HELPER_ADDRESS, amount)
    console.log("SNOWBEAR -> approve 1 Token")

    const STAKINGHELPER = await ethers.getContractFactory("StakingHelper")
    const stakingHelper = await STAKINGHELPER.attach(STAKING_HELPER_ADDRESS)
    await stakingHelper.stake(amount, OWNER_ADDRESS)
    console.log("STAKING HELPER -> stake 1 Token")



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});