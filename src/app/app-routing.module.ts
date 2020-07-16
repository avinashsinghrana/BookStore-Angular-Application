import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
//import {DashboardComponent} from "./dashboard/dashboard.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
//import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { DisplaybooksComponent } from './components/displaybooks/displaybooks.component';
//import { UserBooksComponent } from './components/user-books/user-books.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { SellerComponent } from './components/seller/seller.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { DisplayBooksComponent } from './components/display-books/display-books.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { AuthguardService } from './services/authguard.service';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { DisplayBookComponent } from './components/display-book/display-book.component';
import { UserComponent } from './components/user/user.component';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { AdminBooksComponent } from './components/admin-books/admin-books.component';
import { AdminsComponent } from './components/admins/admins.component';
import { VerifydialogComponent } from './components/verifydialog/verifydialog.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  /*{
    path: "admin",
    component: AdminDashboardComponent,
  },
  {
    path: 'adminbooks',
    component: AdminComponent
  },*/
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
  },
  {
    path: 'verifydialog',
    component: VerifydialogComponent,
  },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },

  { path: 'addbook', component: AddBookComponent },
  { path: 'updateBook', component: UpdateBookComponent },
  {
    path: 'adminDashboard',
    component: AdminsComponent,
    children: [
      { path: '', redirectTo: 'admin-books', pathMatch: 'full' },
      {
        path: 'admin-books',
        component: AdminBooksComponent,
      },
    ],
  },
  {
    path: 'user-dashboard',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'user-books', pathMatch: 'full' },
      {
        path: 'user-books',
        component: UserBooksComponent,
      },
    ],
  },
  {
    path: 'sellerDashboard',
    component: SellerComponent,
    children: [
      { path: '', redirectTo: 'display-books', pathMatch: 'full' },
      {
        path: 'display-books',
        component: DisplayBooksComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
