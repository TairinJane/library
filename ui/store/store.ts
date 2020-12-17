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
  ISBN: string;
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
  ISBN: string;
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

export type TSearch = {
  books?: TBook[];
  readers?: TReader[];
};

export const searchStoreDefaults: TSearch = {};

export type TLend = {
  reader?: TReader;
  book?: TBook;
};

export const lendDefaults: TLend = {};

export type TReaderInfo = {
  reader?: TReader;
  history?: TBorrowedBook[];
};

export type TReadersProfiles = {
  [id: number]: TReaderInfo;
};

export const readersInfoDefaults: TReadersProfiles = {};

export type TStore = {
  search: TSearch;
  lend: TLend;
  readersInfo: TReadersProfiles;
};

export const storeDefaults: TStore = {
  search: searchStoreDefaults,
  lend: lendDefaults,
  readersInfo: readersInfoDefaults,
};
