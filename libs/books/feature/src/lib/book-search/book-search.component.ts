import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];

  searchForm = this.fb.group({
    term: '',
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe((books) => {
      this.books = books;
    });
    this.searchForm
      .get('term')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        tap((term) => this.searchBooks(term))
      )
      .subscribe();
  }

  // Not Using: Using date Pipe
  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks(term?: string) {
    if (this.searchForm.value.term || term) {
      this.store.dispatch(searchBooks({ term: term ? term : this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
