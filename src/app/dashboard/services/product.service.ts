import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { NGXLogger } from 'ngx-logger';
import Product from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private basePAth = '/restricted_access';
  private dbPath = '/secret_document/productos/';
  private refreshKeyPath = '/restricted_access/secret_document/';
  productsRef: AngularFireList<any>;
  customRefreshRef;

  constructor(private db: AngularFireDatabase,
    private logger: NGXLogger) {
    this.productsRef = db.list(this.basePAth + this.dbPath);
    this.customRefreshRef = db.database.ref(this.basePAth + '/customRefresh');
  }

  getAll(): AngularFireList<any> {
    this.logger.log('INFO: getAll()');
    this.logger.log(this.productsRef);
    return this.productsRef;
  }

  create(product: any): any {
    return this.productsRef.push(product);
  }

  update(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }

  updateCustomRefresh(value: string): Promise<void> {
    return this.customRefreshRef.update({'isCustomRefresh':value});
  }

  delete(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.productsRef.remove();
  }

}
