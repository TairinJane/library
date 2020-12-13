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