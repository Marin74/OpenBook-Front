import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../models/Book.model";
import {Subscription} from "rxjs/Subscription";
import {BooksService} from "../services/books.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBooks();
    this.booksService.getBooks();
  }

  onNewBook() {
    this.router.navigate(["/books", "new"]);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(["/books/", id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }
}
