import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Contract0 } from '../wrappers/Contract0';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Contract0', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Contract0');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let contract0: SandboxContract<Contract0>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        contract0 = blockchain.openContract(Contract0.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await contract0.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: contract0.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and contract0 are ready to use
    });
});
