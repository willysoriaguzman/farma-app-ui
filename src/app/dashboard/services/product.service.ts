import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NGXLogger } from 'ngx-logger';
import Product from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbPath = '/restricted_access/secret_document/productos/recordset';
  productsRef: AngularFireList<Product>;

  constructor(private db: AngularFireDatabase,
    private logger: NGXLogger) {
    this.productsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Product> {
    this.logger.log('INFO: getAll()');
    this.logger.log(this.productsRef);
    return this.productsRef;
  }

  create(product: Product): any {
    return this.productsRef.push(product);
  }

  update(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.productsRef.remove();
  }

}
