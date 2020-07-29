import {PipeTransform, Pipe} from '@angular/core';
import {Book} from 'src/app/models/book.model';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {
  // transform(books: Book[], searchTerm: string): Book[] {
  //   if (!books || !searchTerm) {
  //     return books;
  //   }
  //   return books.filter(book =>
  //     book.bookName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
  //     book.authorName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  //   );
  // }

  transform(books: Book[], searchTerm: string): Book[] {
    if (!books || !searchTerm) {
      localStorage.setItem('userbookSize', String(books.length));
      return books;
    }
    const filteredItems: Book[] = books.filter(book =>
      book.bookName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
      book.authorName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
    localStorage.setItem('userbookSize', String(filteredItems.length));
    return filteredItems;
  }
}
