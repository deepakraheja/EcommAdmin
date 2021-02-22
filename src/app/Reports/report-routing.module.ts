import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderReportComponent } from './order-report/order-report.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'orderReport', component: OrderReportComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportRoutingModule { }
