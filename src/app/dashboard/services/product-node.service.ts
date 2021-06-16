import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductNodeService {

  basePath = environment.nodeServer;
  constructor(private http : HttpClient) { }

  refreshProducts(){
    return this.http.get(this.basePath + '/refresh-product');
  }
}
