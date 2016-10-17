export class PrimePart {
    name: string;

    static isEqual(a: PrimePart, b: PrimePart): boolean {
        return a.name == b.name;
    }
}