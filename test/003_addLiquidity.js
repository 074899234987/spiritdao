// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require('dotenv').config();

async function main() {

    const LP_PAIR_ADDRESS = process.env.LP_PAIR_ADDRESS
    const ROUTER_ADDRESS = process.env.JOE_ROUTER_ADDRESS


    const abcAmount = ethers.utils.parseUnits("15000", 18); // Replace this with the amount of ETH you want to add to the pool
    const usdcAmount = ethers.utils.parseUnits("10000", 18); // R

    const currentBlock = await ethers.provider.getBlockNumber();
    const blockTimestamp = (await ethers.provider.getBlock(currentBlock)).timestamp;

    const options = { value: amtETH }

    const ROUTER = await ethers.getContractFactory("UniswapV2Router02")
    const router = await ROUTER.attach(ROUTER_ADDRESS)

    const liquidity = await router.addLiquidity(TIME_ADDRESS, amtSBR, amtSBR, amtETH, "0xE638640a7fA730169b7b7FbbFf14C667264A7EE3", blockTimestamp + 20, options)
    liquidity.wait()
    console.log("ROUTER -> addLiquidity")



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});