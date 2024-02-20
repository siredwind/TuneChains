const { ethers } = require("hardhat")
const hre = require("hardhat")

const TOKEN_ADDRESS = "0x874BEca71eeE63447dc4080908385df338c2e723"
const MC_ADDRESS = "0xEEd485157DAE99b4c9FEeaE86c9f499C7a9E67FA"

async function main() {
    await hre.run("verify:verify", {
        address: TOKEN_ADDRESS,
        constructorArguments: [],
    })

    await hre.run("verify:verify", {
        address: MC_ADDRESS,
        constructorArguments: [TOKEN_ADDRESS],
    })
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
