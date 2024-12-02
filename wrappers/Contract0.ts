import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type Contract0Config = {};

export function contract0ConfigToCell(config: Contract0Config): Cell {
    return beginCell().endCell();
}

export class Contract0 implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Contract0(address);
    }

    static createFromConfig(config: Contract0Config, code: Cell, workchain = 0) {
        const data = contract0ConfigToCell(config);
        const init = { code, data };
        return new Contract0(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
