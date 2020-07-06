
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
//import {DashboardComponent} from "./dashboard/dashboard.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplaybooksComponent } from './components/displaybooks/displaybooks.component';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { SellerComponent } from './components/seller/seller.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { DisplayBooksComponent } from './components/display-books/display-books.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { AuthguardService } from './services/authguard.service';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: "admin",
    component: AdminDashboardComponent,
  },
  {
    path: 'adminbooks',
    component: AdminComponent
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  
  { path: 'order-summary', component:OrderSummaryComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
 // { path: 'dashboard', component: DashboardComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      /*{ path: '', redirectTo: 'display-books', pathMatch: 'full' },
      {
        path: 'display-books',
        component: DisplayBooksComponent
      },*/
      { path: "books", component: DisplaybooksComponent },
      //{ path: 'userbooks', component: UserBooksComponent },*/
    ],
  },
  { path: 'addbook', 
    component: AddBookComponent 
  },
  { path: 'updateBook', component: UpdateBookComponent },
  {
    path: 'sellerDashboard',
    component: SellerComponent,
    children: [
      { path: '', redirectTo: 'display-books', pathMatch: 'full' },
      {
        path: 'display-books',
        component: DisplayBooksComponent
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
