import { Injectable } from '@angular/core';
import { IHealthInfo } from './policy.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HealthInfoService {
  constructor(private db: AngularFireDatabase) { }
  getHealthInfo() {
    return this.db.list('/healthyInfo').snapshotChanges().pipe(
      map((products: any[]) => products.map(prod => {
        const payload = prod.payload.val();
        const key = prod.key;
        return <IHealthInfo>{ key, ...payload };
      })),
    );
  }
}
