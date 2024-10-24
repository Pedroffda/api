// compare hash

export abstract class HashCompare {
    abstract compare(plaintext: string, digest: string): Promise<boolean>;
    }