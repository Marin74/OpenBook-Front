import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {Book} from "../../models/Book.model";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;// TODO Delete later
  /*fileUrl: string;
  fileUploaded = false;*/

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
        title: ['', Validators.required],
        //author: ['', Validators.required],
        publicationYear: null,//['', Validators.pattern("/^[0-9]*$/")],// TODO Does not work
        summary: ''
      }
    );
  }

  onSaveBook() {
    const title = this.bookForm.get("title").value;
    //const author = this.bookForm.get("author").value;
    const publicationYear = this.bookForm.get("publicationYear").value;
    const summary = this.bookForm.get("summary").value;
    const newBook = new Book(title);
    newBook.publicationYear = publicationYear;
    newBook.summary = summary;
    /*if(this.fileUrl && this.fileUrl !== "") {
      newBook.picture = this.fileUrl;
    }*/
    this.booksService.createNewBook(newBook);
    this.router.navigate(["/books"]);
  }

  /*onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }*/
}
