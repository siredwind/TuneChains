<div align="center">
  <img src="https://gateway.pinata.cloud/ipfs/QmSdQdscB6CDGKPznDB9Xn1e4CyuKn2eHGwn4jgJwvedLW" />
  <h3>
    TuneChains Crowdfunding Platform
  </h3>
</div>

⚡️ Web3 application with Bento Grids styling that allows artists to create funding campaigns in order promote their art and raise funds from fans. The artists are able to reference their social media links to promote their stuff even better!

Built using **Solidity**, **ReactJS*, **RainbowKit**, **Wagmi**, **Redux**, **Ethers**.

## 🔑 Bento Grid
Bento Grid is the new design trend which is composed from modular boxes and it is useful to showcase multiple items in a single space. Apple is known for using this incredible design to create their presentation websites. 

👉 React template: https://github.com/saipranay47/bento-grid-portfolio

👉 Learn more about Bento Grid designs: https://bentogrids.com

<div align="center">
  <img src="https://gateway.pinata.cloud/ipfs/QmQ8Sq6Eq9xtQBr6FrC6MTRT2TWvX7pTyuLQrjMPLPTcRb" />
  <h3> 
    TuneChains Crowdfunding Platform Preview
  </h3>
</div>

## Check Website

<p align="center">
  <a href="https://tune-chains-b5rdfawb6-siredwinds-projects.vercel.app/">
    <img src="https://vercel.com/button" alt="Deploy with Vercel"/>
  </a>
</p>

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/siredwind/TuneChains.git
```

### Install dependencies
```
npm install
```

### Set environment variables
This project requires a number of keys from Pinata to be defined in `.env`. The following should be defined:
- `REACT_APP_PINATA_JWT`, the corresponding Pinata JWT from your account at [Pinata Cloud](https://app.pinata.cloud/developers/api-keys).
- `REACT_APP_PINATA_GATEWAY`, the Pinata gateway to ipfs: [Pinata Gateway](https://gateway.pinata.cloud/ipfs).

### Start the project
```
npm run start
```

### Start the hardhat blockchain locally
```
npx hardhat node
```

### Deploy smart contracts
```
npx hardhat run scripts/deploy.js --network localhost
```

### Run seed script for creating 5 standard campaigns 
```
npx hardhat run scripts/seed.js --network localhost
```