
import {OrderConfirmationComponent} from "./components/order-confirmation/order-confirmation.component";
//import {DashboardComponent} from "./dashboard/dashboard.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
<<<<<<< HEAD
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { SellerComponent } from './components/seller/seller.component';
=======
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplaybooksComponent } from './components/displaybooks/displaybooks.component';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
>>>>>>> 2ee99f1be1219c9c45dcce9a49fd9a67f9ceef27

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
<<<<<<< HEAD
   {
    path: "admin",
    component: AdminDashboardComponent,
  },
  {
    path:'adminbooks',
     component:AdminComponent
  },
  {
    path:'seller',
    component:SellerComponent
=======
  {
    path:'resetpassword',
    component:ResetpasswordComponent 
  },
  {
    path:'forgotpassword',
    component: ForgotpasswordComponent
  },
  {path: 'order-confirmation', component: OrderConfirmationComponent},
  {path: 'dashboard', component:DashboardComponent},
    {
      path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: "books", component: DisplaybooksComponent },
      {path : 'userbooks',component : UserBooksComponent}
    ],
>>>>>>> 2ee99f1be1219c9c45dcce9a49fd9a67f9ceef27
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
