import { verifyKeplrSignature } from '../src/verifier';

test('test signature', () => {
    const address = 'evmos13f4uur7qw3yd87v3ujdle0xtzcjnskywdrnjhp'
    const pubKey = 'A/o4Mu4lzmuWORZPfLfDJIhuFJu2Dwq/ytZBAM1mXNGs'
    const message = 'something'
    const keplrSignature = {
        "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "A/o4Mu4lzmuWORZPfLfDJIhuFJu2Dwq/ytZBAM1mXNGs"
        },
        "signature": "vFMHCMAApUwdGQuVYuFGnHE3FWVqeqJObjgj6JJPzEYJuefFKyIFN5lm4vGHw5PXiLoIPD8EwED+nUP0rlywsQ=="
    }
    const validSignature = verifyKeplrSignature(address, pubKey, message, keplrSignature)

    expect(validSignature).toBe(true);

    const invalidSignature = verifyKeplrSignature(address, pubKey, '', keplrSignature)
    expect(invalidSignature).toBe(false)
})
