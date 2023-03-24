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

    OWNER_ADDRESS = "0xF42F76029E91E5F7Adc471e26AcbC6a5eA30BDa3"

    const amount = ethers.BigNumber.from("1000000000") // 1 Token

    const ethers = require('ethers');

    // The address of the recipient of the transfer
    // const recipientAddress = '0xd36102dcdd9610cf44f293782fc34dbf694cc46f';

    // The amount of tokens to transfer (in this example, 10,000,000 tokens)
    const tokenAmount = ethers.utils.parseUnits('10000000', 18);

    // The function signature for the `transfer` function in the ERC-20 token standard
    const transfer = 'transfer(address,uint256)';
    const deposit = ''

    // Encode the function call with the recipient address and the amount of tokens to transfer
    const encodedFunctionCall = ethers.utils.defaultAbiCoder.encode(
        ['string', 'address', 'uint256'],
        [functionSignature, TREASURY_ADDRESS, tokenAmount]
    );

    console.log(encodedFunctionCall);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});