import { Component, OnInit } from '@angular/core';
import {Author} from "../models/Author.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../services/books.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  authors: Author[];

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.booksService.getAuthors().then(
      (jsonResponse: any) => {
        this.authors = jsonResponse["authors"];
      }
    );
  }

  onViewAuthor(id: number) {
    this.router.navigate(["/authors", id]);
  }

  onNewAuthor() {
    this.router.navigate(["/authors", "new"]);
  }
}
