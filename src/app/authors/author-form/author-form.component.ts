import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {Router} from "@angular/router";
import {Book} from "../../models/Book.model";
import {Author} from "../../models/Author.model";

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {

  authorForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authorForm = this.formBuilder.group({
        name: ['', Validators.required]
      }
    );
  }

  onSaveAuthor() {
    const name = this.authorForm.get("name").value;
    const newAuthor = new Author(name);
    this.booksService.createNewAuthor(newAuthor);
    this.router.navigate(["/authors"]);
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
