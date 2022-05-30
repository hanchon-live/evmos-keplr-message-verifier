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

test('test signature 2', () => {
    const address = 'evmos13f4uur7qw3yd87v3ujdle0xtzcjnskywdrnjhp'
    const pubKey = 'A/o4Mu4lzmuWORZPfLfDJIhuFJu2Dwq/ytZBAM1mXNGs'
    const message = 'MM=0x2D975255721A1293b9db832938F601A58DD57A14'
    const keplrSignature = {
        "pub_key": {
            "type": "tendermint/PubKeySecp256k1",
            "value": "A/o4Mu4lzmuWORZPfLfDJIhuFJu2Dwq/ytZBAM1mXNGs"
        },
        "signature": "3ZKCVzcx/s/TAacIPs0Nu+JsblHD6MgQRmQ+LXFsqzd0r9bumapjmGSLv34knSDzkDcyGdGClKroAd23RHDa3Q=="

    }
    const validSignature = verifyKeplrSignature(address, pubKey, message, keplrSignature)

    expect(validSignature).toBe(true);
})
