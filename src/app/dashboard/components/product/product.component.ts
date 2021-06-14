import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Product from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { DataSource } from '@angular/cdk/table';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit  {

  // tutorials: Observable<any[]>;
  tutorials?: Product[];
  currentTutorial?: Product;
  currentIndex = -1;
  title = '';
  displayedColumns: string[] = ['key', 'NombreComercial', 'Code', 'Stock', 'Stock_2'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  // constructor(private db: AngularFireDatabase) { 
  constructor(private productService: ProductService,
    private logger: NGXLogger) { 
   //  this.tutorials = db.list('tutorials').valueChanges();
  }

  ngOnInit(): void {
    this.retrieveTutorials();
  }
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }
  refreshList(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }
  retrieveTutorials(): void {
    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tutorials = data;
      this.dataSource = new MatTableDataSource(data as Product[]);
      this.logger.log('INFO: data', data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });
  }

  setActiveTutorial(tutorial: Product, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.productService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

}
