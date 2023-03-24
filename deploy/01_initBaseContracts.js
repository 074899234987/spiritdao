const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    const OWNER_ADDRESS = process.env.OWNER_ADDRESS

    const DAO_ADDRESS = process.env.DAO_ADDRESS
    const SOHM_ADDRESS = process.env.MEMO_ADDRESS
    const OHM_ADDRESS = process.env.TIME_ADDRESS
    const WAVAX_ADDRESS = process.env.WAVAX_ADDRESS
    const STAKING_ADDRESS = process.env.STAKING_ADDRESS
    const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS
    const STAKING_WARMUP_ADDRESS = process.env.STAKING_WARMUP_ADDRESS
    const DISTRIBUTOR_ADDRESS = process.env.DISTRIBUTOR

    const amount = ethers.BigNumber.from("1000000000000000000000000")
    const OHM = await ethers.getContractFactory("ABC");
    const ohm = await OHM.attach(OHM_ADDRESS)
    await ohm.setVault(TREASURY_ADDRESS)
    console.log("SUCCESS: ABC > setVault Treasury")

    const _index = ethers.BigNumber.from("5000000000")
    const SOhm = await ethers.getContractFactory("sABC");
    const sOhm = await SOhm.attach(SOHM_ADDRESS)
    await sOhm.initialize(STAKING_ADDRESS)
    console.log("SUCCESS: sABC -> initialize")
    await sOhm.setIndex(_index)
    console.log("SUCCESS: sABC -> setIndex")

    const Staking = await ethers.getContractFactory("Staking")
    const staking = await Staking.attach(STAKING_ADDRESS)
    await staking.setContract(0, DISTRIBUTOR_ADDRESS)
    console.log("SUCCESS: Staking > setContract DISTRIBUTOR")
    await staking.setContract(1, STAKING_WARMUP_ADDRESS)
    console.log("SUCCESS: Staking > setContract STAKING WARMUP")


    const rewardRate = ethers.BigNumber.from("13000")
    const Distributor = await ethers.getContractFactory("Distributor")
    const distributor = await Distributor.attach(DISTRIBUTOR_ADDRESS)
    await distributor.addRecipient(STAKING_ADDRESS, rewardRate)
    console.log(`SUCCESS: Distributor > addRecipient ${STAKING_ADDRESS}`)

    //enum MANAGING { RESERVEDEPOSITOR, RESERVESPENDER, RESERVETOKEN, RESERVEMANAGER, LIQUIDITYDEPOSITOR, LIQUIDITYTOKEN, LIQUIDITYMANAGER, DEBTOR, REWARDMANAGER, TOMB }

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

    await treasury.queue(REWARDMANAGER, DISTRIBUTOR_ADDRESS)
    console.log(`SUCCESS: Treasury -> queue REWARDMANAGER (8) ${DISTRIBUTOR_ADDRESS}`)
    await treasury.toggle(REWARDMANAGER, DISTRIBUTOR_ADDRESS, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle REWARDMANAGER (8) ${DISTRIBUTOR_ADDRESS}`)

    await treasury.queue(RESERVETOKEN, WAVAX_ADDRESS)
    console.log(`SUCCESS: Treasury -> queue RESERVETOKEN (2) ${WAVAX_ADDRESS}`)
    await treasury.toggle(RESERVETOKEN, WAVAX_ADDRESS, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle RESERVETOKEN (2) ${WAVAX_ADDRESS}`)

    await treasury.queue(RESERVEMANAGER, DAO_ADDRESS)
    console.log(`SUCCESS: Treasury -> queue RESERVEMANAGER (3) ${DAO_ADDRESS}`)
    await treasury.toggle(RESERVEMANAGER, DAO_ADDRESS, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle RESERVEMANAGER (3) ${DAO_ADDRESS}`)

    await treasury.queue(RESERVEDEPOSITOR, DAO_ADDRESS)
    console.log(`SUCCESS: Treasury -> queue RESERVEDEPOSITOR (0) ${DAO_ADDRESS}`)
    await treasury.toggle(RESERVEDEPOSITOR, DAO_ADDRESS, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle RESERVEDEPOSITOR (0) ${DAO_ADDRESS}`)

    await treasury.queue(LIQUIDITYDEPOSITOR, DAO_ADDRESS)
    console.log(`SUCCESS: Treasury -> queue LIQUIDITYDEPOSITOR (4) ${DAO_ADDRESS}`)
    await treasury.toggle(LIQUIDITYDEPOSITOR, DAO_ADDRESS, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle LIQUIDITYDEPOSITOR (4) ${DAO_ADDRESS}`)

    await treasury.queue(LIQUIDITYDEPOSITOR, OWNER_ADDRESS)
    console.log(`SUCCESS: Treasury -> queue LIQUIDITYTOKEN (4) ${OWNER_ADDRESS}`)
    await treasury.toggle(LIQUIDITYDEPOSITOR, OWNER_ADDRESS, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle LIQUIDITYTOKEN (4) ${OWNER_ADDRESS}`)

    await treasury.queue(RESERVEDEPOSITOR, OWNER_ADDRESS)
    console.log(`SUCCESS: Treasury -> queue RESERVEDEPOSITOR (0) ${OWNER_ADDRESS}`)
    await treasury.toggle(RESERVEDEPOSITOR, OWNER_ADDRESS, "0x0000000000000000000000000000000000000000")
    console.log(`SUCCESS: Treasury -> toggle RESERVEDEPOSITOR (0) ${OWNER_ADDRESS}`)
}

main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
