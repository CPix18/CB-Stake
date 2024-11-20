import { Coinbase, ExternalAddress, StakeOptionsMode } from "@coinbase/coinbase-sdk";
import { ethers } from "ethers";
import dotenv from "dotenv"; // Import dotenv to load environment variables

// Load environment variables from the .env file
dotenv.config({ path: "./config/.env" });
const apiKeyFilePath = "./config/api_key.json";

/**
 * Stake 0.0005 ETH 
 */
async function stake() {
    const coinbase = Coinbase.configureFromJson({ filePath: apiKeyFilePath });
    const walletAddress = process.env.WALLET_ADDRESS; // Access private key from environment
    if (!walletAddress) {
        console.error("Wallet Address is missing. Please set it in the .env file.");
        return;
    }

    // Create a new external address 
    const address = new ExternalAddress(Coinbase.networks.EthereumMainnet, walletAddress);

    // Find out how much ETH is available to stake.
    const stakeableBalance = await address.stakeableBalance(Coinbase.assets.Eth, StakeOptionsMode.PARTIAL);
    console.log("Stakeable balance of address %s is %s ETH", walletAddress, stakeableBalance);

    // Build a stake transaction for an amount <= stakeableBalance
    process.stdout.write("Building a transaction to stake 0.0005 ETH... ");
    const stakingOperation = await address.buildStakeOperation(0.0005, Coinbase.assets.Eth, StakeOptionsMode.PARTIAL);
    console.log("Done.");

    // Load the wallet's private key from the environment variable
    const walletPrivateKey = process.env.PRIVATE_KEY; // Access private key from environment
    if (!walletPrivateKey) {
        console.error("Private key is missing. Please set it in the .env file.");
        return;
    }

    const wallet = new ethers.Wallet(walletPrivateKey);

    // Load the Node URL from the environment variable, RPC endpoints can be found here https://chainlist.org
    const NodeURL = process.env.MAINNET_NODE_URL; // Access private key from environment
    if (!NodeURL) {
        console.error("Node URL is missing. Please set it in the .env file.");
        return;
    }

    // Sign the transactions within staking operation resource with your wallet.
    process.stdout.write("Signing the stake operation... ");
    await stakingOperation.sign(wallet);
    console.log("Done.");

    const provider = new ethers.JsonRpcProvider(NodeURL);

    // Broadcast each of the signed transactions to the network.
    process.stdout.write("Broadcasting the stake operation... ");
    for (const tx of stakingOperation.getTransactions()) {
        const resp = await provider.broadcastTransaction(tx.getSignedPayload()!);
        console.log("Broadcasted transaction hash: %s", resp.hash);
    }
}

(async () => {
    try {
        await stake();
    } catch (error) {
        console.error("Error during stake operation", error);
    }
})();
