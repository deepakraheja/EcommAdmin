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
import { FabricComponent } from './Admin/fabric/fabric.component';
import { FabricTypeComponent } from './Admin/fabric-type/fabric-type.component';
import { TagMasterComponent } from './Admin/tag-master/tag-master.component';
import { OrderComponent } from './Admin/order/order.component';
import { MainCategoryComponent } from './Admin/main-category/main-category.component';
import { MngUserComponent } from './Admin/mng-user/mng-user.component';
import { CreateEmailComponent } from './Admin/create-email/create-email.component';
import { MngAgentComponent } from './Admin/mng-agent/mng-agent.component';
import { TransportComponent } from './Admin/transport/transport.component';
import { MngCustomerComponent } from './Admin/mng-customer/mng-customer.component';


const routes: Routes = [

  {
    path: 'service',
    loadChildren: () => import('./modules/agent/agent.module').then(m => m.AgentModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/agent/agent.module').then(m => m.AgentModule)
  },
  { path: '', component: AdminLoginComponent },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'unauth', component: UnAuthComponent },
      { path: 'MainCategory', component: MainCategoryComponent, canActivate: [AuthGuard] },
      { path: 'Category', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'SubCategory', component: SubCategoryComponent, canActivate: [AuthGuard] },
      { path: 'brand', component: BrandComponent, canActivate: [AuthGuard] },
      { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
      { path: 'productdetail', component: ProductDetailComponent, canActivate: [AuthGuard] },
      { path: 'productdetail/:productId', component: ProductDetailComponent, canActivate: [AuthGuard] },
      { path: 'supplier', component: SupplierComponent, canActivate: [AuthGuard] },
      { path: 'fabric', component: FabricComponent, canActivate: [AuthGuard] },
      { path: 'fabricType', component: FabricTypeComponent, canActivate: [AuthGuard] },
      { path: 'tagMaster', component: TagMasterComponent, canActivate: [AuthGuard] },
      { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
      { path: 'user', component: MngUserComponent, canActivate: [AuthGuard] },
      { path: 'customer', component: MngCustomerComponent, canActivate: [AuthGuard] },
      { path: 'CreateEmail', component: CreateEmailComponent, canActivate: [AuthGuard] },
      { path: 'agent', component: MngAgentComponent, canActivate: [AuthGuard] },
      { path: 'transport', component: TransportComponent, canActivate: [AuthGuard] },
      {
        path: 'report',
        loadChildren: () => import('./Reports/report.module').then(m => m.ReportModule)
      },
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
