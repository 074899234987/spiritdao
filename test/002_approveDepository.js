// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    const DAO_ADDRESS = "0xD4e3Fd8b1638017d130Ee13Eb5Ea4Fd2CE9A9A8f"
    const MEMO_ADDRESS = "0xE23A7cCE97997956E440dD4F9AeEAAb042cA9770"
    const TIME_ADDRESS = "0xaBb6e9F9aC92966D49e90a6631720a4A799B0a53"
    const MIM_ADDRESS = "0xf16d3E16967594F66C9f7BC2Cd7f50E7194534bA"
    const STAKING_ADDRESS = "0x8690D1400fA4E9BB6ecA51433Ab56652cC2d8324"
    const STAKING_HELPER_ADDRESS = "0xE375e7832067662b295f57565220b1916995Cb1a"
    const TIME_BONDING_CALC_ADDRESS = "0x7730F2C8C0506a5148405B7ba78478c7f657cCC6"
    const TREASURY_ADDRESS = "0xB18Ec7BC8c87ac303Ba7236F0D14139B81501b08"
    const DISTRIBUTOR = "0xE8c526940b5a7a90948c2C7Cc5412698189eB799"
    const TIME_BOND_DEPOSITORY = "0xf4481F456C86BA146d23b8404018231239f8BEFF"
    const ETH_BOND_DEPOSITORY = "0xc31477d6A53685425EDB295695Fa92abd011365D"

    const WETH_ADDRESS = "0x9Fe47b9A7bd54765FE97Cd789635cc998390bE3d"
    const FACTORY_ADDRESS = "0xaBb6e9F9aC92966D49e90a6631720a4A799B0a53"
    const ROUTER_ADDRESS = "0x5Cd1B204136e3aa7AA59e3e07E4e9FEb7bA49dBc"

    const amtSBR = ethers.BigNumber.from("115792089237316195423570985008687907853269984665640564039457584007913129639935")
    const amtMIM = ethers.BigNumber.from("115792089237316195423570985008687907853269984665640564039457584007913129639935")
    const amtETH = ethers.BigNumber.from("115792089237316195423570985008687907853269984665640564039457584007913129639935")


    const DAI = await ethers.getContractFactory("DAI")
    const dai = await DAI.attach(MIM_ADDRESS)
    await dai.approve(TIME_BOND_DEPOSITORY, amtMIM)
    console.log("DAI -> approve -> TIME_BOND_DEPOSITORY")
    await dai.approve(ETH_BOND_DEPOSITORY, amtMIM)
    console.log("DAI -> approve -> ETH_BOND_DESPOSITORY")

    const WETH = await ethers.getContractFactory("WETH9")
    const weth = await WETH.attach(WETH_ADDRESS)
    await weth.approve(TIME_BOND_DEPOSITORY, amtETH)
    console.log("ETH -> approve TIME_BOND_DEPOSITORY")
    await weth.approve(ETH_BOND_DEPOSITORY, amtETH)
    console.log("ETH -> approve ETH_BOND_DESPOSITORY")



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});