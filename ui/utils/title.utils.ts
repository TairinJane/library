export const personInitials = (person: { firstName: string; lastName: string; patronymic?: string }) =>
  `${person.lastName} ${person.firstName[0]}. ${person.patronymic ? person.patronymic[0] + '.' : ''}`;

export const personFullName = (person: { firstName: string; lastName: string; patronymic?: string }) =>
  `${person.lastName} ${person.firstName} ${person.patronymic ?? ''}`;
