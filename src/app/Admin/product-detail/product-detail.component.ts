import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/Service/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/Service/brand.service';
import { CategoryService } from 'src/app/Service/category.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from 'src/app/Service/Product.service';
import { ConfirmBoxComponent } from 'src/app/confirm-box/confirm-box.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SupplierService } from 'src/app/Service/supplier.service';
import { MatTableDataSource } from '@angular/material/table';
import { LookupService } from 'src/app/Service/lookup.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  ProductForm: FormGroup;
  ProductDetailForm: FormGroup;
  LoggedInUserId: string;
  lstBrand: any = [];
  lstCategory: any = [];
  lstSubCategory: any = [];
  lstSupplier: any = [];
  ProductId: any;
  lstColor: any = [];
  images = [];
  BannerImage = [];
  SmallImage = [];
  public previewUrl: any;
  bsModalRef: BsModalRef;
  submitted = false;
  DecimalMask = null;
  showMask = false;
  NumberMask = null;
  lstData = [];
  displayedColumns: string[] = ['productImg', 'qty', 'price', 'salePrice', 'availableSize', 'size', 'availableColors', 'color', 'discount', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<any>(this.lstData);
  PopUpProductImg = [];
  public PopUpPreviewUrl: any;
  constructor(
    private formBuilder: FormBuilder,
    private _LocalStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _toasterService: ToastrService,
    private _BrandService: BrandService,
    private _CategoryService: CategoryService,
    private _productService: ProductService,
    private modalService: BsModalService,
    private _supplierService: SupplierService,
    private _lookupService: LookupService
  ) {
    this.LoggedInUserId = this._LocalStorage.getValueOnLocalStorage("LoggedInUserId");
    this.route.paramMap.subscribe((params: ParamMap) => {
      debugger
      this.ProductId = Number(params.get('productId'));
      if (this.ProductId > 0)
        this.LoadProduct();
    });
    this.ProductForm = this.formBuilder.group({
      productID: [0],
      productName: ['', Validators.required],
      shortDetails: ['', Validators.required],
      description: ['', Validators.required],
      supplierID: ['', Validators.required],
      categoryID: ['', Validators.required],
      subCategoryID: ['', Validators.required],
      brandId: ['', Validators.required],

      productAvailable: [false],
      CreatedBy: Number(this.LoggedInUserId),
      // CreatedDate:[''],
      Modifiedby: Number(this.LoggedInUserId),
      // ModifiedDate:[''],
      featured: [false],
      latest: [false],
      onSale: [false],
      topSelling: [false],
      hotOffer: [false],
      active: [false],
      bannerImg: ['', [Validators.required]],
      smallImg: ['', [Validators.required]],
      title: [''],
      subTitle: ['']
    });
    this.ProductDetailForm = this.formBuilder.group({
      productSizeColorId: [0],
      productId: [this.ProductId],
      qty: ['', Validators.required],
      price: ['', Validators.required],
      salePrice: ['', Validators.required],
      availableSize: [false],
      availableColors: [false],
      size: ['', Validators.required],
      color: ['', Validators.required],
      discount: [''],
      discountAvailable: [false],
      productImg: ['', [Validators.required]],
    });

  }
  ResetProductDetails() {
    this.ProductDetailForm = this.formBuilder.group({
      productSizeColorId: [0],
      productId: [this.ProductId],
      qty: ['', Validators.required],
      price: ['', Validators.required],
      salePrice: ['', Validators.required],
      availableSize: [false],
      availableColors: [false],
      size: ['', Validators.required],
      color: ['', Validators.required],
      discount: [''],
      discountAvailable: [false],
      productImg: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.LoadBrand();
    this.LoadCategory();

    this.LoadSupplier();
    this.LoadProductDetail();

    this._lookupService.GetActiveColor().subscribe(res => {
      this.lstColor = res;
    });

  }
  get f() { return this.ProductForm.controls; }
  get f1() { return this.ProductDetailForm.controls; }

  addMask(obj: Object) {
    this.DecimalMask = "0*.00";
    this.NumberMask = "0*";
    this.showMask = false;
  }

  LoadProductDetail() {

    this.spinner.show();
    let obj = {
      ProductId: this.ProductId
    };
    this._productService.GetProductSizeColorById(obj).subscribe(res => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(res);
    });
  }

  LoadBrand() {
    let obj = {
      Active: 1
    }
    this.spinner.show();
    this._BrandService.GetAllBrand(obj).subscribe(res => {
      //this.spinner.hide();
      this.lstBrand = res;
    });
  }

  LoadCategory() {
    let obj = {
      Active: 1
    }
    this.spinner.show();
    this._CategoryService.GetAllCategory(obj).subscribe(res => {
      //this.spinner.hide();
      this.lstCategory = res;
      this.LoadSubCategory("");
    });
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

  LoadSubCategory(event: any) {
    debugger
    if (this.ProductForm.value.categoryID != "") {
      let obj = {
        categoryID: Number(this.ProductForm.value.categoryID),
        Active: 1
      }
      this.spinner.show();
      this._CategoryService.GetAllSubCategory(obj).subscribe(res => {
        this.spinner.hide();
        this.lstSubCategory = res;
      });
    }
    else {
      this.lstSubCategory = [];
      this.spinner.hide();
    }
  }

  LoadProduct() {
    this.images = [];
    this.BannerImage = [];
    this.SmallImage = [];
    this.spinner.show();
    let obj = {
      ProductID: this.ProductId
    };
    debugger
    this._productService.GetProductById(obj).subscribe(res => {

      this.ProductForm = this.formBuilder.group({
        productID: [res[0].productID],
        productName: [res[0].productName, [Validators.required]],
        shortDetails: [res[0].shortDetails, Validators.required],
        description: [res[0].description, Validators.required],
        supplierID: [res[0].supplierID, Validators.required],
        categoryID: [res[0].categoryID, Validators.required],
        subCategoryID: [res[0].subCategoryID, Validators.required],
        brandId: [res[0].brandId, Validators.required],
        productAvailable: [res[0].productAvailable],
        CreatedBy: Number(this.LoggedInUserId),
        // CreatedDate:[res[0].productName],
        Modifiedby: Number(this.LoggedInUserId),
        // ModifiedDate:[res[0].productName],
        featured: [res[0].featured],
        latest: [res[0].latest],
        onSale: [res[0].onSale],
        topSelling: [res[0].topSelling],
        hotOffer: [res[0].hotOffer],
        active: [res[0].active],
        bannerImg: [res[0].bannerImg],
        smallImg: [res[0].smallImg, [Validators.required]],

        title: [res[0].title],
        subTitle: [res[0].subTitle]
      });
      //bannerImg
      if (res[0].bannerImg == null)
        this.previewUrl = null;
      else {
        this.previewUrl = res[0].bannerImg[0];
        for (let index = 0; index < res[0].bannerImg.length; index++) {
          this.BannerImage.push(res[0].bannerImg[index]);
        }
      }
      //smallImage
      if (res[0].bannerImg == null)
        this.previewUrl = null;
      else {
        //this.previewUrl = res[0].smallImg[0];
        for (let index = 0; index < res[0].smallImg.length; index++) {
          this.SmallImage.push(res[0].smallImg[index]);
        }
      }
      // //ProductImages
      // if (res[0].bannerImg == null)
      //   this.previewUrl = null;
      // else {
      //   //this.previewUrl = res[0].productImg[0];
      //   for (let index = 0; index < res[0].productImg.length; index++) {
      //     this.images.push(res[0].productImg[index]);
      //   }
      // }
      this.LoadSubCategory("");
    });
  }

  Save() {
    this.submitted = true;
    debugger
    if (this.ProductForm.invalid ||
      this.ProductForm.value.smallImg.length == 0) {
      this.ProductForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      let obj = {
        productID: Number(this.ProductForm.value.productID),
        productName: this.ProductForm.value.productName,
        shortDetails: this.ProductForm.value.shortDetails,
        description: this.ProductForm.value.description,
        supplierID: Number(this.ProductForm.value.supplierID),
        subCategoryID: Number(this.ProductForm.value.subCategoryID),
        brandId: Number(this.ProductForm.value.brandId),
        productAvailable: this.ProductForm.value.productAvailable,
        CreatedBy: Number(this.LoggedInUserId),
        Modifiedby: Number(this.LoggedInUserId),
        featured: this.ProductForm.value.featured,
        latest: this.ProductForm.value.latest,
        onSale: this.ProductForm.value.onSale,
        topSelling: this.ProductForm.value.topSelling,
        hotOffer: this.ProductForm.value.hotOffer,
        active: this.ProductForm.value.active,
        bannerImg: this.ProductForm.value.bannerImg,
        smallImg: this.ProductForm.value.smallImg,
        title: this.ProductForm.value.title,
        subTitle: this.ProductForm.value.subTitle
      };
      this._productService.SaveProduct(obj).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this.ProductId = res;
          this.LoadProduct();
          this._toasterService.success("Record has been saved successfully.");
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }

  SaveProductDetails() {
    this.submitted = true;
    debugger
    if (this.ProductDetailForm.invalid) {
      this.ProductDetailForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      let obj = {
        productSizeColorId: Number(this.ProductDetailForm.value.productSizeColorId),
        productId: Number(this.ProductId),
        qty: Number(this.ProductDetailForm.value.qty),
        price: Number(this.ProductDetailForm.value.price),
        salePrice: Number(this.ProductDetailForm.value.salePrice),
        availableSize: this.ProductDetailForm.value.availableSize,
        availableColors: this.ProductDetailForm.value.availableColors,
        size: this.ProductDetailForm.value.size,
        color: this.ProductDetailForm.value.color,
        discount: this.ProductDetailForm.value.discount == "" ? 0 : Number(this.ProductDetailForm.value.discount),
        discountAvailable: this.ProductDetailForm.value.discountAvailable,
        productImg: this.ProductDetailForm.value.productImg,
        CreatedBy: Number(this.LoggedInUserId),
        // CreatedDate:this.ProductForm.value.productName],
        Modifiedby: Number(this.LoggedInUserId),
        // ModifiedDate:this.ProductForm.value.productName],
      };
      this._productService.SaveProductSizeColor(obj).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this.images = [];
          this.LoadProductDetail();
          this.ResetProductDetails();
          this._toasterService.success("Record has been saved successfully.");
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }

  onBack() {
    this.router.navigate(['/product']);
  }

  UploadBannerImg(event) {
    debugger
    this.BannerImage = [];
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          debugger
          //console.log(event.target.result);
          this.BannerImage.push(event.target.result);
          this.previewUrl = event.target.result;
          this.ProductForm.updateValueAndValidity();
          this.ProductForm.patchValue({
            bannerImg: this.BannerImage
          });
          this.ProductForm.updateValueAndValidity();
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  UploadSmallImg(event) {
    this.SmallImage = [];
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          debugger
          //console.log(event.target.result);
          this.SmallImage.push(event.target.result);
          this.previewUrl = event.target.result;
          this.ProductForm.updateValueAndValidity();
          this.ProductForm.patchValue({
            smallImg: this.SmallImage
          });
          this.ProductForm.updateValueAndValidity();
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  UploadProductImages(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          debugger
          //console.log(event.target.result);
          this.images.push(event.target.result);
          this.previewUrl = event.target.result;
          this.ProductDetailForm.updateValueAndValidity();
          this.ProductDetailForm.patchValue({
            productImg: this.images
          });
          this.ProductDetailForm.updateValueAndValidity();
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImg(index, type) {
    const initialState = {
      title: "Confirmation",
      message: "Do you want to delete " + type + " image?",
    };
    this.bsModalRef = this.modalService.show(ConfirmBoxComponent, { ignoreBackdropClick: true, keyboard: true, class: 'modal-sm', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if (result) {
        debugger

        if (type == 'banner') {
          this.BannerImage.slice(index, 1);
          const bannerImg = this.ProductForm.value.bannerImg;
          bannerImg.splice(index, 1);
          this.ProductForm.updateValueAndValidity();
          this._toasterService.success("Image removed successfully.");
        }
        if (type == 'small') {
          this.SmallImage.slice(index, 1);
          const smallImg = this.ProductForm.value.smallImg;
          smallImg.splice(index, 1);
          this.ProductForm.updateValueAndValidity();
          this._toasterService.success("Image removed successfully.");
        }
        if (type == 'product') {
          this.images.slice(index, 1);

          const productImg = this.ProductDetailForm.value.productImg;
          productImg.splice(index, 1);
          this.ProductDetailForm.updateValueAndValidity();
          this._toasterService.success("Image removed successfully.");
        }
      }
    });
  }

  ShowImage(val) {
    this.previewUrl = val;
  }

  ShowPopUpImage(val) {
    this.PopUpPreviewUrl = val;
  }
  Edit(element) {
    this.images = [];
    this.ProductDetailForm = this.formBuilder.group({
      productSizeColorId: [element.productSizeColorId],
      productId: [element.productId],
      qty: [element.qty, Validators.required],
      price: [element.price, Validators.required],
      salePrice: [element.salePrice, Validators.required],
      availableSize: [element.availableSize],
      availableColors: [element.availableColors],
      size: [element.size, Validators.required],
      color: [element.color, Validators.required],
      discount: [element.discount],
      discountAvailable: [element.discountAvailable],
      productImg: [element.productImg, [Validators.required]],
    });
    //ProductImages
    if (element.productImg == null)
      this.previewUrl = null;
    else {
      //this.previewUrl = res[0].productImg[0];
      for (let index = 0; index < element.productImg.length; index++) {
        this.images.push(element.productImg[index]);
      }
    }
  }
  Delete(element) {
    const initialState = {
      title: "Confirmation",
      message: "Do you want to delete this record?",
    };
    this.bsModalRef = this.modalService.show(ConfirmBoxComponent, { ignoreBackdropClick: true, keyboard: true, class: 'modal-sm', initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe(result => {
      //console.log(`Dialog result: ${result}`);
      if (result) {
        let obj = {
          ProductSizeColorId: element.productSizeColorId
        };
        this.spinner.show();
        this._productService.DeleteProductSizeColor(obj).subscribe(res => {
          this.spinner.hide();
          this.LoadProductDetail();
          this._toasterService.success("Record has been deleted successfully.");
        });
      }
    });
  }


  OpenImagePopUp(template: TemplateRef<any>, lst) {
    debugger
    this.PopUpProductImg = lst.productImg;
    this.PopUpPreviewUrl = lst.productImg[0];
    const dialogRef = this.dialog.open(template, {
      width: '60vw',
      height: '80vh',
      data: lst
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
