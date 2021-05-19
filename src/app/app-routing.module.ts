import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {BooksComponent} from "./books/books.component";
import {BookFormComponent} from "./books/book-form/book-form.component";
import {BookComponent} from "./books/book/book.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthorComponent} from "./authors/author/author.component";
import {AuthorsComponent} from "./authors/authors.component";
import {AuthorFormComponent} from "./authors/author-form/author-form.component";


const routes: Routes = [
  { path: "auth/signup", component: SignupComponent },
  { path: "auth/signin", component: SigninComponent },
  { path: "books/new", canActivate: [AuthGuardService], component: BookFormComponent },
  { path: "authors/new", canActivate: [AuthGuardService], component: AuthorFormComponent },
  { path: "books", component: BooksComponent },
  { path: "books/:id", component: BookComponent },
  { path: "authors", component: AuthorsComponent },
  { path: "authors/:id", component: AuthorComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '%%', redirectTo: 'books' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
