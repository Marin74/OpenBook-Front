import { Injectable } from '@angular/core';
import {Book} from "../models/Book.model";
import {Subject} from "rxjs/Subject";
import * as firebase from "firebase";
import {HttpClient} from "@angular/common/http";
import {JsonArray} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {Author} from "../models/Author.model";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  API_BASE = "https://api.openbook.marindauriat.fr/";
  //API_BASE = "http://localhost:8888/OpenBook/public/index.php/";
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor(private httpClient: HttpClient) { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks(book: Book) {
    //firebase.database().ref("/books").set(this.books);

    return new Promise(
      (resolve, reject) => {

        this.httpClient.post(
          this.API_BASE+"books/new",
          book
        ).subscribe(
          (response) => {
            alert("ok");
            alert(response);
          },
          (error) => {
            alert(error);
          }
        );

        /*this.httpClient.get<JsonArray[]>(
          this.API_BASE+"books/new"
        ).subscribe(
          (response) => {
            if("book" in response) {
              //this.books = response["book"];
              //this.createNewBook(response["book"]);
              //this.emitBooks();
              resolve(response["book"]);
            }
            else {
              console.log(response["errors"]);
              reject(response["errors"]);
            }
            console.log("Données récupérées en base de données");
          },
          (error) => {
            reject(error);
            console.log("Erreur lors de la récupération des données : " + error)
          }
        );*/
      }
    );
  }

  getBooks() {
    /*firebase.database().ref("/books").on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );*/

    this.httpClient.get<JsonArray[]>(
      this.API_BASE+"books"
    ).subscribe(
      (response) => {
        if("books" in response) {
          this.books = response["books"];
          this.emitBooks();
        }
        else {
          console.log(response["errors"]);
        }
        console.log("Données récupérées en base de données");
      },
      (error) => {
        console.log("Erreur lors de la récupération des données : " + error)
      }
    );
  }

  getSingleBook(id: number) {
    /*return new Promise(
      (resolve, reject) => {
        firebase.database().ref("/books/" + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );*/

    return new Promise(
      (resolve, reject) => {

        this.httpClient.get<JsonArray[]>(
          this.API_BASE+"books/"+id
        ).subscribe(
          (response) => {
            if("book" in response) {
              //this.books = response["book"];
              //this.createNewBook(response["book"]);
              //this.emitBooks();
              resolve(response["book"]);
            }
            else {
              console.log(response["errors"]);
              reject(response["errors"]);
            }
            console.log("Données récupérées en base de données");
          },
          (error) => {
            reject(error);
            console.log("Erreur lors de la récupération des données : " + error)
          }
        );
      }
    );
  }

  getAuthor(id: number) {
    return new Promise(
      (resolve, reject) => {

        this.httpClient.get<JsonArray[]>(
          this.API_BASE+"authors/"+id
        ).subscribe(
          (response) => {
            if("author" in response) {
              //this.books = response["book"];
              //this.createNewBook(response["book"]);
              //this.emitBooks();
              //resolve(response["author"]);
              resolve(response);
            }
            else {
              console.log(response["errors"]);
              reject(response["errors"]);
            }
            console.log("Données récupérées en base de données");
          },
          (error) => {
            reject(error);
            console.log("Erreur lors de la récupération des données : " + error)
          }
        );
      }
    );
  }

  getAuthors() {
    return new Promise(
      (resolve, reject) => {

        this.httpClient.get<JsonArray[]>(
          this.API_BASE+"authors"
        ).subscribe(
          (response) => {
            if("authors" in response) {
              //this.books = response["book"];
              //this.createNewBook(response["book"]);
              //this.emitBooks();
              //resolve(response["author"]);
              resolve(response);
            }
            else {
              console.log(response["errors"]);
              reject(response["errors"]);
            }
            console.log("Données récupérées en base de données");
          },
          (error) => {
            reject(error);
            console.log("Erreur lors de la récupération des données : " + error)
          }
        );
      }
    );
  }

  getGenres() {
    return new Promise(
      (resolve, reject) => {

        this.httpClient.get<JsonArray[]>(
          this.API_BASE+"genres"
        ).subscribe(
          (response) => {
            if("genres" in response) {
              resolve(response["genres"]);
            }
            else {
              console.log(response["errors"]);
              reject(response["errors"]);
            }
            console.log("Données récupérées en base de données");
          },
          (error) => {
            reject(error);
            console.log("Erreur lors de la récupération des données : " + error)
          }
        );
      }
    );
  }

  createNewBook(book: Book) {
    this.books.push(book);
    this.saveBooks(book);
    this.emitBooks();
  }

  createNewAuthor(author: Author) {

    this.httpClient.post(this.API_BASE+"authors/new",
      {
        "name": author.name
      })
      .subscribe(
        (val) => {
          alert("ok1");
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          alert("ok2");
          console.log("POST call in error", response);
        },
        () => {
          alert("ok3");
          console.log("The POST observable is now completed.");
        });

    /*return new Promise(
      (resolve, reject) => {

        this.httpClient.post(
          this.API_BASE+"authors/new",
          //author
          {"name": author.name}
        ).subscribe(
          (response) => {
            alert("ok");
            alert(response);
          },
          (error) => {
            alert("erreur");
            alert(error);
          }
        );
      }
    );*/
  }

  removeBook(book: Book) {
    if(book.picture) {
      const storageRef = firebase.storage().refFromURL(book.picture);
      storageRef.delete().then(
        () => {
          console.log("Photo supprimée");
        }
      ).catch(
        (error) => {
          console.log("Erreur lors de la suppression de la photo : " + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );

    this.books.splice(bookIndexToRemove, 1);
    //this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const child = firebase.storage().ref()
          .child("images/" + almostUniqueFileName + "_" + file.name);
        const upload = child
          .put(file);

        upload.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log("Chargement de la photo en cours...");
          },
          (error) => {
            console.log("Erreur lors que chargement de la photo : " + error);
            reject();
          },
          () => {
            resolve(child.getDownloadURL());
          }
        );
      }
    );
  }
}
