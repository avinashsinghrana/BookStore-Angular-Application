import { Book } from '../models/book.model';

export class Seller {
  sellerId: number;
  sellerName: string;
  emailId: string;
  userId: number;
  book: Array<Book>;
}
