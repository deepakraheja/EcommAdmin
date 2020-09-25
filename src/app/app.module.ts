import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { AppHeaderComponent } from './_layout/app-header/app-header.component';
import { AppSidebarComponent } from './_layout/app-sidebar/app-sidebar.component';

import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';

import { NgxMaskModule } from 'ngx-mask'
import { StorageServiceModule } from 'ngx-webstorage-service';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { SafePipeModule } from 'safe-pipe';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AppFooterComponent } from './_layout/app-footer/app-footer.component';
import { UnAuthComponent } from './un-auth/un-auth.component';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule, MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GlobalConstantsService } from './Service/global-constants.service';
import { CategoryComponent } from './Admin/category/category.component';
import { SubCategoryComponent } from './Admin/sub-category/sub-category.component';
import { BrandComponent } from './Admin/brand/brand.component';
import { ProductComponent } from './Admin/product/product.component';
import { ProductDetailComponent } from './Admin/product-detail/product-detail.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SupplierComponent } from './Admin/supplier/supplier.component';
import { FabricComponent } from './Admin/fabric/fabric.component';
import { FabricTypeComponent } from './Admin/fabric-type/fabric-type.component';
import { TagMasterComponent } from './Admin/tag-master/tag-master.component';
import { OrderComponent } from './Admin/order/order.component';
import { MainCategoryComponent } from './Admin/main-category/main-category.component';
import { MngUserComponent } from './Admin/mng-user/mng-user.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CreateEmailComponent } from './Admin/create-email/create-email.component';
import { MngAgentComponent } from './Admin/mng-agent/mng-agent.component';
import { TransportComponent } from './Admin/transport/transport.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppLayoutComponent,
    AdminLoginComponent,
    AppSidebarComponent,
    ConfirmBoxComponent,
    HomeComponent,
    UnAuthComponent,
    CategoryComponent,
    SubCategoryComponent,
    BrandComponent,
    ProductComponent,
    ProductDetailComponent,
    ConfirmationComponent,
    SupplierComponent,
    FabricComponent,
    FabricTypeComponent,
    TagMasterComponent,
    OrderComponent,
    MainCategoryComponent,
    MngUserComponent,
    CreateEmailComponent,
    MngAgentComponent,
    TransportComponent

  ],
  imports: [
    SafePipeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true
    }), // ToastrModule added  
    StorageServiceModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatCheckboxModule,
    MatAutocompleteModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatListModule,
    MatCardModule,
    MatSortModule,
    MatSidenavModule,
    MatChipsModule,
    AngularEditorModule,
  ],
  providers: [DatePipe, CurrencyPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    GlobalConstantsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
