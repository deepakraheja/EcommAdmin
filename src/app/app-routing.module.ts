import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { HomeComponent } from './Records/home/home.component';
import { UnAuthComponent } from './un-auth/un-auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CategoryComponent } from './Admin/category/category.component';
import { SubCategoryComponent } from './Admin/sub-category/sub-category.component';
import { BrandComponent } from './Admin/brand/brand.component';
import { ProductComponent } from './Admin/product/product.component';
import { ProductDetailComponent } from './Admin/product-detail/product-detail.component';
import { SupplierComponent } from './Admin/supplier/supplier.component';


const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'unauth', component: UnAuthComponent },
      { path: 'Category', component: CategoryComponent },
      { path: 'SubCategory', component: SubCategoryComponent },
      { path: 'brand', component: BrandComponent },
      { path: 'product', component: ProductComponent },
      { path: 'productdetail', component: ProductDetailComponent },
      { path: 'productdetail/:productId', component: ProductDetailComponent },
      { path: 'supplier', component: SupplierComponent },
    ]
  },
  { path: 'confrimBox', component: ConfirmBoxComponent, },
  { path: '**', component: AdminLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
