import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';

import { MatCardModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppMaterial } from "./app.material.module";
import { AsyncPipe } from '../../node_modules/@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
   // DragDropModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
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
    //MatSidenavModule,
    //MatToolbarModule,
    MatMenuModule,
    //MatTooltipModule,
    MatSnackBarModule,
    AppMaterial,
    BrowserModule,
  ],
  providers: [AsyncPipe,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
