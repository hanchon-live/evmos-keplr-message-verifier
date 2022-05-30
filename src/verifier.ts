import sha3 from "js-sha3";
import { arrayify } from "@ethersproject/bytes";
import { serializeSignDoc } from '@cosmjs/launchpad'
import { signatureToPubkey } from '@hanchon/signature-to-pubkey'

export interface KeplrSignature {
    pub_key: {
        type: string
        value: string
    },
    signature: string
}

function messageToAminoTransaction(signer: string, data: string) {
    return {
        chain_id: '',
        account_number: '0',
        sequence: '0',
        fee: {
            gas: '0',
            amount: [],
        },
        msgs: [
            {
                type: 'sign/MsgSignData',
                value: {
                    signer,
                    data,
                },
            },
        ],
        memo: '',
    }
}

export function verifyKeplrSignature(address: string, pubKey: string, message: string, signature: KeplrSignature) {
    // Sent pubkey is different from the one used to sign the message
    if (pubKey !== signature.pub_key.value) {
        return false
    }

    // Encode the message into amino format
    const aminoEncoded = messageToAminoTransaction(address, Buffer.from(message).toString('base64'))
    const serialized = serializeSignDoc(aminoEncoded)

    // Hash the amino message that was signed
    const hashed = sha3.keccak_256(arrayify(serialized))

    // Compare signature
    const signatureToCompare = `0x${Buffer.from(
        signature.signature,
        'base64',
    ).toString('hex')}`
    const pubkeyComputed = signatureToPubkey(
        signatureToCompare,
        Buffer.from(hashed, 'hex'),
    )
    return (pubkeyComputed === signature.pub_key.value)
}