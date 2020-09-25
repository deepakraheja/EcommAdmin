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
      { path: 'MainCategory', component: MainCategoryComponent },
      { path: 'Category', component: CategoryComponent },
      { path: 'SubCategory', component: SubCategoryComponent },
      { path: 'brand', component: BrandComponent },
      { path: 'product', component: ProductComponent },
      { path: 'productdetail', component: ProductDetailComponent },
      { path: 'productdetail/:productId', component: ProductDetailComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'fabric', component: FabricComponent },
      { path: 'fabricType', component: FabricTypeComponent },
      { path: 'tagMaster', component: TagMasterComponent },
      { path: 'order', component: OrderComponent },
      { path: 'user', component: MngUserComponent },
      { path: 'CreateEmail', component: CreateEmailComponent },
      { path: 'agent', component: MngAgentComponent },
      { path: 'transport', component: TransportComponent },
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
