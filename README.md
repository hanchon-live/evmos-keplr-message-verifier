# Evmos keplr message verifier

Verify messages signed with signArbitrary using evmos addresses

## Installation

```sh
yarn add @hanchon/evmos-keplr-message-verifier
```

## Usage

### Sign a message using keplr

```ts
const chainId = 'evmos_9001-2'
const message = 'something'
const address = 'evmos13f4uur7qw3yd87v3ujdle0xtzcjnskywdrnjhp'
const signature = await window.keplr.signArbitrary(
    chainId,
    address,
    message,
)
```

### Verify the message

```ts
// Address, message and signature are the same as the previous step
const pubKey = 'A/o4Mu4lzmuWORZPfLfDJIhuFJu2Dwq/ytZBAM1mXNGs'
const validSignature = verifyKeplrSignature(address, pubKey, message, signature)
// if validSignature === true, the message was signed by that address
```

Note: the pubKey of the current connected address can be obtained using:

```ts
await window.keplr.enable(chainId)
const offlineSigner = window.getOfflineSigner(chainId)
const wallets = await offlineSigner.getAccounts()
const pubKey = Buffer.from(wallets[0].pubkey).toString('base64')
```

## Why?

Using keplr to sign with `signArbitraty` using `Evmos` it will sign the message using the `keccak_256` hashing algorithm, but when validating the message it's using the cosmos' default so it'll return always invalid signer.

## Known issues

The serializer is breaking for even length string and it's failing to validate the signer
