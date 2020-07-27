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
import { FabricService } from 'src/app/Service/Fabric.service';
import { TagService } from 'src/app/Service/tag.service';
declare var $;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  ProductForm: FormGroup;
  ProductDetailForm: FormGroup;
  EditProductDetailForm: FormGroup;
  LoggedInUserId: string;
  lstBrand: any = [];
  lstMainCategory: any = [];
  lstCategory: any = [];
  lstSubCategory: any = [];
  lstSupplier: any = [];
  lstTag: any = [];
  lstFabric: any = [];
  lstFabricType: any = [];
  ProductId: any = 0;
  lstColor: any = [];
  lstSize: any = [];
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
  displayedImagesColumns: string[] = ['Upload', 'color', 'View'];
  ImagesdataSource = new MatTableDataSource<any>(this.lstData);

  displayedColumns: string[] = ['color', 'size', 'setNo', 'qty', 'price', 'salePrice', 'availableSize', 'availableColors', 'discount', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<any>(this.lstData);

  displayedSetImagesColumns: string[] = ['Upload', 'setNo', 'View'];
  SetImagesdataSource = new MatTableDataSource<any>(this.lstData);

  PopUpProductImg = [];
  public SelectedProductSizeColorId: Number = 0;
  public SelectedProductSizeId: Number = 0;
  public PopUpPreviewUrl: any;
  public IsShow: boolean = false;
  public IsDisabled: boolean = false;
  SelectedSetNo: Number = 0;
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
    private _lookupService: LookupService,
    private _FabricService: FabricService,
    private _TagService: TagService
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
      mainCategoryID: ['', Validators.required],
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
      active: [true],
      bannerImg: [''],
      smallImg: ['', [Validators.required]],
      title: [''],
      subTitle: [''],
      tagId: ['0'],
      articalNo: [''],
      fabricId: ['0'],
      fabricTypeId: ['0'],
      setType: [1],
      minimum: [''],
      videoURL: ['']
    });

    this.ProductDetailForm = this.formBuilder.group({
      productSizeColorId: [0],
      productId: [this.ProductId],
      qty: ['', Validators.required],
      price: ['', Validators.required],
      salePrice: ['', Validators.required],
      availableSize: [true],
      availableColors: [true],
      arraySize: ['', Validators.required],
      arrayColor: ['', Validators.required],
      // discount: [''],
      // discountAvailable: [false],
      //productImg: ['', [Validators.required]],
    });

    this.EditProductDetailForm = this.formBuilder.group({
      productSizeColorId: [0],
      productId: [this.ProductId],
      qty: ['', Validators.required],
      price: ['', Validators.required],
      salePrice: ['', Validators.required],
      availableSize: [false],
      availableColors: [false],
      size: ['', Validators.required],
      setNo: this.ProductForm.value.setType != 2 ? [''] : ['', Validators.required],
      lookupColorId: ['', Validators.required],
      discount: [''],
      discountAvailable: [false],
      //productImg: ['', [Validators.required]],
    });
    this.fnGetMainCategory();
    this.LoadBrand();
    this.LoadCategory("");
    this.LoadSupplier();
    this.LoadTag();
    this.LoadFabric();
  }
  ResetProductDetails() {
    this.ProductDetailForm = this.formBuilder.group({
      productSizeColorId: [0],
      productId: [this.ProductId],
      qty: ['', Validators.required],
      price: ['', Validators.required],
      salePrice: ['', Validators.required],
      availableSize: [true],
      availableColors: [true],
      arraySize: ['', Validators.required],
      arrayColor: ['', Validators.required],
      // discount: [''],
      // discountAvailable: [false],
      //productImg: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.LoadProductDetail();
    this._lookupService.GetActiveColor().subscribe(res => {
      this.lstColor = res;
    });
    this._lookupService.GetActiveSize().subscribe(res => {
      this.lstSize = res;
    });

  }
  get f() { return this.ProductForm.controls; }
  get f1() { return this.ProductDetailForm.controls; }
  get f2() { return this.EditProductDetailForm.controls; }

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
      this.lstData = res;
      this.dataSource = new MatTableDataSource<any>(res);
      if (res.length > 0) {
        this.IsDisabled = true;
      }
      else {
        this.IsDisabled = false;
      }
      var resArr = [];
      debugger
      if (this.ProductForm.value.setType != 2) {
        // Color Images Grid
        res.forEach(function (item) {
          var i = resArr.findIndex(x => x.color == item.color);
          if (i <= -1) {
            resArr.push({ productSizeColorId: item.productSizeColorId, color: item.color, productImg: item.productImg });
          }
        });
        this.ImagesdataSource = new MatTableDataSource<any>(resArr);
      }
      // Set Images Grid
      if (this.ProductForm.value.setType == 2) {
        res.forEach(function (item) {
          var i = resArr.findIndex(x => x.setNo == item.setNo);
          if (i <= -1) {
            if (item.setNo > 0)
              resArr.push({ productSizeColorId: item.productSizeColorId, setNo: item.setNo, productImg: item.productImg });
          }
        });
        this.SetImagesdataSource = new MatTableDataSource<any>(resArr);
      }
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

  fnGetMainCategory() {
    let obj =
      {}
    this.spinner.show();
    this._CategoryService.GetAllMainCategory(obj)
      .subscribe(res => {
        this.lstMainCategory = res
        this.spinner.hide();
        this.LoadCategory("");
      });
  }

  LoadCategory(event: any) {
    let obj = {
      MainCategoryID: Number(this.ProductForm.value.mainCategoryID),
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

  LoadTag() {
    let obj = {
      Active: 1
    }
    this.spinner.show();
    this._TagService.GetTag(obj).subscribe(res => {
      this.lstTag = res;
    });
  }

  LoadFabric() {
    let obj = {
      IsActive: 1
    }
    this.spinner.show();
    this._FabricService.GetFabric(obj).subscribe(res => {
      this.lstFabric = res;
      this.LoadFabricType("");
    });
  }

  LoadFabricType(event: any) {
    debugger
    if (this.ProductForm.value.fabricId != "") {
      let obj = {
        FabricId: Number(this.ProductForm.value.fabricId),
        Active: 1
      }
      this.spinner.show();
      this._FabricService.GetAllFabricType(obj).subscribe(res => {
        this.spinner.hide();
        this.lstFabricType = res;
      });
    }
    else {
      this.lstFabricType = [];
      this.spinner.hide();
    }
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
        mainCategoryID: [res[0].mainCategoryID, Validators.required],
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
        subTitle: [res[0].subTitle],
        tagId: [res[0].tagId],
        articalNo: [res[0].articalNo],
        fabricId: [res[0].fabricId],
        fabricTypeId: [res[0].fabricTypeId],
        setType: [res[0].setType],
        minimum: [res[0].minimum],
        videoURL: [res[0].videoURL]
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
      //this.LoadSubCategory("");
      this.LoadFabricType("");
    });
  }

  Save() {
    this.submitted = true;
    debugger
    if (this.ProductForm.invalid ||
      this.ProductForm.value.smallImg.length == 0) {
      this.ProductForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      //$('#productName').focus();
      if (this.ProductForm.value.productName == '' ||
        this.ProductForm.value.brandId == '' ||
        this.ProductForm.value.mainCategoryID == '' ||
        this.ProductForm.value.categoryID == '' ||
        this.ProductForm.value.subCategoryID == '' ||
        this.ProductForm.value.supplierID == '') {
        $('#tab1').click();
      }
      else if (this.ProductForm.value.smallImg.length == 0) {
        $('#tab5').click();
      }
      else if (this.ProductForm.value.shortDetails == '' ||
        this.ProductForm.value.description == '') {
        $('#tab2').click();
        //$('#shortDetails').focus();
      }
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
        subTitle: this.ProductForm.value.subTitle,
        tagId: Number(this.ProductForm.value.tagId),
        articalNo: this.ProductForm.value.articalNo,
        fabricId: Number(this.ProductForm.value.fabricId),
        fabricTypeId: Number(this.ProductForm.value.fabricTypeId),
        setType: Number(this.ProductForm.value.setType),
        minimum: this.ProductForm.value.setType == "3" ? Number(this.ProductForm.value.minimum) : 0,
        videoURL: this.ProductForm.value.videoURL
      };
      this._productService.SaveProduct(obj).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this.ProductId = res;
          this.LoadProduct();
          this.route.paramMap.subscribe((params: ParamMap) => {
            debugger
            if (params.get('productId') == null || params.get('productId') == undefined)
              $('#tab4').click();
          });
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
        arraySize: this.ProductDetailForm.value.arraySize,
        arrayColor: this.ProductDetailForm.value.arrayColor,
        // discount: this.ProductDetailForm.value.discount == "" ? 0 : Number(this.ProductDetailForm.value.discount),
        // discountAvailable: this.ProductDetailForm.value.discountAvailable,
        // productImg: this.ProductDetailForm.value.productImg,
        CreatedBy: Number(this.LoggedInUserId),
        // CreatedDate:this.ProductForm.value.productName],
        Modifiedby: Number(this.LoggedInUserId),
        // ModifiedDate:this.ProductForm.value.productName],
      };
      this._productService.SaveProductSizeColor(obj).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this.IsShow = false;
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

  UpdateProductDetails() {
    this.submitted = true;
    debugger
    if (this.EditProductDetailForm.invalid) {
      this.EditProductDetailForm.markAllAsTouched();
      this._toasterService.error("All the * marked fields are mandatory");
      return;
    }
    else {
      this.spinner.show();
      let obj = {
        productSizeColorId: Number(this.EditProductDetailForm.value.productSizeColorId),
        productSizeId: Number(this.EditProductDetailForm.value.productSizeId),
        productId: Number(this.ProductId),
        qty: Number(this.EditProductDetailForm.value.qty),
        price: Number(this.EditProductDetailForm.value.price),
        salePrice: Number(this.EditProductDetailForm.value.salePrice),
        availableSize: this.EditProductDetailForm.value.availableSize,
        availableColors: this.EditProductDetailForm.value.availableColors,
        size: this.EditProductDetailForm.value.size,
        setNo: this.EditProductDetailForm.value.setNo,
        lookupColorId: Number(this.EditProductDetailForm.value.lookupColorId),
        discount: this.EditProductDetailForm.value.discount == "" ? 0 : Number(this.EditProductDetailForm.value.discount),
        discountAvailable: this.EditProductDetailForm.value.discountAvailable,
        CreatedBy: Number(this.LoggedInUserId),
        Modifiedby: Number(this.LoggedInUserId),
      };
      this._productService.SaveProductSizeColor(obj).subscribe(res => {
        this.spinner.hide();
        if (res > 0) {
          this.images = [];
          this.LoadProductDetail();
          //this.ResetProductDetails();
          this._toasterService.success("Record has been saved successfully.");
        }
        else {
          this._toasterService.error("Server error, Please try again after some time.");
        }
      });
    }
  }

  SaveProductColorSizeImages() {
    let obj = {
      ProductId: Number(this.ProductId),
      ProductSizeColorId: this.SelectedProductSizeColorId,
      ProductSizeId: this.SelectedProductSizeId,
      productImg: this.PopUpProductImg,
      SetNo: this.SelectedSetNo
    };
    this.spinner.show();
    this._productService.SaveProductSizeColorImages(obj).subscribe(res => {
      this.spinner.hide();
      this._toasterService.success("Images has been uploaded successfully.");
    });
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
          this.PopUpProductImg.push(event.target.result);
          this.PopUpPreviewUrl = event.target.result;
          // this.EditProductDetailForm.updateValueAndValidity();
          // this.EditProductDetailForm.patchValue({
          //   productImg: this.images
          // });
          // this.EditProductDetailForm.updateValueAndValidity();
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
          this.BannerImage.splice(index, 1);
          const bannerImg = this.ProductForm.value.bannerImg;
          bannerImg.splice(index, 1);
          this.ProductForm.updateValueAndValidity();
          this._toasterService.success("Image removed successfully.");
        }
        if (type == 'small') {
          this.SmallImage.splice(index, 1);
          const smallImg = this.ProductForm.value.smallImg;
          smallImg.splice(index, 1);
          this.ProductForm.updateValueAndValidity();
          this._toasterService.success("Image removed successfully.");
        }
        if (type == 'product') {
          debugger
          //var ProductLst=this.PopUpProductImg;
          this.PopUpProductImg.splice(index, 1);
          //this.PopUpProductImg=ProductLst;
          // const productImg = this.EditProductDetailForm.value.productImg;
          // productImg.splice(index, 1);
          // this.EditProductDetailForm.updateValueAndValidity();
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
    debugger
    //this.images = [];
    this.lstData.forEach(element => {
      element.isEdit = false;
    });
    element.isEdit = true;
    this.EditProductDetailForm = this.formBuilder.group({
      productSizeColorId: [element.productSizeColorId],
      productSizeId: [element.productSizeId],
      productId: [element.productId],
      qty: [element.qty, Validators.required],
      price: [element.price, Validators.required],
      salePrice: [element.salePrice, Validators.required],
      availableSize: [element.availableSize],
      availableColors: [element.availableColors],
      size: [element.size, Validators.required],
      setNo: this.ProductForm.value.setType != 2 ? [element.setNo] : [element.setNo, Validators.required],
      lookupColorId: [element.lookupColorId, Validators.required],
      discount: [element.discount],
      discountAvailable: [element.discountAvailable],
      //productImg: [element.productImg, [Validators.required]],
    });

  }

  Close(element) {
    element.isEdit = false;
  }
  Delete(element) {
    debugger
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
          ProductSizeColorId: element.productSizeColorId,
          ProductSizeId: element.productSizeId,
          ProductId: Number(this.ProductId),
          SetNo: Number(element.setNo)
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
    this.SelectedProductSizeColorId = lst.productSizeColorId;
    //this.SelectedProductSizeId = lst.productSizeId;
    this.PopUpProductImg = lst.productImg;
    this.PopUpPreviewUrl = lst.productImg[0];
    this.SelectedSetNo = lst.setNo;
    const dialogRef = this.dialog.open(template, {
      width: '60vw',
      height: '80vh',
      data: lst
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      this.SelectedProductSizeColorId = 0;
      this.SelectedSetNo = 0;
      //this.SelectedProductSizeId = 0;
      this.LoadProductDetail();
    });
  }
}
