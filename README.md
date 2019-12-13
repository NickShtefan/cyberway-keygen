# simple cyberway keys generator

`git clone https://github.com/NickShtefan/cyberway-keygen.git
`

`npm i
`

Open keygen.js file and edit section 

```
// Create an account with random name
// let randomName = generateNewUserId()
// generateKeys(randomName)

// Create an account with custom name, no longer than 12 symbols, a-z and 1-5 are allowed
// let customName = 'nick1shtefan'
// generateKeys(customName) 
```

for example, if you want to use custom name just uncomment strings and insert the name you want in customName variable  

```
let customName = 'nick1shtefan'
generateKeys(customName) 
```

now run 
`node keygen.js`

example output 

```
Master Key:      P5KQgYYBu9ars4X2ZPM4cFr22vccYGBgJaLWY3bE9m8fqToe8PQC
Account Name:  nick1shtefan 
 { active:
   { privateKey: '5JvtE4c426Fnbj1fonEuCEFzdYRQYFkxaDbH8mrkn5ENUA5f89c',
     publicKey: 'GLS78r4tQLTjzB8HoNArMEvaXqsWMwiCSVuCzMEhzWeZ3M1gNwjpN' },
  owner:
   { privateKey: '5JhtKrfcxpDmLe2JaZzWZSDYXkGXZJc32DsUZSxFV4Se9BvQS4z',
     publicKey: 'GLS57fag77Ycx962QSXTnuiKmZyVGZ56qqo8u5LjU1xPrwfyNuaCy' } }
```
