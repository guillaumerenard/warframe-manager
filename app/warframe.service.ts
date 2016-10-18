import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { IPrime, Prime } from './prime';
import { PrimePart } from './prime-part';
import { VoidRelic } from './void-relic';

@Injectable()
export class WarframeService {
  private dataUrl = '/app/data';

  constructor(private http: Http) { }

  // Prime
  getPrimes(): Promise<Prime[]> {
      return this.http.get(this.dataUrl + '/primes.json')
        .toPromise().then(response => {
          let primes: Prime[] = [];
          for(let jsonPrime of response.json() as IPrime[]) {
            primes.push(Prime.fromJSON(jsonPrime));
          }
          return primes;
        });
  }

  getMyPrimes(): Promise<Prime[]> {
      return this.http.get(this.dataUrl + '/myprimes.json')
        .toPromise().then(response => response.json() as Prime[]);
  }

  searchPrime(primes: Prime[], searchKey: string): Prime[] {
    if(searchKey == null || searchKey == '') {
      return primes;  
    }
    return primes.filter(prime => prime.name.toLowerCase().indexOf(searchKey.toLowerCase()) >= 0);
  }

  // Prime part
  getMyPrimeParts(): Promise<PrimePart[]> {
      return this.http.get(this.dataUrl + '/myprimeparts.json')
        .toPromise().then(response => response.json() as PrimePart[]);
  }

  filterPrimePartsByTier(primeParts: PrimePart[], tier: string, voidRelics: VoidRelic[]) : PrimePart[] {
    if(tier == null || tier == '') {
        return primeParts;
    }
    else {
      return primeParts.filter(primePart =>
        voidRelics.filter(voidRelic =>
          voidRelic.tier == tier).some(voidRelic =>
            voidRelic.commonRewards.some(voidRelicPrimePart => PrimePart.isEqual(voidRelicPrimePart, primePart)) ||
            voidRelic.uncommonRewards.some(voidRelicPrimePart => PrimePart.isEqual(voidRelicPrimePart, primePart)) ||
            voidRelic.rareRewards.some(voidRelicPrimePart => PrimePart.isEqual(voidRelicPrimePart, primePart)))
      );
    }
  }

  // Void relic
  getVoidRelics(): Promise<VoidRelic[]> {
      return this.http.get(this.dataUrl + '/voidrelics.json')
        .toPromise().then(response => response.json() as VoidRelic[]);
  }
}
