import { HashCompare } from "@/domain/user/cryptography/hash-compare";
import { Module } from "@nestjs/common";
import { BcryptHasher } from "./bcrypt-hasher";
import { HashGenerator } from "@/domain/user/cryptography/hash-generator";


@Module({
    providers: [
        {provide: HashCompare, useClass: BcryptHasher},
        {provide: HashGenerator, useClass: BcryptHasher}
    ],
    exports: [
        HashCompare,
        HashGenerator
    ],
    })

export class CryptographyModule {}