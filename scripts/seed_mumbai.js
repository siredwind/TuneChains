// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const config = require("../src/config.json");

const tokens = (n) => {
    return hre.ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
    GATEWAY_PINATA_URL = "https://gateway.pinata.cloud/ipfs/";
    BASE_URI = "QmcqJAkZoXA33PxEeQQrWCTVNgXDjg3S2yXz7xXSUYjiVP/";
    BASE_EXT = ".json";

    // Get Signer
    const privateKey = process.env.REACT_APP_PRIVATE_KEY // fetch PRIVATE_KEY
    const wallet = new hre.ethers.Wallet(privateKey)
    const signer = wallet.connect(new hre.ethers.providers.AlchemyProvider("maticmum", process.env.REACT_APP_MUMBAI_RPC_KEY))

    let transaction;

    console.log(`Fetching token and transferring to accounts... \n`);

    // Fetch deployed token
    const token = (await hre.ethers
        .getContractAt('Token', '0x874BEca71eeE63447dc4080908385df338c2e723'))
       
    token.connect(signer);
    console.log(`Token fetched: ${token.address}\n`);

    // Fetch deployed mc
    const mc = await hre.ethers
        .getContractAt('MusicCrowdfunding', '0xEEd485157DAE99b4c9FEeaE86c9f499C7a9E67FA')
    mc.connect(signer);
    console.log(`MusicCrowdfunding fetched: ${mc.address}\n`);

    const funderBalance = await token.balanceOf(signer.address);
    console.log(`Funder's token balance: ${hre.ethers.utils.formatUnits(funderBalance, 'ether')} \n`);

    // Funder creates a campaign
    transaction = await mc.createCampaign(
        '3 Latino Girls',
        'Campaign created for a raggaeton song released by 3 latino girls.',
        `${GATEWAY_PINATA_URL}${BASE_URI}1${BASE_EXT}`,
        tokens(100),
        300
    );
    await transaction.wait();
    console.log(`Funder created campaign 1. \n`)

    // Funder creates a campaign
    transaction = await mc.createCampaign(
        'Walking Past',
        'Campaign created for a pop song released by an artist walking with headphones and singing.',
        `${GATEWAY_PINATA_URL}${BASE_URI}2${BASE_EXT}`,
        tokens(100),
        300
    );
    await transaction.wait();
    console.log(`Funder created a campaign 2. \n`)

    // Funder creates a campaign
    transaction = await mc.createCampaign(
        'Techno vibes',
        'Campaign created for a dubstep song released by Deadmau.',
        `${GATEWAY_PINATA_URL}${BASE_URI}3${BASE_EXT}`,
        tokens(100),
        300
    );
    await transaction.wait();
    console.log(`Funder created campaign 3. \n`)

    // Funder creates a campaign
    transaction = await mc.createCampaign(
        'Prelude',
        'Campaign created for a classical song released by Yann Tiersen.',
        `${GATEWAY_PINATA_URL}${BASE_URI}4${BASE_EXT}`,
        tokens(100),
        300
    );
    await transaction.wait();
    console.log(`Funder created a campaign 4. \n`)

    // Funder creates a campaign
    transaction = await mc.createCampaign(
        'Sad Goodbye',
        'Campaign created for a pop song released by a new pop star.',
        `${GATEWAY_PINATA_URL}${BASE_URI}5${BASE_EXT}`,
        tokens(100),
        300
    );
    await transaction.wait();
    console.log(`Funder created campaign 5. \n`)

    // Funder approves transfer of 10 tokens
    transaction = await token.approve(mc.address, tokens(10));
    await transaction.wait();

    // Funder funds 10 tokens to campaign1
    transaction = await mc.fundCampaign(1, tokens(10));
    await transaction.wait();
    console.log(`Funder funded ${hre.ethers.utils.formatUnits(tokens(10), 'ether')} to campaign1. \n`)

    console.log(`Finished.\n`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});