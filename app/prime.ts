import { PrimePart } from './prime-part';

export interface IPrime {
    name:string;
    requiredParts: PrimePart[];
    vaulted: boolean;
}

export class Prime implements IPrime {
    name:string;
    requiredParts: PrimePart[];
    vaulted: boolean;
    private distinctParts: PrimePart[];

    static isEqual(a: Prime, b: Prime): boolean {
        return a.name == b.name;
    }

    static fromJSON(jsonPrime: IPrime): Prime {
        let prime = new Prime();
        prime.name = jsonPrime.name;
        prime.requiredParts = jsonPrime.requiredParts;
        prime.vaulted = jsonPrime.vaulted;
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

    getDistinctParts(): PrimePart[] {
        if(this.distinctParts == null) {
            this.distinctParts = this.requiredParts.filter((a, index) => this.requiredParts.findIndex(b => PrimePart.isEqual(a, b)) == index);
        }
        return this.distinctParts;
    }
}