import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderFormComponent } from './order-form/order-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserOrderListComponent } from './user-order-list/user-order-list.component';

const routes: Routes = [
  { path: 'edit', component: OrderFormComponent},
  { path: 'list', component: UserOrderListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
