import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AppFooterComponent } from './layout/app-footer/app-footer.component';

import { AppSidebarComponent } from './layout/app-sidebar/app-sidebar.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AppHeaderComponent } from './layout/app-header/app-header.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppFooterComponent,
    AppSidebarComponent,
    AppLayoutComponent,
    AppHeaderComponent,
    LoginComponent,
    DashboardComponent],
  imports: [
    CommonModule,
    AgentRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
  ]
})
export class AgentModule { }
