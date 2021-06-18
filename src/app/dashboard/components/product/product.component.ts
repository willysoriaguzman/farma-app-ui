import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
import { ProductNodeService } from '../../services/product-node.service';
import { HighlightPipe } from '../../../common/Pipes/highlight.pipe';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductComponent implements OnInit, AfterViewInit  {

  // tutorials: Observable<any[]>;
  tutorials: Product[];
  currentTutorial?: Product;
  currentIndex = -1;
  title = '';
  displayedColumns: string[] = ['key', 'NombreComercial', 'Code', 'Stock_america', 'Stock_papapaulo', 'Stock_sanmartin'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  expandedElement: Product | null | undefined;

  // constructor(private db: AngularFireDatabase) { 
  constructor(private productService: ProductService,
    private productNodeService: ProductNodeService,
    private logger: NGXLogger) { 
   //  this.tutorials = db.list('tutorials').valueChanges();
   this.tutorials = [];
  }

  ngOnInit(): void {
    this.productService.updateCustomRefresh((new Date()).toISOString());
    // TODO: Call farma-node-api to refresh firebase data
    // this.productNodeService.refreshProducts().subscribe( data => {
    //   this.logger.trace('INFO: product onInit',data);
    // });
    // Get Products from firebase
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
  let indexTest = 0;

    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tutorials = Object.keys(data[0]).map( c =>({ key: c, ...data[0][c]}));
      // this.logger.debug('INFO: data arrived', this.tutorials[0]);
      // this.logger.debug('INFO: data arrived is array', Array.isArray(this.tutorials[0]));
      // this.logger.debug('INFO: data arrived is array', typeof this.tutorials[0]);
      // this.logger.debug('INFO: data arrived', data[2]);
      // this.logger.debug('INFO: data arrived', indexTest);
      indexTest++;
      // this.dataSource = new MatTableDataSource(data as Product[]);
      this.dataSource= new MatTableDataSource(this.tutorials);
      // this.dataSource.data = this.tutorials as Product[];
      // this.logger.log('INFO: data ASIGNNED', data);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.logger.debug('INFO: applyFilter', filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSource.filter.
  }

  sortData(sort: Sort) {
    this.logger.debug('INFO: sort ', sort.active);
    const data = this.tutorials;
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'NombreComercial': return compare(a.NombreComercial, b.NombreComercial, isAsc);
        case 'Code': return compare(a.Code, b.Code, isAsc);
        case 'Stock_america': return compareStockOnly(a.Stock_america, b.Stock_america, isAsc);
        case 'Stock_papapaulo': return compareStockOnly(a.Stock_papapaulo, b.Stock_papapaulo, isAsc);
        case 'Stock_sanmartin': return compareStockOnly(a.Stock_sanmartin, b.Stock_sanmartin, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: number | string | undefined, b: number | string | undefined, isAsc: boolean) {
  // console.log('INFO: compare a < b', a, b);
  if(a === (null || undefined))
    return -1 * (isAsc ? 1 : -1);
  if(b === (null || undefined))
    return 1 * (isAsc ? 1 : -1);
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareStockOnly(a: number | string | undefined, b: number | string | undefined, isAsc: boolean) {
  // console.log('INFO: compare a < b', a, b);
  if(a === (null || undefined))
    return -1 * (isAsc ? 1 : -1);
  if(b === (null || undefined))
    return 1 * (isAsc ? 1 : -1);
  const value_a = a.toString().split(' (')[0];
  const value_b = b.toString().split(' (')[0];
  console.log('INFO: compare a < b', a, b, parseInt(value_a, 10), parseInt(value_b, 10), parseInt(value_a, 10) < parseInt(value_b, 10));
  return (parseInt(value_a, 10) < parseInt(value_b, 10) ? -1 : 1) * (isAsc ? 1 : -1);
}
