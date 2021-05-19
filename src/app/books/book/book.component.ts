import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/Book.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-single-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.book = new Book("");
    const id = this.route.snapshot.params["id"];
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );// "+id" to cast "id"
  }

  onBack() {
    this.router.navigate(["/books"])
  }
}
