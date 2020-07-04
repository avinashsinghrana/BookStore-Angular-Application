import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SellerComponent } from './components/seller/seller.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { DisplayBooksComponent } from './components/display-books/display-books.component';
import { UserService } from './services/user.service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { SellerService } from './services/seller.service';
import { MessageService } from './services/message.service';
import { AuthguardService } from './services/authguard.service';
import { AuthserviceService } from './services/authservice.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AppMaterial } from "./app.material.module";
import { AsyncPipe } from '../../node_modules/@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplaybooksComponent } from './components/displaybooks/displaybooks.component';
import { BookSearchPipe } from './pipe/book-search.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { SortbypricePipe } from './pipe/sortbyprice.pipe';
import { NgxPaginationModule } from "ngx-pagination";
import { UserBooksComponent } from './components/user-books/user-books.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    AdminComponent,
    OrderConfirmationComponent,
    DashboardComponent,
    RegisterComponent,
    DashboardComponent,
    DisplaybooksComponent,
    BookSearchPipe,
    SortbypricePipe,
    UserBooksComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    SellerComponent,
    AddBookComponent,
    UpdateBookComponent,
    DisplayBooksComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    AppMaterial,
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxPaginationModule,
    MatPaginatorModule,
  ],
  providers: [AsyncPipe,UserService,SellerService, MessageService,AuthguardService,AuthserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
