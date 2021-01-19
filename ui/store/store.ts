import { defaultLoadableList, TLoadable, TLoadableList, TLoadableState } from '../utils/state.utils';

export type TAuthor = {
  id?: number;
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
  id?: number;
  isbn: string;
  amount: number;
};

export type TPurchase = {
  id?: number;
  employee?: TEmployee;
  supplier: string;
  purchaseDate?: Date;
  deliveryDate: Date;
  books: TPurchaseBook[];
};

export type TEvent = {
  id?: number;
  title: string;
  employee?: TEmployee;
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
  book?: TBook;
} & TLoadable;

export type TBookProfile = {
  info?: TBookInfo;
  history?: TLoadableList<TBorrowedBook>;
  reserved?: TLoadableList<TReservedBook>;
};

export type TBooksStore = {
  search: TLoadableList<TBook>;
  lend: TLend;
  profiles: Record<number, TBookProfile>;
  due: TLoadableList<TBorrowedBook>;
};

export const booksStoreDefaults: TBooksStore = {
  search: defaultLoadableList(),
  lend: lendDefaults,
  profiles: {},
  due: defaultLoadableList(),
};

export type TReaderInfo = {
  reader?: TReader;
  history?: TBorrowedBook[];
};

export type TReadersStore = {
  search: TLoadableList<TReader>;
  profiles: Record<number, TReaderInfo>;
  add: TLoadable;
};

export const readersStoreDefaults: TReadersStore = {
  search: defaultLoadableList(),
  add: TLoadableState.DEFAULT,
  profiles: {},
};

export type TPurchasesStore = {
  search: TLoadableList<TPurchase>;
  add: TLoadable;
};

export const purchasesStoreDefaults: TPurchasesStore = { search: defaultLoadableList(), add: TLoadableState.DEFAULT };

export type TEventsStore = {
  search: TLoadableList<TEvent>;
  add: TLoadable;
};

export const eventsStoreDefaults: TEventsStore = { search: defaultLoadableList(), add: TLoadableState.DEFAULT };

export type TAuthorProfile = {
  author?: TAuthor;
  books?: TBook[];
} & TLoadable;

export type TAuthorsStore = {
  search: TLoadableList<TAuthor>;
  add: TLoadable;
  profiles: Record<number, TAuthorProfile>;
};

export const authorsStoreDefaults: TAuthorsStore = {
  search: defaultLoadableList(),
  add: TLoadableState.DEFAULT,
  profiles: {},
};

export type TStore = {
  books: TBooksStore;
  readers: TReadersStore;
  purchases: TPurchasesStore;
  events: TEventsStore;
  authors: TAuthorsStore;
};

export const storeDefaults: TStore = {
  readers: readersStoreDefaults,
  books: booksStoreDefaults,
  purchases: purchasesStoreDefaults,
  events: eventsStoreDefaults,
  authors: authorsStoreDefaults,
};
