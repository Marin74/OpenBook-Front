import { Component, OnInit } from '@angular/core';
import {Author} from "../../models/Author.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/Book.model";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  author: Author;
  books: Book[];

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.author = new Author("");
    const id = this.route.snapshot.params["id"];
    this.booksService.getAuthor(+id).then(
      (jsonResponse: any) => {
        //this.author = author;
        this.author = jsonResponse["author"];
        if("books" in jsonResponse) {
          this.books = jsonResponse["books"];
        }
      }
    );// "+id" to cast "id"
  }

  onBack() {
    this.router.navigate(["/books"])
  }
}
