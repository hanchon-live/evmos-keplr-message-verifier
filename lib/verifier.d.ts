export interface KeplrSignature {
    pub_key: {
        type: string;
        value: string;
    };
    signature: string;
}
export declare function verifyKeplrSignature(address: string, pubKey: string, message: string, signature: KeplrSignature): boolean;
