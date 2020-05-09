import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './books/book/book.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import {AuthService} from "./services/auth.service";
import {BooksService} from "./services/books.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AuthorComponent } from './authors/author/author.component';
import { AuthorsComponent } from './authors/authors.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BooksComponent,
    BookComponent,
    BookFormComponent,
    HeaderComponent,
    AuthorComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    BooksService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
