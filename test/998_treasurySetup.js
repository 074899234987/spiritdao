// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    DAO_ADDRESS = "0xAE92f9551c23b4aEcc58bd19D890045e63B92F79"
    MEMO_ADDRESS = "0xDB2D42b5c9Dc771097121d9edF86527e2d44AEbc"
    TIME_ADDRESS = "0xB1347B11B4F76FBEefb3396740c0Dd90fC752C05"
    MIM_ADDRESS = "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C"
    STAKING_ADDRESS = "0x6b1759a34fA56b816BA06Bb9c5259A365E813F39"
    STAKING_HELPER_ADDRESS = "0x5877E76907D67316313708123D899227036c8A89"
    TIME_BONDING_CALC_ADDRESS = "0xF05F9D2F504EA65c36790600fc660E680Ae019aE"
    TREASURY_ADDRESS = "0x79e92cc777c8fA5C92FE9E62d5c5d8d10f18cd5f"
    DISTRIBUTOR = "0x810404F8763cA6F103e340D2eb5ab0fe5a49F57a"
    TIME_BOND_DEPOSITORY = "0xF95ea7E076df82f592567B80A2c516832bD91BdA"
    ETH_BOND_DEPOSITORY = "0xCd51FD6Fb91b8F87936F47085dA0B8038FFa8C75"

    const OWNER = "0xF42F76029E91E5F7Adc471e26AcbC6a5eA30BDa3"

    const RESERVESPENDER = ethers.BigNumber.from("0")
    const RESERVETOKEN = ethers.BigNumber.from("1")
    const RESERVEMANAGER = ethers.BigNumber.from("2")
    const LIQUIDITYDEPOSITOR = ethers.BigNumber.from("3")
    const LIQUIDITYTOKEN = ethers.BigNumber.from("4")
    const LIQUIDITYMANAGER = ethers.BigNumber.from("5")
    const DEBTOR = ethers.BigNumber.from("6")
    const REWARDMANAGER = ethers.BigNumber.from("7")
    const SOHM = ethers.BigNumber.from("8")

    const TREASURY = await ethers.getContractFactory("SnowbearTreasury")
    const treasury = await TREASURY.attach(TREASURY_ADDRESS)

    // await treasury.queue(RESERVESPENDER, TIME_BOND_DEPOSITORY)
    // await treasury.toggle(RESERVESPENDER, TIME_BOND_DEPOSITORY, "0x0000000000000000000000000000000000000000")
    // console.log("TREASURY -> queue -> toggle RESERVESPENDER / TIME_BOND_DEPOSITORY")
    // await treasury.queue(SOHM, ETH_BOND_DEPOSITORY)
    // await treasury.toggle(SOHM, ETH_BOND_DEPOSITORY, "0x0000000000000000000000000000000000000000")
    // console.log("TREASURY -> queue -> toggle SOHM / ETH_BOND_DEPOSITORY")
    // await treasury.queue(LIQUIDITYDEPOSITOR, OWNER)
    // await treasury.toggle(LIQUIDITYDEPOSITOR, OWNER, "0x0000000000000000000000000000000000000000")
    // console.log("TREASURY -> queue -> toggle LIQUIDITYDEPOSITOR / OWNER")
    // await treasury.queue(SOHM, DISTRIBUTOR)
    // await treasury.toggle(SOHM, DISTRIBUTOR, "0x0000000000000000000000000000000000000000")
    // console.log("TREASURY -> queue -> toggle SOHM / DISTRIBUTOR")
    // await treasury.queue(RESERVESPENDER, OWNER)
    // await treasury.toggle(RESERVESPENDER, OWNER, "0x0000000000000000000000000000000000000000")
    // console.log("TREASURY -> queue -> toggle RESERVESPENDER / OWNER")
    // await treasury.queue(RESERVESPENDER, DAO_ADDRESS)
    // await treasury.toggle(RESERVESPENDER, DAO_ADDRESS, "0x0000000000000000000000000000000000000000")
    // console.log("TREASURY -> queue -> toggle RESERVESPENDER / DAO_ADDRESS")
    // await treasury.queue(LIQUIDITYTOKEN, OWNER)
    // await treasury.toggle(LIQUIDITYTOKEN, OWNER, "0x0000000000000000000000000000000000000000")
    // console.log("TREASURY -> queue -> toggle LIQUIDITYTOKEN / OWNER")
    await treasury.queue(LIQUIDITYTOKEN, DAO_ADDRESS)
    await treasury.toggle(LIQUIDITYTOKEN, DAO_ADDRESS, "0x0000000000000000000000000000000000000000")
    console.log("TREASURY -> queue -> toggle LIQUIDITYTOKEN / DAO_ADDRESS")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});