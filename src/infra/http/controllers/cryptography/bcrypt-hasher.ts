import { HashCompare } from "@/domain/user/cryptography/hash-compare";
import { HashGenerator } from "@/domain/user/cryptography/hash-generator";
import * as bcrypt from 'bcryptjs';

export class BcryptHasher implements HashGenerator, HashCompare {
    private readonly salt = 8;

  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, this.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}   