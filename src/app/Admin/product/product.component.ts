import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Service/Product.service';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/Service/supplier.service';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public ImagePath = environment.ImagePath;
  ProductForm: FormGroup;
  lstData: any = [];
  LoggedInUserId: string;
  LoggedInUserType: string;
  lstSupplier: any = [];
  // displayedColumns: string[] = ['productName', 'brandName', 'subcategoryName', 'stockQty', 'price', 'salePrice', 'active', 'Edit'];
  displayedColumns: string[] = ['frontImage', 'productName', 'brandName', 'subcategoryName', 'supplierName', 'setType', 'active', 'Edit'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  SelectsupplierID = new FormControl('');
  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _ProductService: ProductService,
    private router: Router,
    private _supplierService: SupplierService
  ) {

    this.LoadData("");
    this.LoadSupplier();
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  LoadSupplier() {
    let obj = {
      Active: 1
    }
    this.spinner.show();
    this._supplierService.GetSupplier(obj).subscribe(res => {
      //this.spinner.hide();
      this.lstSupplier = res;
    });
  }
  LoadData(event: any) {
    let obj = {
      SupplierID: this.SelectsupplierID.value == "" ? 0 : Number(this.SelectsupplierID.value)
    }
    this.spinner.show();
    this._ProductService.GetAllProductBySupplierId(obj).subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onAddNew() {
    this.router.navigate(['/productdetail']);
  }

  Edit(lst) {
    debugger
    this.router.navigate(['/productdetail/' + lst.productID]);
  }


}

