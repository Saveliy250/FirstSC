import { toNano } from '@ton/core';
import { Contract0 } from '../wrappers/Contract0';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const contract0 = provider.open(Contract0.createFromConfig({}, await compile('Contract0')));

    await contract0.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(contract0.address);

    // run methods on `contract0`
}
