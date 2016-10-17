import { PrimePart } from './prime-part';

export interface IPrime {
    name:string;
    requiredParts: PrimePart[];
}

export class Prime implements IPrime {
    name:string;
    requiredParts: PrimePart[];

    static isEqual(a: Prime, b: Prime): boolean {
        return a.name == b.name;
    }

    static fromJSON(jsonPrime: IPrime): Prime {
        let prime = new Prime();
        prime.name = jsonPrime.name;
        prime.requiredParts = jsonPrime.requiredParts;
        return prime;
    }

    countPrimePart(primePart: PrimePart): number {
        return this.requiredParts.filter(requiredPrimePart => PrimePart.isEqual(requiredPrimePart, primePart)).length;
    }

    canBuildPrime(ownedPrimeParts: PrimePart[]): boolean {
        for(let requiredPrimePart of this.requiredParts) {
            if(!ownedPrimeParts.some(primePart => PrimePart.isEqual(requiredPrimePart, primePart))) {
                return false;
            }
        }
        return true;
    }
}