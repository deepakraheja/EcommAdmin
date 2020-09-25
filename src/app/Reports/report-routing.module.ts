import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderReportComponent } from './order-report/order-report.component';

const routes: Routes = [
  { path: 'orderReport', component: OrderReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReportRoutingModule { }
