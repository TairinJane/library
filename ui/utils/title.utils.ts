export const personInitials = (person: { firstName: string; lastName: string; patronymic?: string }) =>
  `${person.firstName} ${person.lastName[0]}. ${person.patronymic ? person.patronymic[0] + '.' : ''}`;
