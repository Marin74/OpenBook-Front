import {Genre} from "./Genre.model";
import {Author} from "./Author.model";

export class Book {
  subtitle: string;
  originalTitle: string;
  summary: string;
  picture: string;
  publicationYear: number;
  genre: Genre;
  authors: Author[];

  constructor(public id: number, public title: string) {}
}
