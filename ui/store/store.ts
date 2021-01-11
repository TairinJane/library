import { TLoadable, TLoadableState } from '../utils/state.utils';

export type TAuthor = {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: Date;
  deathDate?: Date;
};

export type TBook = {
  id: number;
  isbn: string;
  title: string;
  publicationYear: number;
  genre: string;
  amount: number;
  department: number;
  authors: TAuthor[];
  available: number;
};

export type TReader = {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: Date;
  registrationDate: Date;
};

export type TEmployee = {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
  birthDate: Date;
  startDate: Date;
  endDate?: Date;
};

export type TBorrowedBook = {
  id: number;
  book: TBook;
  reader: TReader;
  employee: TEmployee;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
};

export type TDepartment = {
  id: number;
  name: string;
};

export type TReservedBook = {
  id: number;
  book: TBook;
  reader: TReader;
  employee: TEmployee;
  reservationDate: Date;
};

export type TBookRequest = {
  id: number;
  bookTitle: string;
  bookAuthor: string;
  reader: TReader;
  requestDate: Date;
};

export type TPurchaseBook = {
  id: number;
  isbn: string;
  amount: number;
};

export type TPurchase = {
  id: number;
  employee: TEmployee;
  supplier: string;
  purchaseDate: Date;
  deliveryDate: Date;
  books: TPurchaseBook[];
};

export type TEvent = {
  id: number;
  title: string;
  employee: TEmployee;
  eventDate: Date;
  eventPlace: string;
};

export type TLend = {
  readerId?: number;
  bookId?: number;
  isSuccess?: boolean;
};

export const lendDefaults: TLend = { isSuccess: false };

export type TBookInfo = {
  book: TBook;
  history: TBorrowedBook[];
};

export type TDueBooks = {
  books: TBorrowedBook[];
} & TLoadable;

export const dueBooksDefaults: TDueBooks = { books: [], ...TLoadableState.DEFAULT };

export type TBooksStore = {
  search: TBook[];
  lend: TLend;
  profiles: Record<number, TBookInfo>;
  due: TDueBooks;
};

export const booksStoreDefaults: TBooksStore = {
  search: [],
  lend: lendDefaults,
  profiles: {},
  due: dueBooksDefaults,
};

export type TReaderInfo = {
  reader?: TReader;
  history?: TBorrowedBook[];
};

export type TReadersStore = {
  search: TReader[];
  profiles: Record<number, TReaderInfo>;
  add: TLoadable;
};

export const storeReadersDefaults: TReadersStore = {
  search: [],
  add: TLoadableState.DEFAULT,
  profiles: {},
};

export type TPurchasesStore = {
  purchases: TPurchase[];
} & TLoadable;

export const purchasesStoreDefaults: TPurchasesStore = { purchases: [], ...TLoadableState.DEFAULT };

export type TStore = {
  books: TBooksStore;
  readers: TReadersStore;
  purchases: TPurchasesStore;
};

export const storeDefaults: TStore = {
  readers: storeReadersDefaults,
  books: booksStoreDefaults,
  purchases: purchasesStoreDefaults,
};
