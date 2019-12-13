const ecc = require('eosjs-ecc');
const randomstring = require("randomstring");

const GLS_ACCOUNT_NAME_PREFIX = 'usr';

const authTypes = ['active', 'owner'];

function generateNewUserId() {
    const prefix = GLS_ACCOUNT_NAME_PREFIX;

    const newUserId =
        prefix +
        randomstring.generate({
            length: 12 - prefix.length,
            charset: 'alphabetic',
            capitalization: 'lowercase',
        });
    return newUserId;
}


function getKeyPairByPermissionName(accountName, masterKey, permName) {
    const privateKey = fromSeed(accountName, masterKey, permName);
    const publicKey = ecc.privateToPublic(privateKey, 'GLS');
  
    return {
      privateKey,
      publicKey,
    };
}

function fromSeed(accountName, masterKey, permName) {
    return ecc.seedPrivate(`${accountName}${permName}${masterKey}`);
}

function getFullKeyPairs(accountName, masterKey) {
    const keyPairs = {};
    for (const permName of authTypes) {
      keyPairs[permName] = getKeyPairByPermissionName(accountName, masterKey, permName);
    }
    console.log('Account Name: ', accountName , '\n', keyPairs)
    return keyPairs;
  }

function generateKeys(accountName) {
    ecc.randomKey().then(privateKey => {
        console.log('Master Key:\t', `P${privateKey}`) // wif
        return {
            accountName,
            privateKey,
              ...getFullKeyPairs(accountName, `P${privateKey}`),
            };
        });
    
}

// Create an account with random name
// let randomName = generateNewUserId()
// generateKeys(randomName)

// Create an account with custom name, no longer than 12 symbols, a-z and 1-5 are allowed
// let customName = 'nick1shtefan'
// generateKeys(customName) 

