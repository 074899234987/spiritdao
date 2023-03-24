     
     // bsc testnet
     // Arbitrum router 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506
     // WETH 0x7c8964D08Cc1433E0343ebd77d940F4FBb686dc3

     //MEMO

     1) npx hardhat run deploy/deployTimeERC20.js --network bsc_testnet - done
     0x1E44eb56F4C3B56e1BE5F9a4B31B6bfE93B18Fdc
     https://testnet.bscscan.com/address/0x1E44eb56F4C3B56e1BE5F9a4B31B6bfE93B18Fdc#code

     2) npx hardhat run deploy/deployMemoriesERC20.js --network bsc_testnet- done
     0xc8B3501448AE888f5c90e5010155B6E4118FeC6b
     https://testnet.bscscan.com/address/0xc8B3501448AE888f5c90e5010155B6E4118FeC6b#code

     //StandingBondingCalculator (Time address)
     3) npx hardhat run deploy/deployTimeBondingCalculator.js --network bsc_testnet - done
     0xFb0F2ac009C62343B54E052C72e6477Ff83815dE
     https://testnet.bscscan.com/address/0xFb0F2ac009C62343B54E052C72e6477Ff83815dE#code

     //Treasury (MEMO Address, BNB address, )
     // Time Address : 0x1E44eb56F4C3B56e1BE5F9a4B31B6bfE93B18Fdc
     // DAI Address : 0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867
     4) npx hardhat run deploy/deployTreasury.js --network bsc_testnet - done
     0x6059570506f9CAA8b29AA277F4B5aC7F2c954a8B
     https://testnet.bscscan.com/address/0x6059570506f9CAA8b29AA277F4B5aC7F2c954a8B#code

     5) ERC20Tempo (TimesERC20) ----> setVault(Treasury address) - done

     //TimeStackingStaking(Time address, Memories address, 28800, 0, block.timestamp(ofLaunch) + 28800) deployment
     6) npx hardhat run deploy/deployStaking.js --network bsc_testnet - done
     0x5b21175B9bEc8A880EF168D0FebfCBA01aEBd65f
     https://testnet.bscscan.com/address/0x5b21175B9bEc8A880EF168D0FebfCBA01aEBd65f#code
     
     7) sTempoERC20 (Memories) -----> initialaze(staking address) - done

     //StackingWarmup
     8) npx hardhat run deploy/deployStakingWarmup.js --network bsc_testnet // StakingWarmup(Staking address, sTempo address) deployment - done
     0x058F56D8FB6E769095F1286a2F3A6698e4f94E9f
     https://testnet.bscscan.com/address/0x058F56D8FB6E769095F1286a2F3A6698e4f94E9f#code
     
     //StakingDistributor(Treasury address, ERC20Tempo address, 28800, block.timestamp(ofLaunch) + 28800) deployment
     9) npx hardhat run deploy/deployStakingDistributor.js --network bsc_testnet 
     0xCBf00d632378Efc0fA53d5B2Aeb54f50aA0bf1C8
     https://testnet.bscscan.com/address/0xCBf00d632378Efc0fA53d5B2Aeb54f50aA0bf1C8#code

     10) StakingDistributor ----> addRecipient(Staking address, 5000); - done
     11) Staking ------> SetContract(0, StakingDistributor address) - done
     12) Staking ------> SetContract(1, StakingWarmup address) - done

     //StakingHelper(ERC20Tempo address, Staking address) deployment
     13) npx hardhat run deploy/deployStakingHelper.js --network bsc_testnet 
     0x1DF56c227830BeeCb0c0Eb38f6553Df932e98fce
     https://testnet.bscscan.com/address/0x1DF56c227830BeeCb0c0Eb38f6553Df932e98fce#code

     //ETHTimeBondDepository(MEMO address, Wavax address, Treasury address, multisigWallet address,0x0A77230d17318075983913bC2145DB16C7366156) deployment
     // MultiSig wallet 0x913E084B2C5463033f36c7aE51BF1F8C3d43BfdF
     14) npx hardhat run deploy/deployEthBondDepository.js --network bsc_testnet 

     15) ETHTimeBondDepository ----> initializeBondTerms(5, 17000, 1000, 1000000000000000000000000, 0,432000)

     16) ETHTimeBondDepository ----> setStaking(stakingHelper address, 1)

     //TempoBondDepository(TEMPOERC20 address, MIM address, Treasury address, multisigWallet address, 0) deployment
     17) npx hardhat run deploy/deployBondDepository.js --network bsc_testnet

     18) TempoBondDepository ----> initializeBondTerms(5, 8000, 1000, 10000, 1000000000000000000000000, 0,432000)

     19) TempoBondDepository ----> setStaking(stakingHelper address, 1)

     //LPTempoBondDepository(TEMPOERC20 address, JoePair address, Treasury address, multisigWallet address, bondCalculator address) deployment
     20) npx hardhat run deploy/deployLPBondDepository.js --network bsc_testnet

     npx hardhat verify --network bsc_testnet 

     

     
     npx hardhat run scripts/deploy.js --network goerli
     

     npx hardhat verify --network goerli <address> <unlock time>