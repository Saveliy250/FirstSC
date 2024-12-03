import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "@ton/ton";
import Counter from "../wrappers/Counter";

export async function run() {
    const endpoint = await getHttpEndpoint();
    const client = new TonClient({endpoint});

    const counterAddress = Address.parse("EQA2-Cxv1m6LcdtnFNpHYQm5Dd8scyX2h2Qe-5OYLp2X9Bi6");
    const counter = new Counter(counterAddress);
    const counterContract = client.open(counter);

    const counterValue = await counterContract.getCounter();
    console.log("value:", counterValue.toString());

}