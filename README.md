# Coinbase Staking with TypeScript
This project demonstrates how to stake Ethereum (ETH) using the Coinbase SDK and TypeScript. It involves loading environment variables from a .env file, configuring API keys, and interacting with the Ethereum blockchain to perform staking operations.

## Prerequisites
Before setting up the environment, ensure you have the following installed on your machine:

Node.js (v16 or higher recommended) to install - 
```
brew install node
```
this uses homebrew to install, if you need to install homebrew - 
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
npm (comes with Node.js)
TypeScript You can install TypeScript globally via 
```
npm install -g typescript
```

## Steps to Set Up
1. Clone the repository
If you haven’t already cloned the repository, you can do so using the following command:
```
git clone https://github.com/CPix18/CB-Stake
cd CB-Stake
```

3. Initialize Node.js Project
Run the following command to initialize a new Node.js project:
```
npm init -y
```
This will generate a package.json file with default values.

3. Initialize TypeScript
Next, initialize TypeScript for the project by running:
```
npx tsc --init
```
This command will create a tsconfig.json file, which is used to configure TypeScript options.

4. Install Dependencies
Run the following command to install the required Node.js dependencies:
```
npm install @coinbase/coinbase-sdk ethers dotenv
```
This will install:

@coinbase/coinbase-sdk - Coinbase SDK for interacting with the Coinbase API.
ethers - Ethereum JavaScript library for interacting with the Ethereum blockchain.
dotenv - Package for loading environment variables from a .env file.

5. Set Up the .env File
Create a .env file in the config folder of the project. This file should contain the following environment variables:
```
WALLET_ADDRESS=your_wallet_address_here
PRIVATE_KEY=your_private_key_here
MAINNET_NODE_URL=https://your_rpc_node_url_here
```
To make those variables work you'll need to do the following commands
```
cd config
source .env
cd ..
```

7. Create a Coinbase Developer Account and add a Coinbase API Key from Coinbase Developer Portal - https://portal.cdp.coinbase.com/projects/api-keys 
Create a config/api_key.json file and store your Coinbase API key there. The file should look like this:
```
{
  "name": "organizations/fdassfd-fdafd-fdafds-dfasfds/apiKeys/fda-fdasdf-fdafd-fdsfds",
  "privateKey": "-----BEGIN EC PRIVATE KEY-----\nhjfdskljfadfjsadfkdlfkadshfhdsf\n-----END EC PRIVATE KEY-----\n"
}
```
7. Run the Staking Script
Now you’re ready to run the staking operation. Execute the script using the following command:
```
npx ts-node stake.ts
```
This will start the staking process, and the following actions will take place:

The script will check the balance of ETH available for staking.
It will build a transaction to stake 0.0005 ETH.
The transaction will be signed using your private key and broadcasted to the Ethereum network.
6. Verify Transactions
Once the script runs successfully, you should see the transaction hash printed in the console. You can verify the transaction status on Etherscan.

## File Structure

1. Inside of CB-Stake you'll have
2. config and node_modules folders - inside config will be a .env file and api_key.json
3. stake.ts
4. .gitignore 
5. package.json and package-lock.json
6. tsconfig.json

## Troubleshooting
1. Missing Environment Variables: Ensure that all environment variables in the .env file are set correctly.
2. Private Key: Double-check that your private key is valid and is not exposed publicly.
3. Node URL: Make sure that the RPC Node URL is accessible and functional.
4. Wallet Address: Make sure your wallet address's public key matches the private key you use.
5. Missing Dependencies: If you encounter issues with missing packages, try running npm install again.


