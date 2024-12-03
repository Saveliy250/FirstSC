import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { TonClient, WalletContractV4, Address } from "@ton/ton";
import Counter from "../wrappers/Counter";

export async function run() {
    const endpoint = await getHttpEndpoint();
    const client = new TonClient({endpoint});

    const mnemonic = "...";
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({publicKey: key.publicKey, workchain: 0});
    if (!await client.isContractDeployed(wallet.address)) {
        return console.log("wallet is not deployed");
    }

    const walletContract = client.open(wallet);
    const walletSender = walletContract.sender(key.secretKey);
    const seqno = await walletContract.getSeqno();

    const counterAddress = Address.parse("EQA2-Cxv1m6LcdtnFNpHYQm5Dd8scyX2h2Qe-5OYLp2X9Bi6");
    const counter = new Counter(counterAddress);
    const counterContract = client.open(counter);

    await counterContract.sendIncrement(walletSender);

    let currentSeqno = seqno;
    while (currentSeqno == seqno) {
        console.log("waiting for transaction to confirm...");
        await sleep(1500);
        currentSeqno = await walletContract.getSeqno();
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}