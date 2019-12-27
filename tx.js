const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('text-encoding');
const { JsonRpc, Api } = require('cyberwayjs');
const JsSignatureProvider = require('cyberwayjs/dist/eosjs-jssig').default;


(async () => {
    const rpc = new JsonRpc('http://0.0.0.0:8888', { fetch }); // адрес ноды
    const signatureProvider = new JsSignatureProvider([
        '', // Ключ аккаунта с которого осуществляется перевод
        '', // ключ BW Provider 
    ]);

    const api = new Api({
        rpc,
        signatureProvider,
        textDecoder: new TextDecoder(),
        textEncoder: new TextEncoder(),
    });

    const transaction = {
        actions: [
            {
                account: 'cyber.token',
                name: 'transfer',
                authorization: [
                    {
                        actor: '', // ID аккаунта, с которого осуществляется перевод
                        permission: 'active',
                    },
                ],
                data: {
                        from: "", // ID аккаунта, с которого осуществляется перевод
                        to: "", // ID аккаунта, на который осуществляется перевод
                        quantity: "", // Сумма перевода. Обязательно вводить 4 знака после запятой и тикер, например 1.0000 CMN или 1.1000 CMN
                        memo: "" // мемо
                },
            },
            {
                account: 'cyber',
                name: 'providebw',
                authorization: [
                    {
                        actor: 'c',
                        permission: 'providebw',
                    },
                ],
                data: {
                    provider: 'c',
                    account: '', // ID аккаунта которому надо осуществить операцию
                },
            },
        ],
    };

    const trx = await api.transact(transaction, {
        broadcast: false,
        blocksBehind: 5,
        expireSeconds: 3600,
    });

    const result = await api.pushSignedTransaction(trx);

    console.log(JSON.stringify(result, null, 4));
})();