import { Component, OnInit } from '@angular/core';

import { PrimePart } from './prime-part'
import { Prime }     from './prime'
import { WarframeService } from './warframe.service';
import { VoidRelic } from './void-relic';

@Component({
    selector: 'prime',
    templateUrl: 'app/prime.component.html',
    providers: [WarframeService],
    styles: [
        '.list-group label {width: 30%}',
        '.list-group .list-group {width: 70%; float: right; margin-bottom: 0px;}'
    ]
})
export class PrimeComponent implements OnInit {
    primes: Prime[];
    primeParts: PrimePart[];
    ownedPrimeParts: PrimePart[];
    ownedPrimes: Prime[];
    voidRelics: VoidRelic[];
    selectedTier: string;
    hideOwnedPrimes: boolean;
    hideBuildablePrimes: boolean;
    hideVaultedPrimes: boolean;
    searchKey: string;
    ownedPrimesJson: string;
    ownedPrimePartsJson: string;

    constructor(private warframeService: WarframeService) {}

    ngOnInit(): void {
        this.primes = [];
        this.ownedPrimeParts = [];
        this.ownedPrimes = [];
        this.voidRelics = [];
        this.selectedTier = '';
        this.hideOwnedPrimes = true;
        this.hideBuildablePrimes = true;
        this.hideVaultedPrimes = true;
        this.searchKey = '';
        this.warframeService.getPrimes().then(primes => {
            primes.sort((a, b) => a.name == b.name ? 0 : a.name > b.name ? 1 : -1);
            this.primes = primes;
        });
        this.warframeService.getVoidRelics().then(voidRelics => this.voidRelics = voidRelics);
        this.warframeService.getMyPrimes().then(primes => this.ownedPrimes = primes);
        this.warframeService.getMyPrimeParts().then(primeParts => this.ownedPrimeParts = primeParts);
    }
    
    getFilteredPrimes(): Prime[] {
        return this.warframeService.searchPrime(this.primes, this.searchKey).filter(prime => !this.isPrimeHidden(prime));
    }

    getFilteredPrimeParts(prime: Prime): PrimePart[] {
        return this.warframeService.filterPrimePartsByTier(prime.getDistinctParts(), this.selectedTier, this.voidRelics);
    }

    countOwnedPrimePart(primePart: PrimePart): number {
        return this.ownedPrimeParts.filter(ownedPrimePart => PrimePart.isEqual(ownedPrimePart, primePart)).length;
    }

    addOwnedPrimePart(primePart: PrimePart): void {
        this.ownedPrimeParts.push(primePart);
    }

    removeOwnedPrimePart(primePart: PrimePart): void {
        let index = this.ownedPrimeParts.findIndex(ownedPrimePart => PrimePart.isEqual(primePart, ownedPrimePart));
        if (index > -1) {
            this.ownedPrimeParts.splice(index, 1);
        }
    }

    isOwnedPrime(prime: Prime): boolean {
        return this.ownedPrimes.some(ownedPrime => Prime.isEqual(ownedPrime, prime));
    }

    addOwnedPrime(prime: Prime): void {
        this.ownedPrimes.push(prime);
    }

    removeOwnedPrime(prime: Prime): void {
        let index = this.ownedPrimes.findIndex(ownedPrime => Prime.isEqual(prime, ownedPrime));
        if (index > -1) {
            this.ownedPrimes.splice(index, 1);
        }
    }

    isPrimeHidden(prime: Prime) : boolean {
        return this.warframeService.filterPrimePartsByTier(prime.requiredParts, this.selectedTier, this.voidRelics).length < 1 ||
            (this.hideOwnedPrimes && this.isOwnedPrime(prime)) ||
            (this.hideBuildablePrimes && prime.canBuildPrime(this.ownedPrimeParts)) ||
            (this.hideVaultedPrimes && prime.vaulted);
    }

    save() {
        console.log('Owned primes');
        console.log(JSON.stringify(this.ownedPrimes));
        this.ownedPrimesJson = JSON.stringify(this.ownedPrimes);
        console.log('Owned prime parts');
        console.log(JSON.stringify(this.ownedPrimeParts));
        this.ownedPrimePartsJson = JSON.stringify(this.ownedPrimeParts);
    }
}