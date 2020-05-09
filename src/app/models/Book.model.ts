import {Genre} from "./Genre.model";
import {Author} from "./Author.model";

export class Book {
  id: number
  subtitle: string;
  originalTitle: string;
  summary: string;
  picture: string;
  publicationYear: number;
  genre: Genre;
  authors: Author[];

  constructor(public title: string) {}
}
