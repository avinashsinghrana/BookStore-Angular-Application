
import {OrderConfirmationComponent} from "./components/order-confirmation/order-confirmation.component";
//import {DashboardComponent} from "./dashboard/dashboard.component";
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplaybooksComponent } from './components/displaybooks/displaybooks.component';
import { UserBooksComponent } from './components/user-books/user-books.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
